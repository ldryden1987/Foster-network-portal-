import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  message: { type: String, required: true },
  dateSubmitted: { type: Date, default: Date.now },
});

export default mongoose.model('contactus', messageSchema);