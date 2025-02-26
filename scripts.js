const maxHealth = 20;
let deckid = 0;
let cardsLeft = 0;
let health = 0;

let cards = [];

let activeWeapon = {};
let activeEnemy = {};

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
    const cardElements = document.getElementsByClassName("cards");
    let weaponElement = document.getElementById("activeWeapon");
    let enemyElement = document.getElementById("attackedEnemy");
    console.log(cardElements.length)
    for (let i = 1; i <= cardElements.length; i++) {
        document.getElementById("card" + i).style.display = "none";
    }
    for (let i = 1; i <= cards.length; i++)
    {
        document.getElementById("card" + i).src = cards[i-1].image;
        document.getElementById("card" + i).style.display = "block";
    }
    weaponElement.style.display = "none";
    enemyElement.style.display = "none";
    if(activeWeapon != null) {
        weaponElement.style.display = "block";
        weaponElement.src = activeWeapon.image;
    }
    if(activeEnemy != null) {
        enemyElement.style.display = "block";
        enemyElement.src = activeEnemy.image;
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
            document.getElementById("weapon").checked = true;
            activeWeapon = cards[cardnr];
            cards.splice(cardnr,1);
            activeEnemy = {};
            break;

        case "SPADES":
            attacked(cards[cardnr]);
            cards.splice(cardnr,1);
            break;

        case "CLUBS":
            attacked(cards[cardnr]);
            cards.splice(cardnr,1);
            break;
    }
    document.getElementById("healthElement").innerHTML = "Current Health: " + health;
    if(cards.length === 1) {
        drawCards();
    }
    updateBoard();
}

function attacked(nummer) {
    if (!document.getElementById("weapon").checked || nummer.value > activeEnemy.value && activeWeapon != null) {
        health -= values[nummer.value];
    } 
    else {
        activeEnemy = nummer;
        if (values[activeEnemy.value] > activeWeapon.value) {
            health -= values[activeEnemy.value]-activeWeapon.value;
        }
    }
    if (health <= 0) {
        gameOver();
    }
}

function gameOver() {
    console.log("Game Over")
}