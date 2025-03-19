# Notification Service

## Description

This service is responsible for sending email to users.

## Prerequisites

In this service, we use `gmail` to send emails, this approach is not recommended for production environments, but it is good for development and testing.

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

<!-- ## Docker

We can build a Docker image and push it to the Docker Hub.

```bash
# Login to Docker Hub
docker login

# Build the Docker image
docker image build -t <username>/loginhub-1-gateway .

# Tag the Docker image
docker tag <username>/loginhub-1-gateway <username>/loginhub-1-gateway:stable

# Push the Docker image
docker push <username>/loginhub-1-gateway:stable
```

We can build a Docker image and push it to the Google Artifact Registry.

```bash
# gcloud auth login
gcloud auth login
gcloud auth configure-docker asia-east1-docker.pkg.dev

# Build the Docker image
docker build -t loginhub-2-notification .

# Tag the Docker image
docker tag loginhub-2-notification <location>-docker.pkg.dev/<project_id>/<repo_id>/loginhub-2-notification:stable

docker tag loginhub-2-notification asia-east1-docker.pkg.dev/loginhub-dev/main-repo/loginhub-2-notification:stable

# Push the Docker image
docker push <location>-docker.pkg.dev/<project_id>/<repo_id>/loginhub-2-notification:stable

docker push asia-east1-docker.pkg.dev/loginhub-dev/main-repo/loginhub-2-notification:stable
``` -->
