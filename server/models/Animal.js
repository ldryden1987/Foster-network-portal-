import { Schema, model } from "mongoose";

const animalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breed:{
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    intake: {
        type: Date,
        required: true,
        min: '1900-01-01',
        max: '2100-12-31'
    },
    weight: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    flags: {
        type: [String]
    },
    medicalNotes: {
        type: String
    }

    
});
export default model('Animal', animalSchema);