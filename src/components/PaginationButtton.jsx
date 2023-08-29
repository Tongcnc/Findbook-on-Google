// PaginationButton.js
import React from "react";

function PaginationButton({ pageNumber, isActive, onClick }) {
  return (
    <button
      onClick={() => onClick(pageNumber)}
      className={isActive ? "active" : ""}
    >
      {pageNumber}
    </button>
  );
}

export default PaginationButton;
