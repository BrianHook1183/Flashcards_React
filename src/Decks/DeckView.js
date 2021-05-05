import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api/index";
import DeckButtons from "./DeckButtons";
import CardList from "../Cards/CardList";

function DeckView({ handleDelete }) {
  // console.log("DeckView ran");
  const { deckId } = useParams();
  const history = useHistory();

  const [flashDeck, setFlashDeck] = useState({});
  const { id, name, description, cards } = flashDeck;

  useEffect(() => {
    async function getFlashDeck() {
      const flashDeckFromApi = await readDeck(deckId);
      // console.log(`DeckView got deck ${deckId}`, flashDeckFromApi);
      setFlashDeck(flashDeckFromApi);
    }
    getFlashDeck();
  }, [deckId]);

  const handleCardDelete = async (id) => {
    if (window.confirm("Do you really want to delete this card?")) {
      await deleteCard(id);
      history.go(0);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>
      <div className="mb-4" key={id}>
        <h5>{name}</h5>
        <p>{description}</p>
        <DeckButtons id={id} handleDelete={handleDelete} />
      </div>
      <CardList cards={cards} handleDelete={handleCardDelete} />
    </div>
  );
}

export default DeckView;
