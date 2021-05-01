import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

function FormDeck() {
  const initialFormState = {
    deckName: "",
    deckDescription: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
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
  };
  const { deckId } = useParams();
  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>Name of Deck {deckId}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Deck
        </li>
      </ol>
    </nav>
  );

  //TODO replace with actual name of deck in breadcrumb path
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
        <Link to={`/decks/${deckId}`}>
          <button type="button" className="btn btn-secondary mr-2">
            Cancel
          </button>
        </Link>
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
