import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import FormDeck from "../Forms/FormDeck";

function EditDeck() {

  const { deckId } = useParams();
  const history = useHistory();

  const initialFormState = {
    id: "",
    name: "",
    ogName: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const { id, name, ogName, description } = formData;

  useEffect(() => {
    async function getFlashDeck() {
      const flashDeckFromApi = await readDeck(deckId);
      console.log(`FormDeck getting deck ${deckId}`, flashDeckFromApi);
      // setFormData({...flashDeckFromApi});
      setFormData({
        id: flashDeckFromApi.id,
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
    updateDeck({
      id: id,
      name: name,
      description: description,
    });
    history.goBack();
  };

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{ogName}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          buttonEdit Deck
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
      {breadcrumb}
      <FormDeck setFormData={setFormData} />
    </div>
  );
}

export default EditDeck;
