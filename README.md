# Notification Service

## Description

This service is responsible for sending email to users.

## Prerequisites

In this service, we use Gmail to send emails. While this approach is not recommended for production environments, it is suitable for development and testing purposes. Please ensure the email is not marked as spam, as this will help display the icon properly.

To use `gmail` to send emails, we need to apply `app password` in gmail account. [Link](https://myaccount.google.com/apppasswords)

```bash
# Install dependencies
npm install

## Copy the .env.development file and rename it to .env
cp .env.development .env
```

## Scripts

- `npm start`: Start the service in production mode.
- `npm run dev`: Start the service in development mode.
- `npm run test`: Run the tests.
- `npm run lint`: Lint the code.
- `npm run format`: Format the code.

## Endpoints

|             Endpoint              | Method |           Description            |
|:---------------------------------:|:------:|:--------------------------------:|
|           /api/healthy            |  Get   | Check if the service is running. |
