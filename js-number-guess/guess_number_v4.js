/*=================
Settings section
=================*/
const easySettings = {
  name: "easy",
  range: 10,
  rounds: 3,
  baseScore: 30,
};
const mediumSettings = {
  name: "medium",
  range: 20,
  rounds: 2,
  baseScore: 50,
};
const hardSettings = {
  name: "hard",
  range: 30,
  rounds: 1,
  baseScore: 100,
};

let appliedSettings = easySettings;

/*=================
Game initialization section
=================*/
let secretNo;
let currentRound;

/*=================
HTML elements initialization section
=================*/
const buttonGuess = document.getElementById("buttonGuess");
const inputGuess = document.getElementById("inputGuess");

buttonGuess.onclick = function (evt) {
  const buttonValue = evt.target.value;
  console.log(buttonValue);
  if (buttonValue === "Start game") {
    buttonGuess.value = "Guess";
    inputGuess.disabled = false;
    document.querySelectorAll("input[name='difficulty']").forEach((input) => {
      input.disabled = true;
    });
  } else if (buttonValue === "Guess") {
    const guess = getUserGuess();
    if (guess === secretNo) {
      const score = calculateScore(currentRound);
      buttonGuess.disabled = true;
      alertUser(`You won. Your score is: ${score}`);
    } else {
      const triesLeft = appliedSettings.rounds - currentRound;
      if (triesLeft === 0) {
        alertUser("Game over. You lost. Score is 0");
        buttonGuess.disabled = true;
      } else {
        const higherOrLower = guess > secretNo ? "higher" : "lower";
        alertUser(
          `You entered a number (${guess}) ${higherOrLower} than the secret. Tries left: ${triesLeft}`
        );
      }
    }
    currentRound++;
  }
};

function onGameOver() {
  //1. Change "Guess" -> "Start game"
  //2. Clicking "Start game" should reset the game
}

function initializeGame() {
  currentRound = 1;
  document.querySelectorAll("input[name='difficulty']").forEach((input) => {
    input.disabled = false;
  });
  secretNo = getRandomNumBetween(1, appliedSettings.range);
  buttonGuess.value = "Guess";
}

document.querySelectorAll("input[name='difficulty']").forEach((input) => {
  input.addEventListener("change", (evt) => {
    if (currentRound === 1) {
      switch (evt.target.value) {
        case "easy":
          appliedSettings = easySettings;
          break;

        case "medium":
          appliedSettings = mediumSettings;
          break;

        case "hard":
          appliedSettings = hardSettings;
      }
    }
  });
});

/*=================
Utilities / Helper section
=================*/

function getUserGuess() {
  const guess = Number(inputGuess.value);
  return guess;
}

function getRandomNumBetween(lo, hi) {
  const num = Math.floor(lo + Math.random() * (hi - lo + 1));
  return num;
}

function alertUser(message) {
  const ul = document.getElementById("alerts");
  const li = document.createElement("li");
  li.innerText = message;
  ul.prepend(li);
}

function calculateScore(attempts) {
  const base = appliedSettings.baseScore;
  const roundFactor = Math.pow(2, attempts - 1);
  const finalScore = Math.round(base / roundFactor);
  return finalScore;
}
