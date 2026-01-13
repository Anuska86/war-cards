let deckId;

const newDeckBtn = document.getElementById("new-deck");

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      deckId = data.deck_id;
    });
}

newDeckBtn.addEventListener("click", handleClick);
