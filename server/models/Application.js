import mongoose from 'mongoose';

//set all required to false. Should be made required on the front end. Many of these fields are hidden depending on the application type. SLA
const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  type: {
    type: String,
    enum: ['Adopt', 'Foster', 'Volunteer'], // This makes sure it's only one of the three
    required: false
  },
  petName: {
    type: String,
    required: false
  },
  aboutYou: {
    type: String,
    required: false
  },
  experience: {
    type: String
  },
  availability: {
    type: String
  },
  address: {
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: String
  },
  phone: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;
