import React from "react";
// import { useParams } from "react-router-dom";
import CardButtons from "./CardButtons";

function CardList({ cards }) {
  // const { deckId } = useParams();
  let displayCards = "loading...";

  if (cards) {
    displayCards = cards.map((card) => {
      const { id, front, back } = card;
      return (
        <div
          className="card justify-content-between"
          style={{ minWidth: "22rem" }}
          key={id}
        >
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <p className="card-text">{front}</p>
              </div>

              <div className="col-6">
                <p className="card-text">{back}</p>
              </div>
            </div>

            <div className="text-right">
              <CardButtons id={id} />
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <h2>Cards</h2>
      <div className="card-deck">{displayCards}</div>
    </div>
  );
}

export default CardList;
