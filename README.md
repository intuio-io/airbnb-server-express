# Express Installation Instructions

## Prerequisites

Ensure you have Node.js version 18+ installed, if you have rapidstay-react project setup get the URL which is default to http://localhost:5173 it will be needed in the env has CORS_ORIGIN
Also make sure you have mongodb or mysql installed for db you can go through this documentation to learn more about it.

## Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/intuio-io/rapidstay-express.git

   # once cloned go to the repo
   cd cd rapidstay-express
   ```

2. **Verify your node version**

   ```bash
   node -v
   ```

3. **Run the following command to install the necessary dependencies:**

   ```bash
   npm install
   ```

## Below steps apply for mongodb setup with express ( skip this section to procced with setup of mysql with express )

4. **Install MongoDB Community Edition**
   Follow the instructions to install MongoDB Community Edition using Homebrew: [Install MongoDB Community Edition on macOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

5. **After installation mongodb, follow this instructions**

   - Go to the root folder and create a directory

     ```bash
     mkdir -p data
     ```

   - Run MongoDB with Replica Set

     ```bash
     # keep this running and open a new terminal
     mongod --port=27001 --dbpath=data --replSet="rs0"
     ```

   - Connect to MongoDB using the specified port:

     ```bash
      mongo --port 27001
     ```

   - Execute the following command in the MongoDB shell:
     ```bash
     rs.initiate({
     _id: "rs0",
     members: [
         {
         _id: 0,
         host: "localhost:27001"
         }
     ]
     })
     ```

6. **In the root of the project, create a .env file and add the following keys:**

   ```bash
   # Database url
   # add your db url make sure the port is the one which was done in the replica step on mongodb setup
   DATABASE_URL="mongodb://localhost:27001/airbnb"

   # Jwt token string, can be any unique string
   JWT_SECRET=anyscret

   # Cors origin, add the frontend url here
   CORS_ORIGIN=http://localhost:3000
   ```

7. **Set Up Prisma, Push the Prisma schema to the database:**

   - Run the below command

     ```bash
     npx prisma generate
     ```

   - Go to the prisma folder it should be in the root directory, inside there, there should be file called mongoSchema you’ll have to copy the contents of the file and paste it in the schema.prisma file
   - finally run the following command

     ```bash
     npx prisma db push
     ```

   - Once you have executed the above command run the following command
     ```bash
     # this will seed data in to your db
     npm run seeder
     ```

8. **Run the project to start your development server**
   ```bash
   npm run dev
   ```

## Below steps apply for msyql setup with express

1. **Install MongoDB Community Edition**
   Follow the instructions to install Mysql: [Install Mysql](https://dev.mysql.com/downloads/installer/)

2. **After installing mysql, follow this instructions**

   - Go to the root folder and create a directory

     ```bash
      sudo msyql
     ```

   - Create a db called rapidstay
     ```bash
      create database rapidstay
     ```

3. **In the root of the project, create a .env file and add the following keys:**

   ```bash
      # Database url
      # add your db url make sure the port is the one which was done in the replica step on mongodb setup
      DATABASE_URL="mysql://root:@127.0.0.1:3306/rapidstay"

      # Jwt token string, can you anything unique
      JWT_SECRET=anyscret

      # Cors origin, add the frontend url here
      CORS_ORIGIN=http://localhost:5173
   ```

4. **Set Up Prisma, Push the Prisma schema to the database:**

   - Run the below command

     ```bash
     npx prisma generate
     ```

   - Go to the prisma folder it should be in the root directory, inside there, there should be file called mysqlSchema you’ll have to copy the contents of the file and paste it in the schema.prisma file
   - Run the following command

     ```bash
     npx prisma migrate dev --name init
     ```

   - Once you have executed the above command run the following command

     ```bash
     # this will seed data in to your db
     npm run seeder
     ```

5. **Run the project to start your development server**
   ```bash
   npm run
   ```

You're all set! The project should now be running on your local server.

## You have now successfully setup your backend. Now proceed on setting up a front end of your choice.

Web

- React : https://github.com/intuio-io/rapidstay-reactjs
- Next.js : https://github.com/intuio-io/rapidstay-nextjs
