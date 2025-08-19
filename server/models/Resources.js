import { Schema, model } from 'mongoose';

const resourceSchema = new Schema ({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    category: {
        type: String
    }
});

export default model('Resource', resourceSchema)