import { Router } from "express";
import { del } from "@vercel/blob";
import Animal from "../models/Animal.js";
import isAdminManagerOrStaff from "../middlewares/isAdminManagerorStaff.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

//TODO: 
// import authentication middleware
//get animal by ID
//update animal by ID

//initalize a variable to hold the router
const animalRouter = Router();

//Define the routes for animalRouter
animalRouter.get('/animals', async (req, res) => {

    try{
       const foundAnimals = await Animal.find();
        res.json({ message: "animals found", foundAnimals });
    } 
    
    catch (err) {
        return res.json({ error: err.message });
    }

    
})

//create new animal
animalRouter.post('/animals', isAuthenticated,isAdminManagerOrStaff,(req, res) => {
    try{
        const newAnimal = new Animal(req.body);
        newAnimal.save(); 
        res.status(200).json({ message: 'Animal created'})
    } 
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
    
})

//update animal by ID
animalRouter.put('/animals/:id', async (req, res) => {
    try { 
        const { id } = req.params;
        const foundAnimal = await Animal.findById(id);
        if (!foundAnimal) {
            return res.status(404).json({ error: 'Animal not found' });
        }
        Object.assign(foundAnimal, req.body);
        await foundAnimal.save();
        res.status(200).json({ message: 'Animal updated', foundAnimal });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//delete animal by ID
animalRouter.delete('/animals/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const deletedAnimal = await Animal.findById(id);
        
        if (!deletedAnimal) {
            return res.status(404).json({ error: 'Animal not found' });
        }

        await del(deletedAnimal.blobUrl); // Delete the blob from Vercel Blob storage
        await deletedAnimal.deleteOne();
        res.status(200).json({ message: `Animal with ID ${id} deleted` });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
    
    
});

export default animalRouter;