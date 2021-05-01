import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import FormDeck from "../Forms/FormDeck";

function CreateDeck() {

  const history = useHistory();

  const initialFormState = {
    id: "",
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const { id, name, description } = formData;

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
    updateDeck({
      id: id,
      name: name,
      description: description,
    });
    //todo need to get deckId somehow
    //  history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      {breadcrumb}
      <FormDeck />
    </div>
  );
}

export default CreateDeck;
