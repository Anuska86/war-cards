let deckId;
let computerScore = 0;
let playerScore = 0;

const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");
const cardSlots = document.getElementById("card-slots").children;

newDeckBtn.addEventListener("click", () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      computerScore = 0;
      playerScore = 0;

      document.getElementById(
        "remaining-cards"
      ).textContent = `Remaining cards: ${data.remaining}`;
      cardSlots[0].innerHTML = `<div class="placeholder"></div>`;
      cardSlots[1].innerHTML = `<div class="placeholder"></div>`;

      document.getElementById("computer-score").textContent = 0;
      document.getElementById("player-score").textContent = 0;
      document.getElementById("header").textContent = "War!";
      drawCardBtn.disabled = false;
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
        // Remaining cards
        document.getElementById(
          "remaining-cards"
        ).textContent = `Remaining cards: ${data.remaining}`;

        // Draw the cards
        cardSlots[0].innerHTML = `<img src="${data.cards[0].image}" />`;
        cardSlots[1].innerHTML = `<img src="${data.cards[1].image}" />`;

        const winnerText = determineWinner(data.cards[0], data.cards[1]);
        document.getElementById("header").textContent = winnerText;

        if (winnerText === "Computer wins!") {
          computerScore++;
          document.getElementById("computer-score").textContent = computerScore;
        } else if (winnerText === "You win!") {
          playerScore++;
          document.getElementById("player-score").textContent = playerScore;
        }

        if (data.remaining === 0) {
          drawCardBtn.disabled = true;
          if (computerScore > playerScore) {
            document.getElementById("header").textContent =
              "The Computer won the war!";
          } else if (playerScore > computerScore) {
            document.getElementById("header").textContent = "You won the war!";
          } else {
            document.getElementById("header").textContent = "It's a tie game!";
          }
        }
      });
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
