import { Schema, model } from "mongoose";
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },  
     firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    role: {
        type: String
    },
    status: {
        type: String
    },
    street1: {
        type: String
    },
    street2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    phone: {
        type: String
    }
});
export default model('User', userSchema)