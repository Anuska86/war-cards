let deckId;

const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");
const cardSlots = document.getElementById("card-slots").children;

newDeckBtn.addEventListener("click", () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      console.log("New deck created:", deckId);
    });
});

//Draw the cards
drawCardBtn.addEventListener("click", () => {
  if (deckId) {
    fetch(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    )
      .then((res) => res.json())
      .then((data) => {
        document.getElementById(
          "remaining-cards"
        ).textContent = `Remaining cards: ${data.remaining}`;

        cardSlots[0].innerHTML = `<img src="${data.cards[0].image}" />`;
        cardSlots[1].innerHTML = `<img src="${data.cards[1].image}" />`;

        //Winner
        const winnerText = determineWinner(data.cards[0], data.cards[1]);
        document.getElementById("header").textContent = winnerText;
      });
  } else {
    console.error("No deck ID found! Click 'Get New Deck' first.");
    alert("Please get a new deck before drawing cards!");
  }
});

//Card Value

function determineCardValue(card) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  return valueOptions.indexOf(card.value);
}

//Winner

function determineWinner(card1, card2) {
  const value1 = determineCardValue(card1);
  const value2 = determineCardValue(card2);

  if (value1 > value2) {
    return "Computer wins!";
  } else if (value1 < value2) {
    return "You win!";
  } else {
    return "War!";
  }
}
