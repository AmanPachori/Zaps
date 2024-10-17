# Zapier

The project is designed to manage automation workflows (Zaps), where users can define triggers and actions. When a trigger event occurs, a sequence of actions is executed for the corresponding user. The project uses a combination of **Express** for API management, **Prisma** for database operations, and **Kafka** for processing events.

## Technologies Used

- **Next.js**: Provides a server-rendered frontend for user interactions and managing zaps.
- **Express**: Manages the RESTful API endpoints for interacting with user data, zaps, triggers, and actions.
- **Prisma**: Serves as the ORM (Object-Relational Mapping) for managing the PostgreSQL database, handling the creation and retrieval of records.
- **Kafka**: Facilitates event streaming and processing, ensuring that trigger events are processed in order and actions are executed sequentially.

![Automation Workflow Overview](https://github.com/user-attachments/assets/1d21ba5f-409e-45c2-b748-e399eb8f7e25)
![Automation Workflow Overview](https://github.com/user-attachments/assets/d03649dc-dd4d-48c5-94f5-659b3d414407)

## Workflow

- As shown in the figure above, users can create a Zap from the frontend by providing the corresponding trigger and actions. The request is sent to the **primary backend**, which returns a webhook URL to the user.

- When we hit the webhook URL, it goes to the webhook service, which receives the data from the POST request. Based on that, it creates a new `zapRun` entry in the database, storing the `zapId` and the metadata from the request body. It also creates a corresponding `zapRunOutbox` entry associated with the `zapRun` and responds with a JSON message indicating the successful receipt of the webhook.

- After creating entries in `zapRunOutbox` and `zapRun`, the **Processor** service comes into play, which is used to handle outbox processing for `zapRunOutbox` events. It efficiently processes pending records from the database, sends them to a Kafka topic, and then deletes the processed records.

- Once the event is pushed into the Kafka queue, the last **Worker** service comes to process events from a Kafka topic, execute specific actions, and move through a sequence of actions for each event. It listens to messages on a Kafka topic, processes them based on their content, and performs actions such as sending emails.
