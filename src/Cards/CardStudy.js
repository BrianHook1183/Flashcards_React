import React from "react";
import CardStudyButtons from "./CardStudyButtons";

function CardStudy({
  card,
  total,
  handleNext,
  handleFlip,
  cardNumber,
  cardFlipped,
  nextButton,
}) {
  const { id, front, back } = card;

  const question = <p className="card-body">{front}</p>;
  const answer = <p className="card-body text-success">{back}</p>;

  const content = cardFlipped ? answer : question;

  return (
    <div className="card" key={id}>
      <div className="card-body">
        <h5 className="card-title">
          Card {cardNumber} of {total}
        </h5>
        {content}
      </div>
      <CardStudyButtons
        handleNext={handleNext}
        handleFlip={handleFlip}
        nextButton={nextButton}
      />
    </div>
  );
}

export default CardStudy;
