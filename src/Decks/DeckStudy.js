import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import CardStudy from "../Cards/CardStudy";
import CardNotEnough from "../Cards/CardNotEnough";

function DeckStudy({ deck }) {
  let displayCard = "loading...";
  const history = useHistory();

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
    // Checks for end of deck / restart
    if (cardNumber >= totalCards && totalCards >= 3) {
      // if user clicks "OK"
      if (
        window.confirm(`Restart cards? Click 'cancel' to return to homepage.`)
      ) {
        setFlashCard(initialFlashCardState);
        //if user clicks "Cancel"
      } else {
        history.push("/");
      }
      // Advance to next flashcard
    } else {
      setFlashCard({
        ...flashCard,
        cardNumber: cardNumber + 1,
        cardFlipped: false,
        nextButton: false,
      });
    }
  };

  const { cards, name, id } = deck;
  const totalCards = cards?.length;

  const flashCards = cards?.map((card) => {
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

  if (deck.length) {
    const notEnoughCards = <CardNotEnough total={totalCards} deckId={id} />;
    const enoughCards = flashCards[cardNumber - 1];

    displayResult = totalCards <= 2 ? notEnoughCards : enoughCards;

    displayCard = (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${id}`}>{name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>{name}</h1>
        {displayResult}
      </div>
    );
  }

  return displayCard;
}

export default DeckStudy;
