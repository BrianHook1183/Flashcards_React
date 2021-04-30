import React from "react";
import DeckButtons from "./DeckButtons";

function Deck({ id, name, description }) {
  return (
    <div className="card" key={id}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <DeckButtons id={id} />
      </div>
    </div>
  );
}

export default Deck;
