import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 3002;
// test changes
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productdb');

// Product Schema
const productSchema = new mongoose.Schema({
  name: String
});

const Product = mongoose.model('Product', productSchema);

// REST API
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

app.listen(port, () => {
  console.log(`Product service listening at http://localhost:${port}`);
});