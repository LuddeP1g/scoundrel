const maxHealth = 20;
let deckid = 0;
let cardsLeft = 0;
let health = 0;

let cards = []


function newGame() {
    loadGame();
    health = maxHealth;
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
}

async function loadGame() {
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    let data = await response.json();
    deckid = data.deck_id;
    cardsLeft = data.remaining;
    cards[0] = await fetch("https://deckofcardsapi.com/api/deck/" + deckid + "/draw/?count=1");

    drawCards();
}

function updateBoard() {
    for (let i = 1; i <= cards.length; i++)
    {
        getElementById("card" + i).src = cards[i-1].image;
    }
}
function checkRemaining() {
    alert("Cards remaining: " + cardsLeft);
}

async function drawCards() {
    // Draw three cards from the deck to fill the game board.
    let response = await fetch("https://deckofcardsapi.com/api/deck/" + deckid + "/draw/?count=3");
    let data = await response.json();
    cards[1] = data.cards[0];
    cards[2] = data.cards[1];
    cards[3] = data.cards[2];
    cardsLeft = data.remaining;
    updateBoard();
}

