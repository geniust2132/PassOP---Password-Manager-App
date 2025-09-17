// //node --watch server.js
// //"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath "C:\data\db"
// const express = require('express')

// const env = require('dotenv').config()
// // console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working
// const { MongoClient } = require('mongodb');
// const bodyparser = require('body-parser')
// const cors= require('cors')
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'passop';
// const app= express()

// const port = 3000
// app.use(bodyparser.json())
// app.use(cors())

// client.connect();

// //get all the passwords
// app.get('/', async (req, res) => {
//   const db = client.db(dbName);
//   const collection = db.collection('passwords');
//   const findResult = await collection.find({}).toArray();
//   res.json(findResult)
// })

// //save a password
// app.post('/', async (req, res) => {
//   const password = req.body
//   const db = client.db(dbName);
//   const collection = db.collection('passwords');
//   const findResult = await collection.insertOne(password);
//   res.send({success: true, result: findResult})
// })

// //delete a password
// app.delete('/', async (req, res) => {
//   const password = req.body
//   const db = client.db(dbName);
//   const collection = db.collection('passwords');
//   const findResult = await collection.deleteOne(password);
//   res.send({success: true, result: findResult})
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })





// const express = require('express');
// const env = require('dotenv').config();
// const { MongoClient } = require('mongodb');
// const bodyparser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const url = process.env.MONGO_URI; // from .env on Render
// const client = new MongoClient(url);
// const dbName = 'passop';

// app.use(bodyparser.json());
// app.use(cors());

// async function connectDB() {
//   try {
//     await client.connect();
//     console.log("✅ Connected to MongoDB Atlas");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err);
//   }
// }
// connectDB();

// app.get('/', async (req, res) => {
//   try {
//     const db = client.db(dbName);
//     const collection = db.collection('passwords');
//     const result = await collection.find({}).toArray();
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post('/', async (req, res) => {
//   try {
//     const password = req.body;
//     const db = client.db(dbName);
//     const collection = db.collection('passwords');
//     const result = await collection.insertOne(password);
//     res.send({ success: true, result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.delete('/', async (req, res) => {
//   try {
//     const password = req.body;
//     const db = client.db(dbName);
//     const collection = db.collection('passwords');
//     const result = await collection.deleteOne(password);
//     res.send({ success: true, result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });





// server.js
// Run with: node server.js
// Or if you want auto-reload: node --watch server.js

// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
let db;
async function connectDB() {
  try {
    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,   // ensure TLS/SSL
    });

    await client.connect();
    db = client.db("PassopCluster"); // change if you created a custom db name
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1); // stop server if db fails
  }
}

// Example route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectDB();
});

