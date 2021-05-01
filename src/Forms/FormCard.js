import React from "react";
import { useParams, Link } from "react-router-dom";

function FormCard() {
  const { cardId, deckId } = useParams();

  //TODO replace with actual name of deck in breadcrumb path
  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>Name of Deck {deckId}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Card {cardId}
        </li>
      </ol>
    </nav>
  );

  return <div>{breadcrumb}</div>;
}

export default FormCard;
