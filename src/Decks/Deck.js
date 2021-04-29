import React from "react";
import DeckOptions from "./DeckOptions";

function Deck({ id, name, description }) {
  return (
    <div className="card" key={id}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <DeckOptions />
      </div>
    </div>
  );
}

export default Deck;
