import express from 'express';
import mongoose from 'mongoose';
import Collector from '../models/Collectors.js';



const router = express.Router();

const mongoURI = 'mongodb+srv://anirban:sFYKfWJLkrp349Hb@gargodb.co0m9.mongodb.net/gargo?retryWrites=true&w=majority&appName=gargodb';

router.post('/', async (req, res) => {
  const { usern, pass } = req.body;
  console.log('Authenticating:', { usern, pass });

  let db;

  try {
    db = await mongoose.createConnection(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).asPromise();

    const CollectorModel = db.model('Collector', Collector.schema);
    const user = await CollectorModel.findOne({ usern, pass });

    console.log('Found user:', user);

    if (user) {
      res.json(user);
    } else {
      res.json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    if (db) {
      await db.close();
      console.log('MongoDB connection closed after request.');
    }
  }
});

export default router;
