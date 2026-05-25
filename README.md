# EcoScan

EcoScan is a full-stack web application designed to provide sustainability insights for consumer products.  
The platform enables users to search, scan and manage products while accessing environmental impact information through a modern API-driven architecture.

---

# Overview

The application combines a React frontend with a Node.js/Express backend and MongoDB database.  
It was developed in a collaborative agile environment with a focus on scalable architecture, RESTful APIs and full-stack software engineering practices.

---

# Features

- Product search and management
- Sustainability scoring system
- Barcode-based product lookup
- User authentication with JWT
- Favorites management
- RESTful API architecture
- Responsive frontend application
- Docker-based local development setup
- Automated testing for frontend and backend components

---

# Tech Stack

## Frontend
- React
- TypeScript
- HTML5 / CSS3

## Backend
- Node.js
- Express
- REST APIs
- JWT Authentication

## Database
- MongoDB

## DevOps & Tooling
- Docker
- Git
- npm

## Testing
- Jest
- Component Testing
- CRUD Integration Tests

---

# Architecture

The system follows a client-server architecture:

- React frontend communicates with the backend via REST APIs
- Express backend handles authentication, product management and favorites
- MongoDB stores user and product data
- JWT-based authentication secures protected routes

---

# Backend API Example

## Authentication Routes

```ts
POST /auth/register
POST /auth/login
GET  /auth/logout
GET  /auth/refresh
```

Authentication is implemented using JWT access and refresh tokens.

---

# Testing

The project includes frontend and backend tests covering:

- CRUD operations
- Product services
- Component rendering
- API behavior
- User interactions

Example test areas:
- Product CRUD integration tests
- Frontend component tests
- Backend service tests

---

# Local Development

## Start with Docker

```bash
docker compose up
```

Frontend:
```txt
http://localhost:3000
```

---

# Future Improvements

Potential future extensions include:

- Shared API types between frontend and backend
- Improved input validation
- Enhanced scalability for product loading
- Cloud deployment
- CI/CD pipelines
- Extended sustainability datasets

---

# Responsibilities

My primary contributions included:

- Development with React and TypeScript
- API integration
- UI component implementation
- Product interaction workflows
- Client-server communication
- Collaborative development in an agile team environment

---

# Contributors

Developed as a collaborative university software engineering project.
