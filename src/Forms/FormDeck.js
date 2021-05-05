import React from "react";
import { useHistory } from "react-router-dom";

function FormDeck({ existingDeck, handleFormChange, handleSubmit }) {
  // console.log("FormDeck ran");
  const history = useHistory();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="name"
            placeholder="Enter the name for the deck"
            onChange={handleFormChange}
            value={existingDeck.name}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            placeholder="add a description for the deck"
            onChange={handleFormChange}
            value={existingDeck.description}
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
}

export default FormDeck;
