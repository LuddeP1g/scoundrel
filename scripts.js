let deckid = 0;
let cardsLeft = 0;


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
}

function checkRemaining() {
    alert("Cards remaining: " + cardsLeft);
}

async function drawCards() {

}

