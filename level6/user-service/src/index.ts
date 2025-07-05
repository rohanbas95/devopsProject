import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient, ObjectID } from 'mongodb';
import axios from 'axios';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoUrlLocal = "mongodb://admin:password@localhost:27017";  // this is for local docker
// const mongoUrlLocal = "mongodb://localhost:27017";
const mongoUrlDocker = "mongodb://admin:password@mongodb";
let mongswitch = true; // switch to true if you want to use docker container
const mongoUrl = mongswitch ? mongoUrlDocker : mongoUrlLocal;

// Database name
const databaseName = "userdb";

// REST API
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    const db = client.db(databaseName);
    const users = await db.collection("users").find().toArray();
    client.close();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    const db = client.db(databaseName);
    const user = req.body;
    await db.collection("users").insertOne(user);
    client.close();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    const db = client.db(databaseName);
    const updatedUser = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: req.body },
      { returnOriginal: false }
    );
    client.close();
    res.json(updatedUser.value);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    const db = client.db(databaseName);
    await db.collection("users").deleteOne({ _id: new ObjectID(id) });
    client.close();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.get('/api/users/:id/products', async (req, res) => {
  try {
    const response = await axios.get('http://my-prod:3002/api/products');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});
