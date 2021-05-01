import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import DeckView from "./DeckView";
import FormDeck from "../Forms/FormDeck";
import Deck from "./Deck";
import NotFound from "../Layout/NotFound";

function Decks({ decks }) {
  const deckList = decks.map((deck) => {
    return (
      <Deck
        key={deck.id}
        id={deck.id}
        name={deck.name}
        description={deck.description}
      />
    );
  });

  function DisplayDecks({ decks }) {
    return (
      <div>
        <Link to="/decks/new">
          <button type="button" className="btn btn-secondary">
            + Create Deck
          </button>
        </Link>

        {/*       <div className="card-deck"> */}
        {decks}
      </div>
      /*     </div> */
    );
  }

  return (
    <div className="container">
      <Switch>
        <Route exact={true} path="/">
          <DisplayDecks decks={deckList} />
        </Route>

        <Route path="/decks/new">
          <FormDeck edit={false} />
        </Route>

        <Route path={["/decks/:deckId", "/decks/:deckId/edit"]}>
          <DeckView />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Decks;
