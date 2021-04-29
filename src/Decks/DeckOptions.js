import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DeckOptions() {
  // TODO needs to read route params
  const { deckId } = useParams();

  const addCards = deckId ? (
    <button type="button" className="btn btn-primary ml-2">
      + Add Cards
    </button>
  ) : null;

  return (
    <div
      className="btn-toolbar justify-content-between"
      role="toolbar"
      aria-label="Deck Options"
    >
      <div className="btn-group" role="group" aria-label="View/Study group">
        <Link to="/decks/5">
          <button type="button" className="btn btn-secondary mr-2">
            View
          </button>
        </Link>
        <button type="button" className="btn btn-primary">
          Study
        </button>
        {addCards} deckId is: {deckId}
      </div>
      <div className="btn-group" role="group" aria-label="Delete group">
        <button type="button" className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeckOptions;
