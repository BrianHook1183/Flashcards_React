import React from "react";

function DeckStudy({ deck }) {
  let displayCards = "loading...";

  if (deck.cards) {
    displayCards = deck.cards.map((card) => {
      const { id, front, back } = card;
      return (
        <div
          className="card justify-content-between"
          style={{ minWidth: "22rem" }}
          key={id}
        >
          <div className="card-body">
            <div className="row">
              <p className="card-text">{front}</p>
              <p className="card-text">{back}</p>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <h1>{deck.name}</h1>
      <div className="card-deck">{displayCards}</div>
    </div>
  );
}

export default DeckStudy;
