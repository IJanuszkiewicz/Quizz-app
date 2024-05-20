# Quiz App Backend

## Overview
This project serves as the backend for a quiz application, designed to manage and deliver quiz content to users. It utilizes Docker for containerization, GraphQL for API interactions, and a PostgreSQL database within a Docker container for data persistence.

## Features
- **Teacher Management**: Add and manage teacher accounts.
- **Student Management**: Add and manage student accounts.
- **Testset Management**: Create and manage collections of test questions.
- **Question Fetching**: Retrieve questions for tests based on specific criteria.
- **Answer Checking**: Evaluate submitted answers and provide feedback.

## Technology Stack
- **Nest.js**: The backend is built using the Nest.js framework.
- **GraphQL**: API queries and mutations are handled through GraphQL.
- **PostgreSQL**: Data is stored in a PostgreSQL database running in a Docker container.
- **Docker**: The application and database are containerized using Docker.

## Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js**: Download Node.js
- **Docker**: Download Docker

## Quick Start
To get the backend up and running, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/IJanuszkiewicz/Quizz-app
   cd Quizz-app
   ```

2. Create a .env file at the root of the project and populate it with the necessary environment variables. You can see what variables you need in _.example.env_ file
3. Use Docker Compose to build and start the services:
```bash
docker-compose up --build
```

The backend services should now be running, and you can interact with the GraphQL API at http://localhost:[specified_port]/graphql.
