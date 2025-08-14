// models/Application.js
import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  //added model fields per form SLA
  type: { type: String, required: true },
  firstName: { type: String, requried: true },
  lastName: {type: String, required: true },
  age: {type: Number },
  gender: { type: String},
  phone: { type: String },
  email: { type: String },
  residenceType: { type: String },
  ownOrRent: { type: String },
  landlordName: { type: String },
  landlordPhone: { type: String },
  petRestrictions: { type: String },
  additionalResidents: [
  {
    name: { type: String },
    age: { type: Number },
    relationship: { type: String }
  }
],
  hasAllergies: { type: Boolean },  
  allergies: { type: String },
  // otherPets: { type: Boolean },
  vetInfo: { type: String },
  aloneTime: { type: String },
  playTime: { type: String },
  livingSituation: { type: String },
  budget: { type: String }, 
  street1: { type: String },
  street2: { type: String }, 
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  otherPets: [
  {
    type: { type: String },
    breed: { type: String },
    age: { type: Number }
  }
],
volunteer: {
  availability: [
    {
      day: { type: String },      // e.g., "Monday"
      start: { type: String },    // e.g., "09:00"
      end: { type: String }       // e.g., "17:00"
    }
  ],
},

//do Not see these on the form currently SLA
  // petName: { type: String },
  // petType: { type: String },
  // petAge: { type: Number},
  // reasonForAdoption: { type: String },
  // experienceWithPets: { type: String },
  // name: { type: String },
  // housingType: { type: String },
  // landlordPermission: { type: String }, // Only required if renting
  // householdMembers: { type: Number },
  // vetName: { type: String },
  // vetPhone: { type: String },
  // volunteerAvailability: { type: String }, // Optional field
  // additionalNotes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;
