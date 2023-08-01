import { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import axios, { Axios } from "axios";
import "./App.css";

function App() {
  const [display, setDisplayText] = useState([]);
  const [inputText, setInputText] = useState("");

  const searchBooks = async (input) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${input}`
      );
      console.log(response);
      setDisplayText(response.data.items);
    } catch (error) {
      console.error("Sorry can't find the book :-(");
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

  return (
    <div className="App">
      <h1 className="app-title">Find a Book &#128064;</h1>
      <div className="message-input-container">
        <DebounceInput
          id="message-text"
          name="message-text"
          type="text"
          placeholder="Let's me help you"
          value={inputText}
          minLength={2}
          debounceTimeout={500}
          onChange={handlerText}
        />
        <button className="clear" onClick={clearText}>
          &#8634;
        </button>
      </div>
      <ul>
        {display.map((book, index) => (
          <div key={index} className="list-item">
            <li className="title">{book.volumeInfo.title}</li>
            {/* <div className="line-container">
              <div className="line"></div>
              <div className="line"></div>
            </div> */}

            <p className="insideBook"> Author: </p>
            <li className="insideBook"> {book.volumeInfo.authors}</li>
            <p className="insideBook">Published Date:</p>
            <li className="insideBook">{book.volumeInfo.publishedDate}</li>
            <li className="insideBook"> Page: {book.volumeInfo.pageCount}</li>
            <li className="insideBook">
              Buy Link:{"  "}
              <a href={book.saleInfo.buyLink} target="_blank">
                Link
              </a>
            </li>
            {/* <li className="insideBook">
              <img
                src={book.volumeInfo.imageLinks.smallThumbnail}
                width="50px"
                height="80px"
                alt="Book Thumbnail"
              />
            </li> */}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
