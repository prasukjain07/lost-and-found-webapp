const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const msal = require('@azure/msal-node');
const CollectedItem = require('./models/collecteditem');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MSAL configuration
const config = {
  auth: {
    clientId: "0ab57f1a-6d44-4dfd-b784-55300e2d114b",
    authority: "https://login.microsoftonline.com/91cc1fb6-1275-4acf-b3ea-c213ec16257b",
    clientSecret: process.env.CLIENT_SECRET || "your_client_secret_here", // Replace with environment variable in production
  },
};

const pca = new msal.ConfidentialClientApplication(config);
const authCodeUrlParameters = {
  scopes: ["user.read"],
  redirectUri: "http://localhost:3000",
};

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/Lost_Found';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Multer storage configurations
const storageConfig = (folder) => multer.diskStorage({
  destination: (req, file, cb) => cb(null, folder),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const foundItemUpload = multer({ storage: storageConfig('./foundItemImages') });
const lostItemUpload = multer({ storage: storageConfig('./lostItemImages') });

// Found item schema and model
const foundItemSchema = new mongoose.Schema({
  description: String,
  date: String,
  category: String,
  subcategory: String,
  itemName: String,
  place: String,
  phoneNumber: String, // New field
  userName: String, // New field
  ownerName: String,
  details: String,
  isIdentifiable: Boolean,
  itemImage: String,
});

const FoundItem = mongoose.model('FoundItem', foundItemSchema, 'foundItems');

// Lost item schema and model
const lostItemSchema = new mongoose.Schema({
  description: String,
  date: String,
  phone: String,
  name: String,
  category: String,
  subcategory: String,
  itemName: String,
  itemImage: String,
  place: String,
});
const LostItem = mongoose.model('LostItem', lostItemSchema, 'lostItems');

// Route to submit found items
app.post('/api/submitFoundItem', foundItemUpload.single('itemImage'), async (req, res) => {
  try {
    const { description, date, category, subcategory, itemName, place, ownerName, details, isIdentifiable, userName, phoneNumber } = req.body;
    const itemImage = req.file ? req.file.filename : null;

    const foundItem = new FoundItem({
      description,
      date,
      category,
      subcategory,
      itemName,
      place,
      userName, // Include userName
      phoneNumber, // Include phoneNumber
      ownerName,
      details,
      isIdentifiable,
      itemImage,
    });

    await foundItem.save();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error submitting found item form:', error);
    res.sendStatus(500);
  }
});

// Route to save lost item and find matching found items
app.post('/api/findMatchingFoundItems', async (req, res) => {
  try {
    const { category, subcategory, itemName, place } = req.body;

    const similarItems = await FoundItem.find({
      category,
      subcategory,
      itemName,
      place,
    });

    res.status(200).json(similarItems);
  } catch (error) {
    console.error('Error fetching similar found items:', error);
    res.sendStatus(500);
  }
});



// Route to submit lost items
app.post('/api/submitLostItem', lostItemUpload.single('itemImage'), async (req, res) => {
  try {
    const { description, date, phone, name, sapId, category, subcategory, itemName, place } = req.body;
    const itemImage = req.file ? req.file.filename : null;
    const lostItem = new LostItem({ description, date, phone, name, sapId, category, subcategory, itemName, itemImage, place });
    await lostItem.save();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error submitting lost item form:', error);
    res.sendStatus(500);
  }
});

// Fetch lost items
app.post('/getLostItems', async (req, res) => {
  try {
    const items = await LostItem.find();
    res.json(items);
  } catch (error) {
    console.error("Error fetching lost items:", error);
    res.sendStatus(500);
  }
});

// Static file routes for image folders
app.use('/foundItemImages', express.static(path.join(__dirname, 'foundItemImages')));
app.use('/lostItemImages', express.static(path.join(__dirname, 'lostItemImages')));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});