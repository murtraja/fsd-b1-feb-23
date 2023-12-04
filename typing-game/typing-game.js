const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const container = document.getElementById("container");
const quoteDisplayElement = document.getElementById("quoteDisplay");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");

async function getQuote() {
  // returns a new quote from the API as string
  const apiResult = await fetch(RANDOM_QUOTE_API_URL);
  const jsonResult = await apiResult.json();
  return jsonResult.content;
}
async function createSpansFromQuote(quote) {
  for (let i = 0; i < quote.length; i++) {
    const span = document.createElement("span");
    span.innerHTML = quote[i];
    quoteDisplayElement.appendChild(span);
  }
}
async function initializeGame() {
  const quote = await getQuote();
  createSpansFromQuote(quote);
}
initializeGame();
