import React from "react";
import { useParams } from "react-router-dom";

function FormCard() {
  const { cardId, deckId } = useParams();
  const placeHolder = (
    <p>
      Edit Card with id {cardId} for deck {deckId}
    </p>
  );

  return placeHolder;
}

export default FormCard;
