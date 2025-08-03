import express from "express";
import Contact from "../models/contactMessage.js"

const router = express.Router();

// Get all contact messages (protected)
router.get("/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Unable to retrieve messages" });
  }
});

export default router;
