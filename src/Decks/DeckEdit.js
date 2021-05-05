import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api/index";
import FormDeck from "../Forms/FormDeck";

function DeckEdit() {
  // console.log("DeckEdit ran");
  const history = useHistory();
  const { deckId } = useParams();

  const formReset = {
    id: "",
    name: "",
    description: "",
  };

  const [existingDeck, setExistingDeck] = useState(formReset);

  useEffect(() => {
    async function getFlashDeck() {
      try {
        // console.log(`API readDeck(${deckId}) ran`);
        const deckFromApi = await readDeck(deckId);
        // console.log("deckFromApi", deckFromApi);
        setExistingDeck(deckFromApi);
      } catch (error) {
        throw new Error(`API readDeck(${deckId}) had an error: ${error}`);
      }
    }
    getFlashDeck();
  }, [deckId]);

  const handleFormChange = ({ target }) => {
    setExistingDeck({
      ...existingDeck,
      [target.id]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log("FormDeck(edit) Submitted:", existingDeck);
    await updateDeck({
      ...existingDeck,
      id: existingDeck.id,
      name: existingDeck.name,
      description: existingDeck.description,
    });
    history.goBack();
  }

  // for breadcrumb path
  let ogDeckName = existingDeck?.name ? existingDeck?.name : "loading...";

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{ogDeckName}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Deck
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
      {breadcrumb}
      <FormDeck
        handleSubmit={handleSubmit}
        handleFormChange={handleFormChange}
        existingDeck={existingDeck}
      />
    </div>
  );
}

export default DeckEdit;
