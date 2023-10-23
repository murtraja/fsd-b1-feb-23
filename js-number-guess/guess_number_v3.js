/*
    Features:
    1. Using a random number generator now
    2. Giving helpful message, whether guess is lower or higher than the secret
    3. Checking if user entered an invalid response like "12fsd" (NaN) / -3 / 9999
        -> if invalid, display invalid number entered
    4. Added a difficulty setting object
*/
const easySettings = {
  range: 10,
  rounds: 3,
};
const mediumSettings = {
  range: 20,
  rounds: 2,
};
const hardSettings = {
  range: 30,
  rounds: 1,
};

const appliedSettings = easySettings;

const playRound = function playRound(roundNo, totalRounds, secretNo) {
  const tryString = `(Try ${roundNo} of ${totalRounds})`;
  const guessNo = Number(
    prompt(
      `Please guess a number between 1 and ${appliedSettings.range} ${tryString}`
    )
  );

  return guessNo;
};
const secretNo = getRandomNumBetween(1, appliedSettings.range);
console.log("generated secret no: ", secretNo);
const totalRounds = appliedSettings.rounds;
let userWon = false;

for (let round = 1; round <= totalRounds; round++) {
  console.log(round);
  const result = playRound(round, totalRounds, secretNo);
  if (result === secretNo) {
    // user gave the right answer
    alert("You won");
    userWon = true;
    break;
  }
  if (round != totalRounds) {
    if (isNaN(result) || result < 1 || result > appliedSettings.range) {
      alert("Try again. You entered an invalid number");
    } else {
      const higherOrLower = result > secretNo ? "higher" : "lower";
      alert(
        `Try again. You entered a number (${result}) ${higherOrLower} than the secret`
      );
    }
  }
}
if (!userWon) {
  alert("You lost. Game over!");
}

function getRandomNumBetween(lo, hi) {
  const num = Math.floor(lo + Math.random() * (hi - lo + 1));
  return num;
}
