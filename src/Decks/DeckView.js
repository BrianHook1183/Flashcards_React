import React, { useEffect, useState } from "react";
import { useParams, Link, Route, Switch } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import DeckButtons from "./DeckButtons";
import CardList from "../Cards/CardList";
import FormDeck from "../Forms/FormDeck";
import NotFound from "../Layout/NotFound";

function DeckView() {
  const { deckId } = useParams();
  const [flashDeck, setFlashDeck] = useState([]);
  const { id, name, description, cards } = flashDeck;

  // useEffect(() => {
  //   async function getFlashDeck() {
  //     const flashDeckFromApi = await readDeck(deckId);
  //     console.log(`DeckView getting deck ${deckId}`, flashDeckFromApi);
  //     setFlashDeck(flashDeckFromApi);
  //   }
  //   getFlashDeck();
  // }, [deckId]);


  useEffect(() => {
    setFlashDeck({});
    const abortController = new AbortController();
  
    async function getFlashDeck() {
      try {
        const deckFromAPI = await readDeck(deckId);
        console.log(`DeckView getting deck ${deckId}`, deckFromAPI);
        setFlashDeck(deckFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log("Aborted", deckId);
        } else {
          throw error;
        }
      }
    }
  
    getFlashDeck();
  
    return () => abortController.abort();
  }, [deckId]);







  function OldContent({cards}) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {name}
            </li>
          </ol>
        </nav>
        <div className="mb-4" key={id}>
          <h5>{name}</h5>
          <p>{description}</p>
          <DeckButtons id={id} />
        </div>
        <CardList cards={cards} />
      </div>
    );
  }
    return (
      <div>
        <Switch>
          <Route path={"/decks/:deckId/edit"}>
            <FormDeck edit={true} deck={flashDeck} setFlashDeck={setFlashDeck} />
          </Route>
          <Route path="/decks/:deckId">
            <OldContent cards={cards} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    );
}

export default DeckView;
