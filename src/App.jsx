import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";
import BookItem from "./components/BookItem";
import PaginationButton from "./components/PaginationButtton";

function App() {
  const [display, setDisplayText] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageLoading, setPageLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const booksPerPage = 12;

  const calculateTotalPages = (totalItems) => {
    return Math.ceil(totalItems / booksPerPage);
  };

  const searchBooks = async (input) => {
    try {
      setLoading(true);
      const startIndex = (currentPage - 1) * booksPerPage;
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${input}&startIndex=${startIndex}&maxResults=${booksPerPage}`
      );
      setDisplayText(response.data.items);
      setTotalPages(calculateTotalPages(response.data.totalItems));
      setLoading(false);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      setDisplayText([]);
      setTotalPages(1); // reset page to 1
      setLoading(false);
    }
  };

  const handlerText = (e) => {
    setInputText(e.target.value);
    searchBooks(e.target.value);
  };

  const clearText = () => {
    setInputText("");
    setDisplayText([]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPageLoading(true);
    searchBooks(inputText);
  };

  useEffect(() => {
    if (inputText.length >= 2) {
      searchBooks(inputText);
    } else {
      clearText();
    }
  }, [inputText]);

  useEffect(() => {
    if (isPageLoading) {
      setPageLoading(false);
    }
  }, [isPageLoading]);

  return (
    <div className="App">
      <h1 className="app-title">Find a Book &#128064;</h1>
      <SearchBar value={inputText} onChange={handlerText} onClear={clearText} />
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => (
          <PaginationButton
            key={i}
            pageNumber={i + 1}
            isActive={currentPage === i + 1}
            onClick={handlePageChange}
          />
        ))}
      </div>
      {/* Status */}
      {loading ? (
        <p className="status">Loading...</p>
      ) : display.length === 0 ? (
        <p className="status">No books found.</p>
      ) : (
        // Map Book Items
        <ul>
          {display.map((book, index) => (
            <BookItem key={index} book={book} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
