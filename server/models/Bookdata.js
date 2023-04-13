import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
        },
        author: {
            type: String,
            required: true
        },
        noOfPages: {
            type: Number,
            required: true
        },
        publishedAt: {
            type: Date,
            required: true
        },
    
});

const Book = mongoose.model('Book', bookSchema);

export default Book;