import React, { useState } from "react";
import CardStudy from "../Cards/CardStudy";

function DeckStudy({ deck }) {
  let displayCards = "loading...";

  const initialFlashCardState = {
    cardNumber: 1,
    cardFlipped: false,
    nextButton: false,
  };

  const [flashCard, setFlashCard] = useState(initialFlashCardState);
  const { cardNumber, cardFlipped, nextButton } = flashCard;

  const handleFlip = () => {
    setFlashCard({ ...flashCard, cardFlipped: !cardFlipped, nextButton: true });
  };

  const handleNext = () => {
    setFlashCard({
      ...flashCard,
      cardNumber: cardNumber + 1,
      cardFlipped: false,
      nextButton: false,
    });
  };

  if (deck) {
    const { cards, name } = deck;
    const totalCards = cards.length;

    const flashCards = cards.map((card) => {
      return (
        <CardStudy
          cardNumber={cardNumber}
          cardFlipped={cardFlipped}
          card={card}
          key={card.id}
          total={totalCards}
          handleNext={handleNext}
          handleFlip={handleFlip}
          nextButton={nextButton}
        />
      );
    });

    displayCards = (
      <div>
        <h1>{name}</h1>
        {flashCards[cardNumber - 1]}
      </div>
    );

    if (cardNumber > totalCards) {
      if (window.confirm(`Restart cards?`)) {
        setFlashCard(initialFlashCardState);
      }
    }
  }

  return displayCards;
}

export default DeckStudy;
