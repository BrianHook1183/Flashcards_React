import React, { useState } from "react";
import CardStudy from "../Cards/CardStudy";
import CardNotEnough from "../Cards/CardNotEnough";

function DeckStudy({ deck }) {
  let displayCard = "loading...";

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

  const { cards, name } = deck;
  const totalCards = cards.length;

  const flashCards = cards.map((card) => {
    //todo add flashCards to hook so map doesn't run on every component render
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

  let displayResult = null;
  const notEnoughCards = <CardNotEnough total={totalCards} deckId={deck.id} />;
  const enoughCards = flashCards[cardNumber - 1];

  displayResult = totalCards <= 2 ? notEnoughCards : enoughCards;

  displayCard = (
    <div>
      <h1>{name}</h1>
      {displayResult}
    </div>
  );

  if (cardNumber > totalCards && totalCards >= 3) {
    if (window.confirm(`Restart cards?`)) {
      setFlashCard(initialFlashCardState);
    }
  }

  return displayCard;
}

export default DeckStudy;
