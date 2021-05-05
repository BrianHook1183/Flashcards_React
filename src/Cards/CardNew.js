import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import FormCard from "../Forms/FormCard";

function CardNew() {
  // console.log("CardNew ran");

  const { deckId } = useParams();

  const formReset = {
    front: "",
    back: "",
  };

  const deckReset = {
    id: deckId,
    name: "",
    description: "",
  };

  const [flashDeck, setFlashDeck] = useState(deckReset);

  useEffect(() => {
    async function getFlashDeck() {
      try {
        // console.log(`API readDeck(${deckId}) ran`);
        const deckFromApi = await readDeck(deckId);
        // console.log("deckFromApi", deckFromApi);
        setFlashDeck(deckFromApi);
      } catch (error) {
        throw new Error(`API readDeck(${deckId}) had an error: ${error}`);
      }
    }
    getFlashDeck();
  }, [deckId]);

  const [newCard, setNewCard] = useState(formReset);

  const handleFormChange = ({ target }) => {
    setNewCard({
      ...newCard,
      [target.id]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log("FormCard(new) Submitted:", newCard);
    await createCard(deckId, newCard);
    // console.log("Created newCard!", newCard);
    setNewCard(formReset);
    // history.go(0);
  }

  // for breadcrumb path
  let deckName = flashDeck?.name ? flashDeck?.name : "loading...";

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deckName}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Add Card
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
      {breadcrumb}
      <h2>{deckName}: Add Card</h2>
      <FormCard
        handleSubmit={handleSubmit}
        handleFormChange={handleFormChange}
        flashCard={newCard}
      />
    </div>
  );
}

export default CardNew;
