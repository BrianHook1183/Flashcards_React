import Deck from "./Deck";

function Decks() {
  return (
    <div>
      <button type="button" className="btn btn-secondary">
        + Create Deck
      </button>

      {/*       <div className="card-deck"> */}
      <Deck />
      <Deck />
      <Deck />
    </div>
    /*     </div> */
  );
}

export default Decks;
