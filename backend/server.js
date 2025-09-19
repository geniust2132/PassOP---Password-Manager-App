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
const express = require('express');
const env = require('dotenv').config();
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
const url = process.env.MONGO_URI; // Mongo URI includes /passop
const client = new MongoClient(url);

app.use(bodyparser.json());
app.use(cors());

// Connect once at startup
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop server if DB fails
  }
}
connectDB();

app.get('/', async (req, res) => {
  try {
    const collection = client.db().collection('passwords'); // no dbName needed
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update route
app.put('/', async (req, res) => {
  try {
    const { id, site, username, password } = req.body;
    if (!id) return res.status(400).json({ error: 'id required' });

    const collection = client.db().collection('passwords');
    const result = await collection.updateOne(
      { id: id },
      { $set: { site, username, password } },
      { upsert: false } // do not create new document when updating
    );

    res.json({ success: true, result });
  } catch (err) {
    console.error('PUT / error', err);
    res.status(500).json({ error: err.message });
  }
});


app.post('/', async (req, res) => {
  try {
    const password = req.body;
    const collection = client.db().collection('passwords');
    const result = await collection.insertOne(password);
    res.send({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.delete('/', async (req, res) => {
//   try {
//     const password = req.body;
//     const collection = client.db().collection('passwords');
//     const result = await collection.deleteOne(password);
//     res.send({ success: true, result });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// safer delete route (delete by id only)
app.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'id required' });

    console.log('DELETE payload id:', id); // for debugging
    const collection = client.db().collection('passwords');
    const result = await collection.deleteOne({ id: id });
    res.json({ success: true, result });
  } catch (err) {
    console.error('DELETE / error', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


