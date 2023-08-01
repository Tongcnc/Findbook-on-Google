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
          <li key={index}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
