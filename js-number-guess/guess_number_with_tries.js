const secretNo = 7;

const guessNo = prompt(
  "Please guess a number between 1 and 10 (You have 3 tries)"
);

// if conditions
if (guessNo == secretNo) {
  console.log("condition is true");
  alert("You won");
} else {
  console.log("condition is false");
  alert("You lost");
}
