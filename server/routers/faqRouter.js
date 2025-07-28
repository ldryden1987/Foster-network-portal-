import { Router } from 'express';
import FAQ from '../models/FAQs.js';
import isAdminManagerorStaff from '../middlewares/isAdminManagerorStaff.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const faqRouter = Router();

// CREATE - Post new FAQ
faqRouter.post('/faqs', isAuthenticated, isAdminManagerorStaff, async (req, res) => {
    try {
        const newFAQ = new FAQ({
            ...req.body
        });
        await newFAQ.save();
        res.json({ message: 'Post successful', faq: newFAQ });
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err);
    }
});

// READ - Get all FAQS
faqRouter.get('/faqs', async (req, res) => {
    try {
        const faq = await FAQ.find();
        res.json(faq);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ - Get single FAQS by ID
faqRouter.get('faqs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await FAQ.findById(id);
        
        if (!faq) {
            return res.status(404).json({ error: 'FAQ not found' });
        }
        
        res.json(faq);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE - Update existing FAQ
faqRouter.put('/faqs/:id', isAuthenticated, isAdminManagerorStaff, async (req, res) => {
    try {
        const { id } = req.params;
        
        const updatedFAQ = await FAQ.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedFAQ) {
            return res.status(404).json({ error: 'FAQ not found' });
        }
        
        res.json({ message: 'Update successful', faq: updatedFAQ });
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err);
    }
});

// DELETE - Delete resource
faqRouter.delete('/faqs/:id', isAuthenticated, isAdminManagerorStaff, async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedFAQ = await Resource.findByIdAndDelete(id);
        
        if (!deletedFAQ) {
            return res.status(404).json({ error: 'FAQ not found' });
        }
        
        res.json({ message: 'Delete successful', faq: deletedFAQ });
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err);
    }
});

export default faqRouter
