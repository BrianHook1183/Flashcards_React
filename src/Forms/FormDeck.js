import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateDeck, createDeck } from "../utils/api/index";

function FormDeck({ edit = false, deck, setFlashDeck }) {
  //* edit is a boolean. false means create new
  // console.log("edit?", edit);

  const history = useHistory();

  let initialFormState = null;

  if (edit) {
    initialFormState = {
      id: deck.id,
      name: deck.name,
      ogName: deck.name,
      description: deck.description,
    };
  } else {
    initialFormState = {
      name: "",
      description: "",
    };
  }

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted:", formData);
    if (edit) {
      await updateDeck({
        ...deck,
        id: formData.id,
        name: formData.name,
        description: formData.description,
      });
      await setFlashDeck({
        ...deck,
        id: formData.id,
        name: formData.name,
        description: formData.description,
      });
      history.goBack();
    } else {
      const response = await createDeck({
        name: formData.name,
        description: formData.description,
      });
      const newDeck = await response;
      console.log("Created newDeck!", newDeck);
      history.push(`/decks/${newDeck.id}`);
    }
  }

  let deckIdCrumb = null;
  if (edit) {
    deckIdCrumb = (
      <li className="breadcrumb-item">
        <Link to={`/decks/${deck.id}`}>{formData.ogName}</Link>
      </li>
    );
  }
  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {deckIdCrumb}
        <li className="breadcrumb-item active" aria-current="page">
          {edit ? "Edit" : "Create"} Deck
        </li>
      </ol>
    </nav>
  );

  const form = (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deckName">Name</label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="name"
            placeholder="Enter the name for the deck"
            onChange={handleChange}
            value={formData.name}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="deckDescription">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            placeholder="add a description for the deck"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>
        <button
          type="button"
          onClick={() => history.goBack()}
          className="btn btn-secondary mr-2"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );

  return (
    <div>
      {breadcrumb}
      {form}
    </div>
  );
}

export default FormDeck;
