import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api/index";
import DeckButtons from "./DeckButtons";
import CardList from "../Cards/CardList";

function DeckView({ handleDelete }) {
  const { deckId } = useParams();
  const history = useHistory();

  console.log("DeckView level 3 ran");

  const [flashDeck, setFlashDeck] = useState({});
  const { id, name, description, cards } = flashDeck;

  useEffect(() => {
    console.log("flashDeck useEffect start:");

    async function getFlashDeck() {
      console.log("flashDeck useEffect async before fetch:");

      const flashDeckFromApi = await readDeck(deckId);
      console.log(`DeckView got deck ${deckId}`, flashDeckFromApi);
      setFlashDeck(flashDeckFromApi);
      console.log("getFlashDeck() in useEffect ran");
    }
    getFlashDeck();
  }, [deckId]);

  const handleCardDelete = async (id) => {
    if (window.confirm("Do you really want to delete this card?")) {
      const response = await deleteCard(id);
      if (response) {
        history.go(0);
      }
    }
  };

  /*   useEffect(() => {
    setFlashDeck({});
    const abortController = new AbortController();
    async function getFlashDeck() {
      try {
        const flashDeckFromApi = await readDeck(deckId);
        console.log(
          `DeckView w/ abort getting deck ${deckId}`,
          flashDeckFromApi
        );
        setFlashDeck(flashDeckFromApi);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log("Aborted", deckId);
        } else {
          throw error;
        }
      }
    }
    getFlashDeck();
    return () => abortController.abort();
  }, [deckId]); */

  return (
    <div>
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
    </div>
  );
}

export default DeckView;
