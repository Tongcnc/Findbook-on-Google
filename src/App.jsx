import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
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
            <li className="coverBook">{book.volumeInfo.title.slice(0, 25)}</li>
            <div className="line-container">
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <li className="insideBook">
              <img
                src={book.volumeInfo.imageLinks.smallThumbnail}
                width="100px"
                height="100px"
                id="book-image"
                alt="Book Thumbnail"
              />
            </li>
            <div className="bookDown">
              <li className="insideBook">
                <h3> {book.volumeInfo.title.slice(0, 25)}</h3>
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
                      alt="link-icon"
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
                <li className="insideBook box"> {book.volumeInfo.language}</li>
              </div>
              <li className="insideBook" id="description">
                {book.volumeInfo.description.slice(0, 80)}...
              </li>
              <li className="insideBook" id="authors">
                <span className="typing-text">
                  by {book.volumeInfo.authors[0]}
                </span>
              </li>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
