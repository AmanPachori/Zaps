import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka } from "kafkajs";
import { parse } from "./parser";
import { sendEmail } from "./email";

const TOPIC_NAME = "zapevent";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

const client = new PrismaClient();

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  await consumer.connect();
  const producer = kafka.producer();
  await producer.connect();

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });

      if (!message.value?.toString()) {
        return;
      }

      const parsedValue = JSON.parse(message.value?.toString());
      const zapRunId = parsedValue.zapRunId;
      const stage = parsedValue.stage;

      const ZapRunDetails = await client.zapRun.findFirst({
        where: {
          id: zapRunId,
        },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });

      const currentAction = ZapRunDetails?.zap.actions.find(
        (x) => x.sortingOrder === stage
      );

      if (!currentAction) {
        console.log("Current Action Noy Found!");
      }
      const zapRunMetadata = ZapRunDetails?.metadata;

      if (currentAction?.type.id === "email") {
        const body = parse(
          (currentAction.metadata as JsonObject)?.body as string,
          zapRunMetadata
        );
        const to = parse(
          (currentAction.metadata as JsonObject)?.email as string,
          zapRunMetadata
        );
        console.log(to);
        console.log(`Sending out email to ${to} body is ${body}`);
        await sendEmail(to, body);
        console.log(
          "------------------------------------------------------------------------------"
        );
      }
      if (currentAction?.type.id === "send-sol") {
        console.log("sending solana");
      }

      await new Promise((r) => setTimeout(r, 5000));
      const lastStage = (ZapRunDetails?.zap.actions?.length || 1) - 1; // 1
      if (lastStage !== stage) {
        console.log("pushing back to the queue");
        await producer.send({
          topic: TOPIC_NAME,
          messages: [
            {
              value: JSON.stringify({
                stage: stage + 1,
                zapRunId,
              }),
            },
          ],
        });
      }

      console.log("processing done");
      //
      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(), // 5
        },
      ]);
    },
  });
}

main();
