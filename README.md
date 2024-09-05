# MedNova OralHealth API
![GitHub package.json version](https://img.shields.io/github/package-json/v/LoordhuJeyakumar/mednova-oralhealth-be)
![GitHub License](https://img.shields.io/github/license/LoordhuJeyakumar/mednova-oralhealth-be)
![GitHub last commit](https://img.shields.io/github/last-commit/LoordhuJeyakumar/mednova-oralhealth-be)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [API Endpoints Overview](#api-endpoints-overview)
4. [Tech Stack](#tech-stack)
5. [Project Structure](#project-structure)
6. [Prerequisites](#prerequisites)
7. [Installation](#installation)
8. [Configuration](#configuration)
9. [Running the Application](#running-the-application)
10. [API Documentation](#api-documentation)
11. [Testing](#testing)
12. [Deployment](#deployment)
13. [Contributing](#contributing)
14. [License](#license)

## Introduction

MedNova OralHealth API is a robust backend service designed to support an oral health assessment application. It provides endpoints for user management, question handling, and user response tracking, enabling a comprehensive oral health evaluation system.

## Backend Repo:

[MedNova OralHealth Backend GitHub Repository](https://github.com/LoordhuJeyakumar/mednova-oralhealth-be)

## Frontend Repo:

[MedNova OralHealth Frontend GitHub Repository](https://github.com/LoordhuJeyakumar/mednova-oralhealth-fe)

## Deployed Links:

- Backend API: https://mednova-oralhealth-be.onrender.com/
- Frontend App: https://mednova-oralhealth.netlify.app/

## Features

- User authentication and authorization using JWT
- User management (signup, login, profile updates)
- Email verification for new user accounts
- CRUD operations for oral health assessment questions
- User response submission and tracking
- User statistics calculation

## API Endpoints Overview

The API is organized around the following main resources:

### User Management

- `POST /api/v1/user/signup`: Register a new user
- `POST /api/v1/user/login`: Authenticate a user and receive a JWT
- `GET /api/v1/user/profile`: Retrieve the authenticated user's profile
- `PUT /api/v1/user/update`: Update the authenticated user's profile
- `DELETE /api/v1/user/delete`: Delete the authenticated user's account
- `GET /api/v1/user/verify/:userId/:verifyToken`: Verify a user's email address

### Questions

- `POST /api/v1/question/create`: Create a new question
- `GET /api/v1/question/all`: Retrieve all questions
- `GET /api/v1/question/:id`: Retrieve a specific question
- `PUT /api/v1/question/:id`: Update a specific question
- `DELETE /api/v1/question/:id`: Delete a specific question

### User Responses

- `POST /api/v1/user-response/submit`: Submit a user's answer to a question
- `GET /api/v1/user-response/all/:userId`: Retrieve all responses for a specific user
- `GET /api/v1/user-response/stats`: Retrieve statistics for the authenticated user's responses

All endpoints, except for signup, login, and email verification, require authentication using a JWT token.

## Tech Stack

### Backend:

- Node.js
- Express
- MongoDB with Mongoose
- JWT for Authentication
- bcrypt for Password Hashing
- Nodemailer for Email Services
- cors for Cross-Origin Requests
- dotenv for Environment Variable Management

## Project Structure

```sh
mednova-oralhealth-be/
├── controllers/
│   ├── questionController.js
│   ├── userController.js
│   └── userResponseController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── questionModel.js
│   ├── userModel.js
│   └── userResponseModel.js
├── routes/
│   ├── index.js
│   ├── questionRouter.js
│   ├── userResponseRouter.js
│   └── userRoutes.js
├── utils/
│   ├── config.js
│   ├── helper.js
│   └── sendVerificationEmail.js
│   └── verificaionEmailMsg.js
├── .env
├── .gitignore
├── app.js
├── index.js
├── package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0 or later)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LoordhuJeyakumar/mednova-oralhealth-be.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mednova-oralhealth-be
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:

   ```
   MONGODB_CONNECTION_URI=your_mongodb_connection_string
   PORT=3333
   MONGO_DB_NAME=medNova
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=465
   EMAIL_SECURE=true
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   FRONTEND_BASEURI=http://localhost:5173/
   JWT_SECRET=your_jwt_secret
   ```

   Replace the placeholder values with your actual configuration details.

## Running the Application

To start the server in development mode:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will start running at `http://localhost:3333` (or the port you specified in the `.env` file).

## API Documentation

For detailed API documentation, including request/response formats and authentication requirements, please refer to the [API Documentation](API_DOCUMENTATION.md) file.

## Testing

Currently, there are no automated tests set up for this project. This is an area for future improvement.

## Deployment

This application is deployed on:

- Backend: [Render](https://mednova-oralhealth-be.onrender.com/)
- Frontend: [Netlify](https://mednova-oralhealth.netlify.app/)

This application can be deployed to any Node.js hosting platform such as Heroku, DigitalOcean, or AWS.

Ensure that you set the environment variables in your hosting platform's configuration.

## Contributing

Contributions to the MedNova OralHealth API are welcome. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

This project is licensed under the ISC License.

---

## Contact

For any additional questions or support, you can reach out via:

- Email: loordhujeyakumar@gmail.com
- Phone: +91 9600693684

For any additional questions or support, please open an issue on the [GitHub repository](https://github.com/LoordhuJeyakumar/mednova-oralhealth-be/issues).
