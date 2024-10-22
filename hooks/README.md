# Zap Webhook Service

This service is built using **Express** and **Prisma** to handle webhooks from external services (e.g., Zapier). It listens for incoming POST requests, processes the data, and stores it in a PostgreSQL database. Below is an overview of the functionality provided.

## Features

- **Webhook Endpoint**: Receives data from external services through a POST request.
- **Database Interaction**: Uses Prisma ORM to interact with a PostgreSQL database.
- **Transactional Operations**: Ensures that data is consistently stored using a transaction.

## Endpoints

### POST `/hooks/catch/:userId/:zapId`

This endpoint handles incoming webhook data and stores it in the database.

- **URL Parameters**:

  - `userId`: The ID of the user associated with the webhook.
  - `zapId`: The ID of the Zap associated with the webhook.

- **Request Body**: The body of the request should contain the metadata (in JSON format) that will be stored in the database.

- **Process Flow**:

  1. Logs the receipt of the webhook.
  2. Creates a new `zapRun` entry in the database, storing the `zapId` and the metadata from the request body.
  3. Creates a corresponding `zapRunOutbox` entry associated with the `zapRun`.
  4. Responds with a JSON message indicating successful receipt of the webhook.

- **Response**:
  - `200 OK`: `{"message": "Webhook received"}`

## Technologies Used

- **Express**: Handles HTTP server functionality.
- **Prisma**: ORM for interacting with the PostgreSQL database.
- **PostgreSQL**: Database for storing the Zap and Trigger data.

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
