import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['Adopt', 'Foster', 'Volunteer'], // This makes sure it's only one of the three
    required: true
  },
  petName: {
    type: String,
    required: false
  },
  aboutYou: {
    type: String,
    required: true
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
