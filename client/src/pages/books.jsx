import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Book = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/books");
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (book_id) => {
    try {
      await axios.delete("http://localhost:8080/books/" + book_id);
      setBooks(books.filter((book) => book.book_id !== book_id)); // Update state after deletion
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Tabby Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.book_id}>
            {book.cover_image && <img src={book.cover_image} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.descption}</p>
            <span>{book.price}</span>
            <div className="buttons">
              <button
                className="delete"
                onClick={() => handleDelete(book.book_id)}
              >
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${book.book_id}`}>Update</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="add_btn">
        <Link to="/add">Click to add book</Link>
      </button>
    </div>
  );
};

export default Book;
