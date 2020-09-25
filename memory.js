const cards = document.querySelectorAll('.square');
let flippedCard = false;
let firstCard, secondCard;
let freezeBoard = false;
randomize();
for(let card of cards){//for all card add event listener
    card.addEventListener('click', flipCard)
}

function flipCard(){
    if (freezeBoard) return;
    if (this === firstCard) return;
    //add a flip class
    this.classList.add('flip');
    //Have we flipped before? if not, it is first card of the pair flipped
    if(flippedCard === false){
        flippedCard = true;
        firstCard = this;
    //If we've already flipped, set it to false for future use, and assign 2nd card
    }else{
        flippedCard = false;
        secondCard = this;
        
        //now that we have first card and second card, check if match
        checkMatch();
    }
    
}

function checkMatch(){
    //if card matches, flip them both permanently
    if(firstCard.dataset.card === secondCard.dataset.card){
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    //if they didn't match, flip them back over after a set time
    }else{
        freezeBoard = true; //so we can't flip multiple sets of cards at once
        setTimeout(function(){
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        },1000)
    }
}

function resetBoard(){
    freezeBoard = false;
    firstCard = null;
    secondCard = null;
    flippedCard = false;
}

function randomize(){
    for(let card of cards){
        let randomOrder = Math.round(Math.random()*16);
        card.style.order = randomOrder;
    }
}