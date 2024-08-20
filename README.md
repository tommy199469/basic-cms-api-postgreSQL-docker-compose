# Interview testing

## Overview

This project consists of a **PostgreSQL database**, an **API service** built with Node.js, and a **Next.js dashboard**. The services are containerized using Docker and orchestrated with Docker Compose.

## Prerequisites

Make sure you have the following installed on your local machine:

- Docker
- Docker Compose

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tommy199469/basic-cms-api-postgreSQL-docker-compose
   ```

2. **Environment Variables**

   Create a .env file in the root path:

   ```
    DB_HOST=
    DB_PORT=
    DB_NAME=
    DB_USERNAME=
    DB_PASSWORD=
   ```

3. **Build and start the service**

   ```
    docker-compose up
   ```

4. **Accessing the Services:**

   API Service:

   ```
   http://localhost:8002/api/
   ```

   Next.js Dashboard:

   ```
   http://localhost:3000/
   ```
