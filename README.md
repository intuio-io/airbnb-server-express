# Express Installation Instructions

## Prerequisites

Ensure you have Node.js version 18+ installed

## Installation Steps

1. **Clone the Repository**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. **Verify your node version**

   ```bash
   node -v
   ```

3. **Run the following command to install the necessary dependencies:**

   ```bash
   npm install
   ```

4. **Install MongoDB Community Edition**
   Follow the instructions to install MongoDB Community Edition using Homebrew: [Install MongoDB Community Edition on macOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

5. **After installation mongodb, follow this instructions**

   - Go to the root folder and create a directory
     `bash
   mkdir -p data
 `

   - Run MongoDB with Replica Set
     `bash

     # keep this running and open a new terminal

     mongod --port=27001 --dbpath=data --replSet="rs0"
     `

   - Connect to MongoDB using the specified port:
     `bash
  mongo --port 27001
 `

   - Execute the following command in the MongoDB shell:
     `bash
     rs.initiate({
     _id: "rs0",
     members: [
         {
         _id: 0,
         host: "localhost:27001"
         }
     ]
     })
 `

6. **In the root of the project, create a .env file and add the following keys:**

   ```bash
   # Database url
   DATABASE_URL="mongodb://localhost:27001/airbnb"

   # Jwt token string
   JWT_SECRET=anyscret

   # Cors origin, add the frontend url here
   CORS_ORIGIN=http://localhost:3000
   ```

7. **Set Up Prisma, Push the Prisma schema to the database:**

   ```bash
   npx prisma db push
   ```

8. **Run the project to start your development server**
   ```bash
   npm run dev
   ```

You're all set! The project should now be running on your local server.
