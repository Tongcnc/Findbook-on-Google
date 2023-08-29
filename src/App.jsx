import { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import "./App.css";

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
      setTotalPages(1); // รีเซ็ตหน้าเป็น 1 หน้า
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
      <div className="message-input-container">
        <DebounceInput
          id="message-text"
          name="message-text"
          type="text"
          placeholder="Let me help you"
          value={inputText}
          minLength={2}
          debounceTimeout={500}
          onChange={handlerText}
        />
        <button className="clear" onClick={clearText}>
          &#8634;
        </button>
      </div>
      {loading ? (
        <p className="status">Loading...</p>
      ) : display.length === 0 ? (
        <p className="status">No books found.</p>
      ) : (
        <ul>
          {display.map((book, index) => (
            <div key={index} className="list-item">
              <li className="coverBook">
                {book.volumeInfo.title
                  ? book.volumeInfo.title.slice(0, 25)
                  : ""}
              </li>
              <div className="line-container">
                <div className="line"></div>
                <div className="line"></div>
              </div>
              <li className="insideBook">
                {book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.smallThumbnail ? (
                  <img
                    src={book.volumeInfo.imageLinks.smallThumbnail}
                    id="book-image"
                    alt="Book Thumbnail"
                  />
                ) : (
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/017/173/007/original/can-not-load-corrupted-image-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                    id="book-image"
                    alt="Fallback Thumbnail"
                  />
                )}
              </li>
              <div className="bookDown">
                <li className="insideBook">
                  <h3>
                    {book.volumeInfo.title
                      ? book.volumeInfo.title.slice(0, 25)
                      : ""}
                  </h3>
                </li>
                <div className="insideBook" id="container">
                  <li className="insideBook box" id="icon">
                    <a
                      href={book.saleInfo.buyLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2018/png/iconmonstr-link-thin.png&r=255&g=255&b=255"
                        alt="External Link"
                        width="5px"
                        height="5px"
                      />
                    </a>
                  </li>
                  <li className="insideBook box">
                    {book.volumeInfo.categories
                      ? book.volumeInfo.categories
                      : "none"}
                  </li>
                  <li className="insideBook box">{book.volumeInfo.language}</li>
                </div>
                <li className="insideBook">
                  {book.volumeInfo.description ? (
                    book.volumeInfo.description.slice(0, 80) + "..."
                  ) : (
                    <>
                      ไม่มีคำบรรยาย
                      <br />
                      ...
                    </>
                  )}
                </li>
                <li className="insideBook" id="authors">
                  <span className="typing-text">
                    by{" "}
                    {book.volumeInfo.authors
                      ? book.volumeInfo.authors[0]
                      : "ผู้เขียน"}
                  </span>
                </li>
              </div>
            </div>
          ))}
        </ul>
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
