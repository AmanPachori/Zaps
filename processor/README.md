# Processor Service

This service is built using **Prisma** and **KafkaJS** to handle outbox processing for `zapRunOutbox` events. It efficiently processes pending records from the database, sends them to a Kafka topic, and then deletes the processed records. This is useful for managing event-driven architectures and ensuring data consistency between the database and event streams.

## Features

- **Outbox Pattern**: Implements the outbox pattern to ensure reliable message delivery to Kafka.
- **Batch Processing**: Processes records in batches, reducing database load and optimizing message throughput.
- **Kafka Integration**: Uses `KafkaJS` for communicating with a Kafka broker, sending messages to a specified topic.
- **Prisma ORM**: Uses Prisma for interacting with a PostgreSQL database to manage `zapRunOutbox` records.

## Process Flow

1. **Connects to Kafka**: Initializes a Kafka producer and connects to the Kafka broker.
2. **Fetch Pending Records**: Retrieves up to 10 pending records from the `zapRunOutbox` table using Prisma.
3. **Send to Kafka**: Sends each record as a message to the Kafka topic `zapevent` with a JSON payload containing `zapRunId` and `stage: 0`.
4. **Delete Processed Records**: Deletes the processed records from the `zapRunOutbox` table to ensure that they are not reprocessed.
