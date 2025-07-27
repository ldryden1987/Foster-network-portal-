import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    applicantName: String,
    email: String,
    Phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    rentOrOwn: String,
    petName: String,
    petAgePref: String,
    submissionDate: {
        type: Date,
        default: Date.now,
    }

})

export default mongoose.model('Application', applicationSchema);