# 🚀 Backend Setup Guide

This guide will walk you through setting up the development environment, configuring environment variables, seeding the MongoDB database, and running the development server.

---

## 📁 Environment Configuration

Create a `.env` file in the `./backend` directory with the following content:

```bash
PORT=5000
MONGO_URI=<your_mongodb_connection_uri>;
JWT_SECRET=<your_jwt_secret>;
NVIDIA_API_KEY=<your_nvidia_api_key>;
```

### 🔐 Generating a JWT Secret

To generate a secure `JWT_SECRET`, run the following command in your terminal:

<Highlight language="bash">
openssl rand -base64 64
</Highlight>

Copy the output and replace `<your_jwt_secret>` in your `.env` file.

---

## 🗃️ MongoDB Setup & Seed Data

### 📥 Install MongoDB Database Tools

Download and install the MongoDB Database Tools from the official source:

👉 [Download Tools](https://www.mongodb.com/try/download/database-tools)

Make sure `mongoimport` is added to your system path.

### 📦 Import Seed Data

Navigate to the migration folder:

```bash
cd ./backend/migration
```

Run the import command (replace the URI with your actual MongoDB connection string):

```bash
mongoimport --uri <"your_mongodb_connection_uri>" \
            --collection products \
            --file data.json \
            --jsonArray
```

---

## 🧪 Run the Development Server

Install dependencies:

```bash
cd ./backend
npm install
```

Start the server:

```bash
npm run dev
```

Server should now be running at:  
`http://localhost:5000` (or the port you defined in `.env`)
