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
    sex: {
        type: String, 
        required: true,
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
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        
    },
    medicalNotes: {
        type: String
    },
    tags: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['Needs Adoption', 'Adopted', 'Fostered', 'Needs Foster', 'initial'],
        default: 'initial'
    },
    blobUrl: {
        type: String, 
        required: true
    }

    
});
export default model('Animal', animalSchema);