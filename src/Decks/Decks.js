import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useHistory, useParams } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import DeckView from "./DeckView";
import DeckStudy from "./DeckStudy";
import DeckEdit from "./DeckEdit";
import DeckNew from "./DeckNew";
import Deck from "./Deck";
import CardEdit from "../Cards/CardEdit";
import CardNew from "../Cards/CardNew";
import NotFound from "../Layout/NotFound";

function Decks() {
  const { deckId } = useParams();
  const history = useHistory();

  // console.log("Decks.js ran");

  const [flashDecks, setFlashDecks] = useState([]);

  useEffect(() => {
    async function getFlashDecks() {
      const flashDecksFromApi = await listDecks();
      // console.log("API listDecks() in Decks component", flashDecksFromApi);
      setFlashDecks(flashDecksFromApi);
    }
    getFlashDecks();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this deck?")) {
      deleteDeck(id);

      setFlashDecks((currentDecks) =>
        currentDecks.filter((deck) => deck.id !== id)
      );

      history.push("/");
    }
  };

  const deckList = flashDecks.map((deck) => {
    return (
      <Deck
        key={deck?.id}
        id={deck?.id}
        name={deck?.name}
        description={deck?.description}
        totalCards={deck?.cards?.length}
        handleDelete={handleDelete}
      />
    );
  });

  function DisplayDecks({ flashDecks }) {
    return (
      <div>
        <Link to="/decks/new">
          <button type="button" className="btn btn-secondary mb-4">
            + Create Deck
          </button>
        </Link>

        {/*       <div className="card-deck"> */}
        {flashDecks}
      </div>
      /*     </div> */
    );
  }

  return (
    <div className="container" style={{ maxWidth: "800px", paddingBottom: "20px" }}>
      <Switch>
        <Route exact={true} path="/">
          <DisplayDecks flashDecks={deckList} deckId={deckId} />
        </Route>

        <Route path="/decks/:deckId/cards/:cardId/edit">
          <CardEdit />
        </Route>

        <Route path="/decks/:deckId/cards/new">
          <CardNew />
        </Route>

        <Route path="/decks/:deckId/study">
          <DeckStudy />
        </Route>

        <Route path="/decks/:deckId/edit">
          <DeckEdit />
        </Route>

        <Route path="/decks/new">
          <DeckNew />
        </Route>

        <Route path="/decks/:deckId">
          <DeckView handleDelete={handleDelete} />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Decks;
