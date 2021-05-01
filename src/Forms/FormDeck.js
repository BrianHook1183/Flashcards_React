import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api/index";

function FormDeck({ edit, deck, setFlashDeck }) {
  //* edit is a boolean. false means create new
  const { id, name, description } = deck;
  const history = useHistory();

let initialFormState = null;

  if (id) {
    initialFormState = {
      id: id,
      name: name,
      ogName: name,
      description: description,
    };
  } else {
    initialFormState = {
      id: "",
      name: "",
      ogName: "",
      description: "",
    };
  }

  console.log("initialFormState", initialFormState);

  const [formData, setFormData] = useState(initialFormState);

  // if (id) {
  //   setFormData({
  //     id: id,
  //     name: name,
  //     ogName: name,
  //     description: description,
  //   });
  // }

  /*   useEffect(() => {
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
  }, [deckId]); */

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.id]: target.value,
    });
  };




    async function handleSubmit(event)  {
      event.preventDefault();
      console.log("Submitted:", formData);
      await updateDeck({
        id: formData.id,
        name: formData.name,
        description: formData.description,
      });
      await setFlashDeck({
        id: formData.id,
        name: formData.name,
        description: formData.description,
      });
      // setFormData({ ...initialFormState });
      history.goBack();
    }

/*     async function handleSubmit(event)  {
      event.preventDefault();
      console.log("Submitted:", formData);
      setFormData({ ...initialFormState });
      await updateDeck({
        ...deck,
        id: formData.id,
        name: formData.name,
        description: formData.description,
      });
      //todo if new deck, need to get deckId somehow
      // history.push(`/decks/${deckId}`);
    }; */


  let deckIdCrumb = null;
  if (edit) {
    deckIdCrumb = (
      <li className="breadcrumb-item">
        <Link to={`/decks/${id}`}>{formData.ogName}</Link>
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
