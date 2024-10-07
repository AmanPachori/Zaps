import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const client = new PrismaClient();
const TOPIC_NAME = "zapevent";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

async function main() {
  await producer.connect();

  while (1) {
    const pendingRows = await client.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });

    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((e) => {
        return {
          value: JSON.stringify({ zapRunId: e.zapRunId, stage: 0 }),
        };
      }),
    });

    await client.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((e) => e.id),
        },
      },
    });
  }
}

main();
