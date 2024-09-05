# MedNova OralHealth API Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [Error Handling](#error-handling)
5. [Endpoints](#endpoints)
   - [User Management](#user-management)
   - [Questions](#questions)
   - [User Responses](#user-responses)

## Introduction

This document provides detailed information about the MedNova OralHealth API. The API allows for user management, question handling, and user response tracking for an oral health assessment application.

## Base URL

All API requests should be made to:

```sh
https://mednova-oralhealth-be.onrender.com/api/v1
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Most endpoints require a valid JWT token to be included in the Authorization header of the request.

### Token Format

```json
Authorization: bearer <token>
```

## Error Handling

The API uses conventional HTTP response codes to indicate the success or failure of an API request. In general:

- 2xx codes indicate success
- 4xx codes indicate an error that failed given the information provided (e.g., a required parameter was omitted, authentication failed, etc.)
- 500 codes indicate an error with the server

## Endpoints

### User Management

#### Sign Up

Create a new user account.

- **URL:** `/user/signup`
- **Method:** `POST`
- **Auth required:** No
- **Data constraints:**

```json
{
  "fullName": "[valid name]",
  "email": "[valid email address]",
  "password": "[password in plain text]"
}
```

- **Success Response:**
  - **Code:** 201
  - **Content:** 
```json
{
  "message": "User created successfully, Please verify your email!",
  "data": {
    "fullName": "[user's full name]",
    "email": "[user's email]",
    "id": "[user's id]",
    "role": "[user's role]",
    "verification": false
  }
}
```

#### Login

Authenticate a user and receive a JWT token.

- **URL:** `/user/login`
- **Method:** `POST`
- **Auth required:** No
- **Data constraints:**

```json
{
  "email": "[valid email address]",
  "password": "[password in plain text]"
}
```

- **Success Response:**
  - **Code:** 200
  - **Content:** 
```json
{
  "message": "User logged in successfully",
  "token": "[JWT token]",
  "user": {
    "fullName": "[user's full name]",
    "email": "[user's email]",
    "id": "[user's id]",
    "role": "[user's role]",
    "verification": true
  }
}
```

#### Get User Profile

Retrieve the profile of the authenticated user.

- **URL:** `/user/profile`
- **Method:** `GET`
- **Auth required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** 
```json
{
  "message": "User fetched successfully",
  "data": {
    "fullName": "[user's full name]",
    "email": "[user's email]",
    "id": "[user's id]",
    "role": "[user's role]",
    "verification": true
  }
}
```

#### Update User Profile

Update the profile of the authenticated user.

- **URL:** `/user/update`
- **Method:** `PUT`
- **Auth required:** Yes
- **Data constraints:**

```json
{
  "fullName": "[new full name]",
  "email": "[new email address]"
}
```

- **Success Response:**
  - **Code:** 200
  - **Content:** 
```json
{
  "message": "User updated successfully",
  "data": {
    "fullName": "[updated full name]",
    "email": "[updated email]",
    "id": "[user's id]",
    "role": "[user's role]",
    "verification": "[updated verification status]"
  }
}
```

#### Delete User

Delete the authenticated user's account.

- **URL:** `/user/delete`
- **Method:** `DELETE`
- **Auth required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** 
```json
{
  "message": "User deleted successfully"
}
```

#### Verify Email

Verify a user's email address using a verification token.

- **URL:** `/user/verify/:userId/:verifyToken`
- **Method:** `GET`
- **Auth required:** No
- **Success Response:**
  - **Code:** 200
  - **Content:** 
```json
{
  "message": "User verified successfully"
}
```

### Questions

#### Create Question

Create a new question for the oral health assessment.

- **URL:** `/question/create`
- **Method:** `POST`
- **Auth required:** Yes
- **Data constraints:**

```json
{
  "questionText": "[question text]",
  "options": [
    {
      "optionText": "[option text]",
      "score": "[score for this option]"
    },
    ...
  ]
}
```

- **Success Response:**
  - **Code:** 201
  - **Content:** 
```json
{
  "message": "Question created successfully",
  "question": {
    "questionText": "[question text]",
    "options": [
      {
        "optionText": "[option text]",
        "optionValue": "[unique option value]",
        "score": "[score for this option]"
      },
      ...
    ],
    "_id": "[question id]"
  }
}
```

#### Get All Questions

Retrieve all questions.

- **URL:** `/question/all`
- **Method:** `GET`
- **Auth required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** 
```json
{
  "questions": [
    {
      "_id": "[question id]",
      "questionText": "[question text]",
      "options": [
        {
          "optionText": "[option text]",
          "optionValue": "[unique option value]",
          "score": "[score for this option]"
        },
        ...
      ]
    },
    ...
  ]
}
```

#### Get Question by ID

Retrieve a specific question by its ID.

- **URL:** `/question/:id`
- **Method:** `GET`
- **Auth required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** 
```json
{
  "question": {
    "_id": "[question id]",
    "questionText": "[question text]",
    "options": [
      {
        "optionText": "[option text]",
        "optionValue": "[unique option value]",
        "score": "[score for this option]"
      },
      ...
    ]
  }
}
```

#### Update Question

Update an existing question.

- **URL:** `/question/:id`
- **Method:** `PUT`
- **Auth required:** Yes
- **Data constraints:**

```json
{
  "questionText": "[updated question text]",
  "options": [
    {
      "optionText": "[updated option text]",
      "score": "[updated score for this option]"
    },
    ...
  ]
}
```

- **Success Response:**
  - **Code:** 200
  - **Content:** 
```json
{
  "message": "Question updated successfully",
  "question": {
    "_id": "[question id]",
    "questionText": "[updated question text]",
    "options": [
      {
        "optionText": "[updated option text]",
        "optionValue": "[unique option value]",
        "score": "[updated score for this option]"
      },
      ...
    ]
  }
}
```

#### Delete Question

Delete a specific question.

- **URL:** `/question/:id`
- **Method:** `DELETE`
- **Auth required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** 
```json
{
  "message": "Question deleted successfully"
}
```

### User Responses

#### Submit Answer

Submit a user's answer to a question.

- **URL:** `/user-response/submit`
- **Method:** `POST`
- **Auth required:** Yes
- **Data constraints:**

```json
{
  "questionId": "[question id]",
  "selectedOption": {
    "optionValue": "[selected option value]"
  }
}
```

- **Success Response:**
  - **Code:** 200
  - **Content:** 
```json
{
  "message": "Answer submitted successfully",
  "totalQuestions": "[total number of questions]",
  "totalAnsweredQuestions": "[number of questions answered by user]",
  "pendingQuestions": "[number of questions yet to be answered]",
  "totalScore": "[total score if all questions are answered, null otherwise]",
  "userResponse": {
    "userId": "[user id]",
    "answers": [
      {
        "questionId": "[question id]",
        "selectedOption": "[selected option value]",
        "score": "[score for selected option]"
      },
      ...
    ],
    "totalScore": "[total score]"
  }
}
```

#### Get User Responses

Retrieve all responses for a specific user.

- **URL:** `/user-response/all/:userId`
- **Method:** `GET`
- **Auth required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** 
```json
{
  "message": "User responses fetched successfully",
  "userResponses": [
    {
      "userId": "[user id]",
      "answers": [
        {
          "questionId": "[question id]",
          "selectedOption": "[selected option value]",
          "score": "[score for selected option]"
        },
        ...
      ],
      "totalScore": "[total score]"
    },
    ...
  ]
}
```

#### Get User Stats

Retrieve statistics for the authenticated user's responses.

- **URL:** `/user-response/stats`
- **Method:** `GET`
- **Auth required:** Yes
- **Success Response:**
  - **Code:** 200
  - **Content:** 
```json
{
  "message": "User stats fetched successfully",
  "totalQuestions": "[total number of questions]",
  "totalAnsweredQuestions": "[number of questions answered by user]",
  "pendingQuestions": "[number of questions yet to be answered]",
  "currentScore": "[current total score]",
  "totalScore": "[normalized total score out of 100]"
}
```

This documentation covers the main endpoints and functionality of the MedNova OralHealth API. For any additional information or support, please contact the API development team.