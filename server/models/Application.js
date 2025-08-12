// models/Application.js
import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  petAge: { type: Number, required: true },
  reasonForAdoption: { type: String, required: true },
  experienceWithPets: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  housingType: { type: String, required: true },
  ownOrRent: { type: String, required: true },
  landlordPermission: { type: String }, // Only required if renting
  householdMembers: { type: Number, required: true },
  allergies: { type: String, required: true },
  otherPets: { type: String, required: true },
  vetName: { type: String, required: true },
  vetPhone: { type: String, required: true },
  volunteerAvailability: { type: String }, // Optional field
  additionalNotes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;
