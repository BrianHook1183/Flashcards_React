import React from "react";
import DeckOptions from "./DeckOptions";
import { useParams } from "react-router-dom";

function Deck({ id, name, description }) {
  const { deckId } = useParams();
  //TODO if deckId in params, make API fetch for that deck

  return (
    <div className="card" key={id}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <DeckOptions id={id} />
      </div>
    </div>
  );
}

export default Deck;
