import express from 'express';
import contactMessage from '../models/contactMessage.js';

const router = express.Router();

// POST /api/contact - Save contact form data
router.post('/', async (req, res) => {
  const { name, lastName, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  try {
    const newMessage = new contactMessage({ name, lastName, email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
});

export default router;
