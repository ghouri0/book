import React, { useState, useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import axios from "axios";


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedAuthor, setUpdatedAuthor] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5000/books").then((res) => {
      setBooks(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const handleUpdate = (id) => {
    // Find the selected book by id
    const bookToUpdate = books.find(book => book._id === id);
    setSelectedBook(bookToUpdate);
    setUpdatedTitle(bookToUpdate.title);
    setUpdatedAuthor(bookToUpdate.author);
    console.log(bookToUpdate);

    setOpenDialog(true);
  };

  const handleUpdateSubmit = () => {
    // Update the book in the database
    axios.patch(`http://localhost:5000/books/${selectedBook._id}`, {
        title: updatedTitle,
        author: updatedAuthor
    }).then((res) => {
        console.log(res);
        // Update the book in the books state
        const updatedBooks = books.map(book => {
            if (book._id === selectedBook._id) {
            return {
                ...book,
                title: updatedTitle,
                author: updatedAuthor
            };
            }
            return book;
        });
        setBooks(updatedBooks);
        setOpenDialog(false);
    }).catch((err) => {
        console.log(err);
    }
    );
    
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/books/${id}`).then((res) => {
      // Remove the book from books state
      const filteredBooks = books.filter(book => book._id !== id);
      setBooks(filteredBooks);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Number of Pages</TableCell>
              <TableCell>Date Published</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.noOfPages}</TableCell>
                <TableCell>{book.publishedAt}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleUpdate(book._id)}>
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(book._id)}>
                    Delete
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
    <DialogTitle>Update Book Details</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Title"
        fullWidth
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Author"
        fullWidth
        value={updatedAuthor}
        onChange={(e) => setUpdatedAuthor(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenDialog(false)} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleUpdateSubmit} color="primary">
        Update
      </Button>
    </DialogActions>
  </Dialog>
</>
);
};

export default BookList;