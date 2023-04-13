import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const[bookData , setData] = useState({});
  const[res , setRes] = useState('');

 function addbookHandler() {
    console.log(bookData);
    axios.post("http://localhost:5000/books", bookData).then((res) => {
        console.log(res);
        setRes('Book Added Successfully');
        }).catch((err) => {
        console.log(err);
        });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        margin: "65px",
        textAlign: "center",
      }}
    >
      <h1>Books Management</h1>
      <div
        style={{
          display: "flex",
          gap: "40px",
          margin: "auto",
          borderTop: "2px solid gray",
        }}
      >
        <TextField
          id="standard-basic"
          label="Enter Title"
          variant="standard"
          style={{ width: "200px" }}
          onChange={(e) => {
            setData({ ...bookData, title: e.target.value })
          }}
        />
        <TextField
          id="standard-basic"
          label="Auther Name"
          variant="standard"
          style={{ width: "200px" }}
          onChange={(e) => {
            setData({ ...bookData, author: e.target.value })
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "40px",
          margin: "auto",
          borderBottom: "2px solid gray",
          paddingBottom: "18px",
        }}
      >
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ width: "200px" }}
          onChange={(e) => {
            setData({ ...bookData, noOfPages : e.target.value })
          }}
        />
        <TextField
          id="standard-basic"
          // label="Date"
          type="date"
          variant="standard"
          style={{ width: "200px" }}
          onChange={(e) => {
            setData({ ...bookData, publishedAt: e.target.value })
          }}
        />
      </div>
      <div style={{ display: "flex", margin: "auto", gap: "24px" }}>
        <Button
        onClick={addbookHandler}
        
          variant="outlined"
          size="medium"
          color="success"
        >
          Add Book
        </Button>
        <Button variant="outlined" size="medium" color="primary">
          <Link to="/viewbook">View Books</Link>
        </Button>

        <br/>
        
      </div>
      <h3>{res}</h3>
    </div>
  );
}
