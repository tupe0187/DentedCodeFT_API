# Finance Tracker API

write about the project ...

## Table of Contents

- Make list of the heading
- you are ging to create
- ...

## Features

- list all the features you will have
- Login is one of them
- ...

## Technologies

- add technologies you are going to use in this project
- i.e. Node, etc.

# Installation

1. Write step by step
2. process how anybody can use this project
3. ..

# Usage

Tell people how they can actually use and test once the system is working

# API Endpoints

List all the api Endpoint you are going to have
i.e.

1. Login
   `POST /api/v1/users/login`
   This endpoint is used for authenticating a user by sending their email/username and password.

Request:

- URL: `/api/v1/users/login`
- Method: `POST`
- Headers:
  - `Content-Type: application/json`
- Body:
  ```sh
  {
      "email": "user@example.com",
      "password": "yourpassword"
  }
  ```
- Response: - Success (200):

  ```sh
  {
  "message": "Login successful",
  "user": "User Info {} with token"
  }
  ```

- Error (401): - Invalid credentials:

  ```sh
      {
      "error": "Invalid email or password"
      }
  ```

- Error (500): Server error:
  ```sh
  {
       "error": "An error occurred while processing the request"
  }
  ```

## Environment Variables

Create a .env file in the root of your project and add the following environment variables:

    # JWT Secret Key
    JWT_SECRET=your_jwt_secret

    # Token Expiration Time (e.g., '1h', '7d')
    JWT_EXPIRES_IN=1h
