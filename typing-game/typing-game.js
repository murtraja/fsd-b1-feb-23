const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const container = document.getElementById("container");
const quoteDisplayElement = document.getElementById("quoteDisplay");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");

let timeStarted = 0;
let secondsElapsed = 0;
let timerId = 0;
let userInput = "";
let correctStroke = 0;
let wrongStroke = 0;
let refQuote = "";

async function getQuote() {
  // returns a new quote from the API as string
  const apiResult = await fetch(RANDOM_QUOTE_API_URL);
  const jsonResult = await apiResult.json();
  return jsonResult.content;
}
async function createSpansFromQuote(quote) {
  quoteDisplayElement.innerHTML = "";
  for (let i = 0; i < quote.length; i++) {
    const span = document.createElement("span");
    span.innerHTML = quote[i];
    quoteDisplayElement.appendChild(span);
  }
}
async function initializeGame() {
  const quote = await getQuote();
  createSpansFromQuote(quote);
  refQuote = quote;
  secondsElapsed = 0;
  userInput = "";
  correctStroke = 0;
  wrongStroke = 0;
  stopTimer();
  // wpmElement.innerHTML = 0;
}
initializeGame();

function startTimer() {
  timerId = setInterval(onOneSecondPassed, 1000);
  timeStarted = new Date().getTime();
}

function stopTimer() {
  clearInterval(timerId);
  timerElement.innerHTML = 0;
  timeStarted = 0;
}

function stopGame() {
  stopTimer();
  document.body.removeEventListener("keydown", onKeyDown);
  for (let i = 0; i < refQuote.length; i++) {
    quoteDisplayElement.children[i].classList = [];
  }
  userInput = "";
}

function onOneSecondPassed() {
  secondsElapsed++;
  timerElement.innerHTML = secondsElapsed;
}

function onContainerClick(evt) {
  // console.log("clicked on container");
  startTimer();
  evt.stopPropagation();
  document.body.addEventListener("keydown", onKeyDown);
}

function onKeyDown(evt) {
  // console.log("key down pressed");
  const keycode = evt.keyCode;
  if (keycode == 32 || (keycode >= 48 && keycode <= 223)) {
    userInput += evt.key;
  } else if (keycode == 8) {
    userInput = userInput.substring(0, userInput.length - 1);
  }
  console.log(userInput);
  onStroke();
  if (userInput.length === refQuote.length) {
    console.log("user has typed quote completely");
    initializeGame();
    // startTimer();
  }
}

function onStroke() {
  correctStroke = 0;
  wrongStroke = 0;

  for (let i = 0; i < refQuote.length; i++) {
    if (i >= userInput.length) {
      quoteDisplayElement.children[i].classList = [];
    } else if (refQuote[i] === userInput[i]) {
      correctStroke++;
      quoteDisplayElement.children[i].classList.add("correct");
    } else {
      wrongStroke++;
      quoteDisplayElement.children[i].classList.add("incorrect");
    }
  }

  const minutesElapsed = (new Date().getTime() - timeStarted) / 60000;
  const correctWords = correctStroke / 5;
  const wpm = Math.round(correctWords / minutesElapsed);
  wpmElement.innerHTML = wpm;
}

container.addEventListener("click", onContainerClick);
document.body.addEventListener("click", stopGame);
