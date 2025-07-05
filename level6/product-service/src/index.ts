import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import axios from 'axios';

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoUrlLocal = "mongodb://admin:password@localhost:27017"; // this is for local docker
// const mongoUrlLocal = "mongodb://localhost:27017";
const mongoUrlDocker = "mongodb://admin:password@mongodb";
let mongswitch = true; // switch to true if you want to use docker container
const mongoUrl = mongswitch ? mongoUrlDocker : mongoUrlLocal;
const databaseName = "productdb";

// REST API
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    const db = client.db(databaseName);
    const products = await db.collection("products").find().toArray();
    client.close();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req: Request, res: Response) => {
  try {
    const client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    const db = client.db(databaseName);
    const product = req.body;
    await db.collection("products").insertOne(product);
    client.close();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    const db = client.db(databaseName);
    const updatedProduct = await db.collection("products").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnOriginal: false }
    );
    client.close();
    res.json(updatedProduct.value);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    const db = client.db(databaseName);
    await db.collection("products").deleteOne({ _id: new ObjectId(id) });
    client.close();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Example: Get user info for a product
app.get('/api/products/:id/user', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('http://my-user:3001/api/users');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(port, () => {
  console.log(`Product service listening at http://localhost:${port}`);
});
