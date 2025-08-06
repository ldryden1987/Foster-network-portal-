import { Router } from "express";
import Animal from "../models/Animal.js";

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

animalRouter.post('/animals', (req, res) => {
    try{
        const newAnimal = new Animal(req.body);
        newAnimal.save(); 
        res.json({ message: 'Animal created'})
    } 
    catch (err) {
        return res.json({ error: err.message });
    }
    
})

animalRouter.put('/animals/:id', async (req, res) => {
    try{ 
        const { id } = req.params.id;
        const foundAnimal = await Animal.find(id);
        if (!foundAnimal) {
            return res.status(404).json({ error: 'Animal not found' });
        };
        foundAnimal = req.body;
        await foundAnimal.save();
        res.json({ message: 'Animal found', foundAnimal });
    } catch (err) {
        res.json({ error: err.message });
    }
})

animalRouter.delete('/animals/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const deletedAnimal = await Animal.findById(id);
        
        if (!deletedAnimal) {
            return res.status(404).json({ error: 'Animal not found' });
        }
        await deletedAnimal.deleteOne();
        res.json({ message: `Animal with ID ${id} deleted` });
    } catch (err) {
        return res.json({ error: err.message });
    }
    
    
});

export default animalRouter;