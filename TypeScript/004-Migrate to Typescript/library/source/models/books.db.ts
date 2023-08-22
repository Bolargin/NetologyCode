import {Schema, model} from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    authors: {
        type: String
    },
    favorite: {
        type: String,
        default: "Нет"
    },
    fileCover:{
        type: String
    },
    fileName: {
        type: String
    }
});

export default model('books', bookSchema);