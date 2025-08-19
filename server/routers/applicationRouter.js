import express from 'express';
import Application from '../models/Application.js'; // Add .js if needed for ES Modules

//fixed router variable to match server.js SLA
const applicationRouter = express.Router();

// Create a new application
applicationRouter.post('/', async (req, res) => {
  try {
    //Add logs for troubleshooting SLA
    console.log("Received application POST request:");
    console.log(JSON.stringify(req.body, null, 2)); 
    const newApp = new Application(req.body);
    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (error) {
    //Add logs for troubleshooting SLA
    console.error("Error submitting application:", error)
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Get all applications
applicationRouter.get('/', async (req, res) => {
  try {
    const apps = await Application.find().populate('user', 'email firstName lastName');
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get applications by type (Adopt, Foster, Volunteer)
applicationRouter.get('/type/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const appsByType = await Application.find({ type });
    res.status(200).json(appsByType);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch ${type} applications` });
  }
});

// (Optional) Get applications by user ID
applicationRouter.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const userApps = await Application.find({ user: userId });
    res.status(200).json(userApps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications for this user' });
  }
});

export default applicationRouter;
