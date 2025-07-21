import { Schema, model } from 'mongoose';

const faqSchema = new Schema ({
    category: {
        type: String,
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type:String,
        required: true
    }
});

export default model('FAQ', faqSchema)