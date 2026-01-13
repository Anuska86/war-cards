let deckId;

const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");

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
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Cards drawn:", data.cards);
    });
});
