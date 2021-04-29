import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DeckOptions({ id }) {
  const { deckId } = useParams();
  let buttonView = null;
  let buttonEdit = null;
  let buttonAddCards = null;

  if (deckId) {
    buttonEdit = (
      <Link to={`/decks/${deckId}/edit`}>
        <button type="button" className="btn btn-secondary mr-2">
          Edit
        </button>
      </Link>
    );
    buttonAddCards = (
      <button type="button" className="btn btn-primary ml-2">
        + Add Cards
      </button>
    );
  } else {
    buttonView = (
      <Link to={`/decks/${id}`}>
        <button type="button" className="btn btn-secondary mr-2">
          View
        </button>
      </Link>
    );
  }

  return (
    <div
      className="btn-toolbar justify-content-between"
      role="toolbar"
      aria-label="Deck Options"
    >
      <div className="btn-group" role="group" aria-label="View/Study group">
        {buttonView}
        {buttonEdit}

        <button type="button" className="btn btn-primary">
          Study
        </button>

        {buttonAddCards}
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
