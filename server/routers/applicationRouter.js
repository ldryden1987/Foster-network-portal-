import express from 'express';
import Application from '../models/Application';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newApp = new Application(req.body);
        const savedApp = await newApp.save();
        res.status(201).json(savedApp);
    } catch (error) {
        res.status(500).json ({error: 'Failed to submit application'});
    }
})

export default router;