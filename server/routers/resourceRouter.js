import express from 'express';
import { Router } from 'express';
import Resource from '../models/Resources.js';
import isAdminorStaff from '../middlewares/isAdminorStaff.js'

const app = express();
app.use(express.json());
const resourceRouter = Router();

resourceRouter.post('/resources', isAdminorStaff, async (req, res) => {
    try{
        const newResource = new Resource({
            ...req.body
        });
        await newResource.save();
        res.json({ message: 'Post successful' });
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err);
    }
});

resourceRouter.get('/resources', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default resourceRouter