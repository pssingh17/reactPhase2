import React from "react";
import "../App.css";

function Modal({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}> X </button>
        </div>
        <div className="title">
          <h1>Advance Filters</h1>
        </div>
        <div className="body">
          <input placeholder="Price" />
          <input placeholder="Amenities" />
          <input placeholder="No. of Bedrooms" />
        </div>
        <div className="footer">
          <button>Clear</button>
          <button>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
