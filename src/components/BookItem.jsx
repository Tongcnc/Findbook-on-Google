// BookItem.js
import React from "react";

function BookItem({ book }) {
  return (
    <div className="list-item">
      <li className="coverBook">
        {book.volumeInfo.title ? book.volumeInfo.title.slice(0, 25) : ""}
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
            {book.volumeInfo.title ? book.volumeInfo.title.slice(0, 25) : ""}
          </h3>
        </li>
        <div className="insideBook" id="container">
          <li className="insideBook box" id="icon">
            <a href={book.saleInfo.buyLink} target="_blank" rel="noreferrer">
              <img
                src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2018/png/iconmonstr-link-thin.png&r=255&g=255&b=255"
                alt="External Link"
                width="5px"
                height="5px"
              />
            </a>
          </li>
          <li className="insideBook box">
            {book.volumeInfo.categories ? book.volumeInfo.categories : "none"}
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
            {book.volumeInfo.authors ? book.volumeInfo.authors[0] : "ผู้เขียน"}
          </span>
        </li>
      </div>
    </div>
  );
}

export default BookItem;
