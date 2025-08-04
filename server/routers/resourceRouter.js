import { Router } from 'express';
import Resource from '../models/Resources.js';
import isAdminorStaff from '../middlewares/isAdminorStaff.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const resourceRouter = Router();

// CREATE - Post new resource
resourceRouter.post('/resources', isAuthenticated, isAdminorStaff, async (req, res) => {
    try {
        const newResource = new Resource({
            ...req.body
        });
        await newResource.save();
        res.json({ message: 'Post successful', resource: newResource });
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err);
    }
});

// READ - Get all resources
resourceRouter.get('/resources', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ - Get single resource by ID
resourceRouter.get('/resources/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findById(id);
        
        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        
        res.json(resource);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE - Update existing resource
resourceRouter.put('/resources/:id', isAuthenticated, isAdminorStaff, async (req, res) => {
    try {
        const { id } = req.params;
        
        const updatedResource = await Resource.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedResource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        
        res.json({ message: 'Update successful', resource: updatedResource });
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err);
    }
});

// DELETE - Delete resource
resourceRouter.delete('/resources/:id', isAuthenticated, isAdminorStaff, async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedResource = await Resource.findByIdAndDelete(id);
        
        if (!deletedResource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        
        res.json({ message: 'Delete successful', resource: deletedResource });
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err);
    }
});

export default resourceRouter
