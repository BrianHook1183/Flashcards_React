import React from "react";
import { Link } from "react-router-dom";
import Deck from "./Deck";

function Decks({ decks }) {
  const displayDecks = decks.map((deck) => {
    return (
      <Deck
        key={deck.id}
        id={deck.id}
        name={deck.name}
        description={deck.description}
      />
    );
  });

  return (
    <div>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary">
          + Create Deck
        </button>
      </Link>

      {/*       <div className="card-deck"> */}
      {displayDecks}
    </div>
    /*     </div> */
  );
}

export default Decks;
