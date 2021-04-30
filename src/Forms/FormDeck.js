import React from "react";
import { useParams } from "react-router-dom";

function FormDeck() {
  const { deckId } = useParams();
  const placeHolder = <p>Edit Deck with id {deckId}</p>;

  return placeHolder;
}

export default FormDeck;
