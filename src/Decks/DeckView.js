import React, { useEffect, useState } from "react";
import { useParams, Route, Switch } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import DeckButtons from "./DeckButtons";
import CardList from "../Cards/CardList";
import FormDeck from "../Forms/FormDeck";
import DeckStudy from "./DeckStudy";
import NotFound from "../Layout/NotFound";

function DeckView({ handleDelete }) {
  const { deckId } = useParams();

  console.log("DeckView level 3 ran");

  const [flashDeck, setFlashDeck] = useState([]);
  const { id, name, description, cards } = flashDeck;

  useEffect(() => {
    async function getFlashDeck() {
      const flashDeckFromApi = await readDeck(deckId);
      /**
       * ! */ console.log(`DeckView getting deck ${deckId}`, flashDeckFromApi);
      setFlashDeck(flashDeckFromApi);
    }
    getFlashDeck();
  }, [deckId]);

  // useEffect(() => {
  //   setFlashDeck({});
  //   const abortController = new AbortController();
  //   async function getFlashDeck() {
  //     try {
  //       const flashDeckFromApi = await readDeck(deckId);
  //       console.log(`DeckView w/ abort getting deck ${deckId}`, flashDeckFromApi);
  //       setFlashDeck(flashDeckFromApi);
  //     } catch (error) {
  //       if (error.name === "AbortError") {
  //         // Ignore `AbortError`
  //         console.log("Aborted", deckId);
  //       } else {
  //         throw error;
  //       }
  //     }
  //   }
  //   getFlashDeck();
  //   return () => abortController.abort();
  // }, [deckId]);

  function DisplayDeckView({ cards }) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {name}
            </li>
          </ol>
        </nav>
        <div className="mb-4" key={id}>
          <h5>{name}</h5>
          <p>{description}</p>
          <DeckButtons id={id} handleDelete={handleDelete} />
        </div>
        <CardList cards={cards} />
      </div>
    );
  }

  return (
    <div>
      <Switch>
        <Route path="/decks/:deckId/edit">
          <FormDeck edit={true} flashDeck={flashDeck} setFlashDeck={setFlashDeck} deckId={deckId} />
        </Route>
        <Route path="/decks/:deckId/study">
          <DeckStudy deck={flashDeck} />
        </Route>
        <Route path="/decks/:deckId">
          <DisplayDeckView cards={cards} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default DeckView;
