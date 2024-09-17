# Shopper

Shopper is a Node.js application that uses Express, Dynamoose, and other technologies to manage measurements. This project includes a REST API for uploading and retrieving measurement data.

## Table of Contents

- [Shopper](#shopper)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Project](#running-the-project)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18 or higher)
- Docker and Docker Compose
- AWS credentials for DynamoDB

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/shopper.git
   cd shopper
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project and add the following environment variables:

   ```env
   PORT=4000
   DB_USER=your_db_user
   DB_PASS=your_db_password
   GEMINI_API_KEY=your_gemini_api_key
   DATABASE_URL=your_database_url
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_REGION=your_aws_region
   ```

2. Ensure your DynamoDB local instance is running. You can use Docker Compose to start it:

   ```sh
   docker-compose up -d
   ```

## Running the Project

1. Start the application in development mode:

   ```sh
   npm run dev
   ```

2. The application will be running at `http://localhost:4000`.
