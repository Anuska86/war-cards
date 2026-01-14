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
  if (deckId) {
    fetch(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    )
      .then((res) => res.json())
      .then((data) => {
        const cardsContainer = document.getElementById("cards-container");

        cardsContainer.innerHTML = `
            <img src="${data.cards[0].image}" class="card" />
            <img src="${data.cards[1].image}" class="card" />
        `;
      });
  } else {
    console.error("No deck ID found! Click 'Get New Deck' first.");
    alert("Please get a new deck before drawing cards!");
  }
});
