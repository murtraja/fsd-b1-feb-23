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
const secretNo = getRandomNumBetween(1, appliedSettings.range);
let currentRound = 1;

/*=================
HTML elements initialization section
=================*/
const buttonGuess = document.getElementById("buttonGuess");
const inputGuess = document.getElementById("inputGuess");

buttonGuess.onclick = function () {
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
      alertUser(`Please try again. Tries left: ${triesLeft}`);
    }
  }
  currentRound++;
  document.querySelectorAll("input[name='difficulty']").forEach((input) => {
    input.disabled = true;
  });
};

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
// const playRound = function playRound(roundNo, totalRounds, secretNo) {
//   const tryString = `(Try ${roundNo} of ${totalRounds})`;
//   const guessNo = Number(
//     prompt(
//       `Please guess a number between 1 and ${appliedSettings.range} ${tryString}`
//     )
//   );

//   return guessNo;
// };
console.log("generated secret no: ", secretNo);
const totalRounds = appliedSettings.rounds;
let userWon = false;

// for (let round = 1; round <= totalRounds; round++) {
//   console.log(round);
//   const result = playRound(round, totalRounds, secretNo);
//   if (result === secretNo) {
//     // user gave the right answer
//     alert("You won");
//     userWon = true;
//     break;
//   }
//   if (round != totalRounds) {
//     if (isNaN(result) || result < 1 || result > appliedSettings.range) {
//       alert("Try again. You entered an invalid number");
//     } else {
//       const higherOrLower = result > secretNo ? "higher" : "lower";
//       alert(
//         `Try again. You entered a number (${result}) ${higherOrLower} than the secret`
//       );
//     }
//   }
// }
// if (!userWon) {
//   alert("You lost. Game over!");
// }

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
