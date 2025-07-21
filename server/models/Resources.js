import { Schema, model } from 'mongoose';

const resourceSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

export default model('Resource', resourceSchema)