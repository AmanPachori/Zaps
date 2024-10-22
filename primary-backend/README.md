# Zap Management Backend

This backend service is built using **Express** and supports handling various resources such as users, zaps, triggers, and actions through separate routers. It is designed to interact with a database and manage data related to automations and workflows.

## Features

- **RESTful API**: Provides endpoints for managing users, zaps, triggers, and actions.
- **Modular Router Structure**: Uses separate routers for each resource (`user`, `zap`, `trigger`, `action`) to keep the codebase organized and maintainable.

## Endpoints

The backend organizes endpoints under the `/api/v1` namespace:

- **User Management**:

  - All user-related operations are accessible via `/api/v1/user`.
  - Example routes: `POST /api/v1/user`, `GET /api/v1/user/:id`.

- **Zap Management**:

  - All zap-related operations are accessible via `/api/v1/zap`.
  - Example routes: `POST /api/v1/zap`, `GET /api/v1/zap/:id`.

- **Trigger Management**:

  - All trigger-related operations are accessible via `/api/v1/trigger`.
  - Example routes: `POST /api/v1/trigger`, `GET /api/v1/trigger/:id`.

- **Action Management**:

  - All action-related operations are accessible via `/api/v1/action`.
  - Example routes: `POST /api/v1/action`, `GET /api/v1/action/:id`.

  ```

  ```
