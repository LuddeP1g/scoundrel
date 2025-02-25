let deckid = 0;
let cardsLeft = 0;

let cards = []


function newGame() {
    loadGame();
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
}

async function loadGame() {
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    let data = await response.json();
    deckid = data.deck_id;
    cardsLeft = data.remaining;
    cards[0] = await fetch("https://deckofcardsapi.com/api/deck/" + deckid + "/draw/?count=1");
}

function checkRemaining() {
    alert("Cards remaining: " + cardsLeft);
}

async function drawCards() {
    // Draw four cards from the deck to fill the game board.
}

