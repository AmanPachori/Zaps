# Zap Event Worker

This service is built using **Prisma** and **KafkaJS** to process events from a Kafka topic, execute specific actions, and move through a sequence of actions for each event. It listens to messages on a Kafka topic, processes them based on their content, and performs actions such as sending emails.

## Features

- **Kafka Consumer**: Listens for messages on a specified Kafka topic (`zapevent`) and processes them in a specific order.
- **Action Sequencing**: Executes a sequence of actions defined for each `zap`, progressing through stages until completion.
- **Email Integration**: Supports sending emails as part of the action sequence.
- **Dynamic Parsing**: Uses a custom `parse` function to replace placeholders in the action metadata with data from `zapRun` metadata.

## Process Flow

1. **Kafka Setup**:

   - Connects to Kafka as a consumer with the group ID `main-worker` and subscribes to the `zapevent` topic.
   - Connects to Kafka as a producer for sending messages back to the topic if more stages need processing.

2. **Event Processing**:

   - For each message received, it parses the message to extract the `zapRunId` and `stage`.
   - Retrieves the corresponding `zapRun` and its associated actions from the database.
   - Identifies the current action based on the `stage` number.

3. **Action Execution**:

   - **Email Action**: If the current action type is `email`, it parses the email template using the provided metadata and sends the email using `sendEmail`.
   - **Solana Action**: Handles other action types, such as `send-sol`, by logging or triggering the necessary logic.

4. **Queue Management**:
   - After processing an action, it checks if there are more actions to process for the `zapRun`.
   - If more stages exist, it sends a message back to the Kafka topic to process the next stage.
   - Commits the offset for the message to ensure it is not reprocessed.

## Environment Variables

- `DATABASE_URL`: The connection string for the PostgreSQL database.
- `TOPIC_NAME`: Name of the Kafka topic (`zapevent` by default).
- Kafka broker configurations such as `localhost:9092` should match the Kafka setup.
