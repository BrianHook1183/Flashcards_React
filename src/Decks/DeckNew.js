import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import FormDeck from "../Forms/FormDeck";

function DeckNew() {
  // console.log("DeckNew ran");
  const history = useHistory();

  const formReset = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(formReset);

  const handleFormChange = ({ target }) => {
    setNewDeck({
      ...newDeck,
      [target.id]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log("FormDeck(new) Submitted:", newDeck);
    const response = await createDeck({
      name: newDeck.name,
      description: newDeck.description,
    });
    const newFlashDeck = await response;

    // setNewDeck(formReset);
    // console.log("Created newFlashDeck!", newFlashDeck);
    history.push(`/decks/${newFlashDeck.id}`);
  }

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Create Deck
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
        existingDeck={newDeck}
      />
    </div>
  );
}

export default DeckNew;
