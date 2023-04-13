import Book from '../models/Bookdata.js';
import express from 'express';
const router = express.Router();

export const getBooks = async (req, res) => {
    try {
        const Books = await Book.find();
        res.status(200).json(Books);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createBook = async (req, res) => {
    const body = req.body;
    
    const newBook = await new Book(body);
    console.log(newBook);
    newBook.save()
        .then(() => res.json(newBook))
        .catch((err) => res.status(400).json('Error: ' + err));

}

export const updateBook = (req, res) => {
    Book.findById(req.params.id)
        .then((Book) => {
            Book.title = req.body.title;
            Book.author = req.body.author;

            Book.save()
                .then(() => res.json('Book updated!'))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
}

export const deleteBook = (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => res.json('Book deleted.'))
        .catch((err) => res.status(400).json('Error: ' + err));
}

export default router;
