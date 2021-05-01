import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function FormDeck() {
  const { deckId } = useParams();
  const history = useHistory();

  //* determines if form should be in New or Edit mode
  const editForm = deckId ? true : false;

  const initialFormState = {
    name: "",
    ogName: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const { name, ogName, description } = formData;

  useEffect(() => {
    async function getFlashDeck() {
      const flashDeckFromApi = await readDeck(deckId);
      console.log(`FormDeck getting deck ${deckId}`, flashDeckFromApi);
      // setFormData({...flashDeckFromApi});
      setFormData({
        name: flashDeckFromApi.name,
        ogName: flashDeckFromApi.name,
        description: flashDeckFromApi.description,
      });
    }
    getFlashDeck();
  }, [deckId]);

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
    //todo if !editForm then deckId = returned value from api
    editForm ? history.goBack() : history.push(`/decks/${deckId}`);
  };

  let deckIdCrumb = null;
  if (editForm) {
    deckIdCrumb = (
      <li className="breadcrumb-item">
        <Link to={`/decks/${deckId}`}>{ogName}</Link>
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
            id="name"
            placeholder="Enter the name for the deck"
            onChange={handleChange}
            value={name}
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
            value={description}
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
