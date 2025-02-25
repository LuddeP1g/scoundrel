const maxHealth = 20;
let deckid = 0;
let cardsLeft = 0;
let health = 0;

let cards = [];

let values = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "JACK": 11, "QUEEN": 12, "KING": 13, "ACE": 14
};



function newGame() {
    loadGame();
    health = maxHealth;
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
}

async function loadGame() {
    document.getElementById("healthElement").innerHTML = "Current Health: " + maxHealth
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,10S,JS,QS,KS,AC,2C,3C,4C,5C,6C,7C,8C,9C,10C,JC,QC,KC,2H,3H,4H,5H,6H,7H,8H,9H,10H,2D,3D,4D,5D,6D,7D,8D,9D,10D");
    let data = await response.json();
    deckid = data.deck_id;
    cardsLeft = data.remaining;
    response = await fetch("https://deckofcardsapi.com/api/deck/" + deckid + "/draw/?count=1");
    let carddata = await response.json();
    cards[0] = carddata.cards[0];

    drawCards();
}

function updateBoard() {
    for (let i = 1; i <= cards.length; i++)
    {
        document.getElementById("card" + i).src = cards[i-1].image;
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


function selectCard(self) {
    let cardnr = 0;
    switch (self.id) {
        case "card1":
            cardnr = 0;
            break;

        case "card2":
            cardnr = 1;
            break;

        case "card3":
            cardnr = 2;
            break;

        case "card4":
            cardnr = 3;
            break;
    }
    switch (cards[cardnr].suit){
        case "HEARTS":
            health += values[cards[cardnr].value];
            if (health > 20) {
                health = 20;
            }
            cards.splice(cardnr,1)
            break;
        case "DIAMONDS":
            console.log("Diamond");
            break;
        case "SPADES":
            console.log("Spade");
            break;

        case "CLUBS":
            console.log("club");
            break;
    }
    document.getElementById("healthElement").innerHTML = "Current Health: " + health;
    updateBoard();
}