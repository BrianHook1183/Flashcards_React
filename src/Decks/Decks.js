import React from "react";
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
      <button type="button" className="btn btn-secondary">
        + Create Deck
      </button>

      {/*       <div className="card-deck"> */}
      {displayDecks}
    </div>
    /*     </div> */
  );
}

export default Decks;
