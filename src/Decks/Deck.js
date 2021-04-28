import DeckOptions from "./DeckOptions";

function Deck() {
  return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Deck Title</h5>
          <p className="card-text">
            This is the description of a single deck of flashcards. This is the description of a single deck of flashcards. This is the description of a single deck of flashcards.
          </p>
          <DeckOptions />
        </div>
      </div>
  );
}

export default Deck;
