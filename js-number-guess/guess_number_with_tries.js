/*
We define a "round"
  1. Computer asks the user for a number
  2. User enters the number
  3. Computer matches the number with the secret
  4. Determines whether it matched or not

Overall flow of the game:
  1. Computer sets a secret No
  2. Computer fixes the number of "rounds"
  3. Computer runs each round
  4. If at the end of any round, user gave a correct answer, display "Win"
  5. After all unsuccessful rounds, display "Lost"

Round function
  inputs: Round number, totalRounds, secretNo
  output: boolean true / false
    true: successful round
    false: unsuccessful round
*/

function playRound(roundNo, totalRounds, secretNo) {
  const tryString = `(Try ${roundNo} of ${totalRounds})`;
  const tryString2 = "(Try " + roundNo + " of " + totalRounds + ")";
  const guessNo = parseInt(
    prompt(`Please guess a number between 1 and 10 ${tryString}`)
  );

  // if (guessNo === secretNo) {
  //   return true;
  // } else {
  //   return false;
  // }
  return guessNo === secretNo;
}

const secretNo = 7;

const totalRounds = 3;
let userWon = false;

for (let round = 1; round <= totalRounds; round++) {
  console.log(round);
  const result = playRound(round, totalRounds, secretNo);
  if (result) {
    // user gave the right answer
    alert("You won");
    userWon = true;
    break;
  }
  if (round != totalRounds) {
    alert("Try again");
  }
}
if (!userWon) {
  alert("You lost. Game over!");
}
