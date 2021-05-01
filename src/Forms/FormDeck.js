import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

function FormDeck() {
  const { deckId } = useParams();
  const history = useHistory();

  //* determines if form should be in New or Edit mode
  const editForm = deckId ? true : false;

  const initialFormState = {
    deckName: "",
    deckDescription: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  //TODO if editForm=true, then api call to readDeck and then setFormData

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    setFormData({ ...initialFormState });
    //todo run api set
    //todo push deckId into useHistory
  };

  //TODO replace with actual name of deck in breadcrumb path
  let deckIdCrumb = null;
  if (editForm) {
    deckIdCrumb = (
      <li className="breadcrumb-item">
        <Link to={`/decks/${deckId}`}>Name of Deck {deckId}</Link>
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
          {editForm ? "Edit" : "Create"} Deck
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
            id="deckName"
            placeholder="Enter the name for the deck"
            onChange={handleChange}
            value={formData.deckName}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="deckDescription">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="deckDescription"
            placeholder="add a description for the deck"
            onChange={handleChange}
            value={formData.deckDescription}
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
