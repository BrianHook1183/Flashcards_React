import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api/index";
import FormCard from "../Forms/FormCard";

function CardEdit() {
  // console.log("CardEdit ran");

  const history = useHistory();
  const { deckId, cardId } = useParams();

  const cardReset = {
    id: cardId,
    front: "",
    back: "",
    deckId: deckId,
  };

  const deckReset = {
    id: deckId,
    name: "",
    description: "",
  };

  const [flashDeck, setFlashDeck] = useState(deckReset);
  const [flashCard, setFlashCard] = useState(cardReset);

  useEffect(() => {
    async function getFlashDeck() {
      try {
        // console.log(`API readDeck(${deckId}) ran`);
        const deckFromApi = await readDeck(deckId);
        // console.log("deckFromApi", deckFromApi);
        setFlashDeck(deckFromApi);

        // console.log(`API readCard(${cardId})  ran`);
        const cardFromApi = await readCard(cardId);
        // console.log("cardFromApi", cardFromApi);
        setFlashCard(cardFromApi);
      } catch (error) {
        throw new Error(`API readDeck(${deckId}) had an error: ${error}`);
      }
    }
    getFlashDeck();
  }, [deckId, cardId]);

  const handleFormChange = ({ target }) => {
    setFlashCard({
      ...flashCard,
      [target.id]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log("FormCard(edit) Submitted:", flashCard);
    await updateCard({
      ...flashCard,
      front: flashCard.front,
      back: flashCard.back,
    });
    history.goBack();
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
          Edit Card {cardId}
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
      {breadcrumb}
      <FormCard
        handleSubmit={handleSubmit}
        handleFormChange={handleFormChange}
        flashCard={flashCard}
      />
    </div>
  );
}

export default CardEdit;
