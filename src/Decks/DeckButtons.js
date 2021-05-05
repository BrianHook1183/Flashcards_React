import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DeckButtons({ id, handleDelete }) {
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
      <Link to={`/decks/${deckId}/cards/new`}>
        <button type="button" className="btn btn-primary ml-2">
          + Add Cards
        </button>
      </Link>
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
      aria-label="Deck Buttons"
    >
      <div
        className="btn-group"
        role="group"
        aria-label="View Study Edit Add group"
      >
        {buttonView}
        {buttonEdit}

        <Link to={`/decks/${id}/study`}>
          <button type="button" className="btn btn-primary">
            Study
          </button>
        </Link>

        {buttonAddCards}
      </div>
      <div className="btn-group" role="group" aria-label="Delete group">
        <button
          type="button"
          onClick={() => handleDelete(id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeckButtons;
