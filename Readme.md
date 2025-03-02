# FinServe - Modern Banking Application

## Overview
FinServe is a modern, microservices-based banking application that provides seamless management of clients and their accounts. Built with a Spring Boot backend and React frontend, it offers a robust and user-friendly banking experience.

## Tech Stack

### Backend
- Java 17+
- Spring Boot 3.x
- Spring Cloud (Eureka, Config, Gateway)
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- React 18
- TypeScript
- Material-UI (MUI) v5
- React Router v6
- Axios

## Project Structure

### Backend Microservices
- `config-service`: Central configuration (Port 8888)
- `discovery-service`: Eureka server for service discovery (Port 8761)
- `gateway-service`: API Gateway (Port 8080)
- `customer-service`: Customer management (Port 8083)
- `account-service`: Account management (Port 8082)

### Frontend
- React Single Page Application

## Setup and Installation

### Backend Setup
1. Start the config service:
   \`\`\`
   cd config-service
   ./mvnw spring-boot:run
   \`\`\`

2. Launch the discovery service:
   \`\`\`
   cd discovery-service
   ./mvnw spring-boot:run
   \`\`\`

3. Start the gateway service:
   \`\`\`
   cd gateway-service
   ./mvnw spring-boot:run
   \`\`\`

4. Run the customer and account services:
   \`\`\`
   cd customer-service
   ./mvnw spring-boot:run
   \`\`\`
   \`\`\`
   cd account-service
   ./mvnw spring-boot:run
   \`\`\`

### Frontend Setup
1. Navigate to the frontend directory:
   \`\`\`
   cd finserve-frontend
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`
   npm start
   \`\`\`

   The application will be available at `http://localhost:3000`

## Features
- Client Management (Add, View, List)
- Account Management (Create, View, List)
- Dashboard with overview of clients and accounts
- Responsive design for various devices

## API Endpoints

### Customer Service
- GET `/customers`: List all customers
- GET `/customers/{id}`: Get customer by ID
- POST `/customers`: Create a new customer

### Account Service
- GET `/accounts`: List all accounts
- GET `/accounts/{id}`: Get account by ID
- POST `/accounts`: Create a new account
- GET `/accounts/customer/{customerId}`: Get accounts by customer ID

## Contributing
Please read `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the `LICENSE.md` file for details.

