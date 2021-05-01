import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { listDecks } from "../utils/api/index";
import { deleteDeck } from "../utils/api/index";
import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "../Decks/Decks";
// import FormCard from "../Forms/FormCard";

function Layout() {
  const [flashDecks, setFlashDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getFlashDecks() {
      const flashDecksFromApi = await listDecks();
      console.log("LayoutIndex gettingDecks", flashDecksFromApi);
      setFlashDecks(flashDecksFromApi);
    }
    getFlashDecks();
  }, [setFlashDecks]);

  const handleDelete = (id) => {
    console.log("handleDelete ran with id:", id);
    if (window.confirm("Do you really want to delete this deck?")) {
      deleteDeck(id);

      setFlashDecks((currentDecks) =>
        currentDecks.filter((deck) => deck.id !== id)
      );

      history.push("/");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/">
            <Decks decks={flashDecks} handleDelete={handleDelete} />
          </Route>
          {/*           <Route path="/decks/:deckId/cards/:cardId/edit">
            <FormCard />
          </Route> */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
