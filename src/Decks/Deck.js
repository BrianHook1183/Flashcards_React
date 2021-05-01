import React from "react";
import DeckButtons from "./DeckButtons";

function Deck({ id, name, description, handleDelete }) {
  return (
    <div className="card" key={id}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <DeckButtons id={id} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Deck;
