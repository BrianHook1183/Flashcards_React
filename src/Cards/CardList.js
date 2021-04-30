import React from "react";
import { useParams } from "react-router-dom";

function CardList() {
  const { deckId } = useParams();
  return <p>this is a CardList for deckId {deckId}</p>;
}

export default CardList;
