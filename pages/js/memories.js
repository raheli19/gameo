





  let cards =document.querySelectorAll('img');
  
  const gridContainer = document.querySelector(".grid-container");

let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let cardImages;
document.querySelector(".score").textContent = score;
//function to start playing
function startToPlay() {
  
        // Get the common parent div using its class
        const actionsDiv = document.querySelector('.actions');
      const buttonstart=document.getElementById("starting");
        // Get all buttons within the common parent div
        const allButtons = actionsDiv.querySelectorAll('button');
      buttonstart.style.display='none';
        // Change the display property of all buttons
        allButtons.forEach(button => {
          button.style.display = 'block'; // Hide all buttons
        
        });
        shuffleCards();
      }
    
    
   //function of the first level
 function firstLevel(){
    cardImages=[cards[0],cards[1]];
    restart();
 }
//function of the second level}
function secondLevel()
{
    cardImages=[cards[0],cards[1],cards[2],cards[3],cards[4]];
    restart();
}
function thirdLevel(){
    cardImages=cards;
    restart();
}
function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    generateCards();
  }
    function shuffleCards() {
        let currentIndex = cardImages.length,
          randomIndex,
          temporaryValue;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = cardImages[currentIndex];
          cardImages[currentIndex] = cardImages[randomIndex];
          cardImages[randomIndex] = temporaryValue;
        }
      }


function generateCards() {
    gridContainer.innerHTML="";
    for(let i=0;i<2;i++){
        let j=0;
    for (let card of cardImages) {
         
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.title=j.toString();
      cardElement.innerHTML = `
        <div class="front">
          <img class="front-image" src=${card.src} />
        </div>
        <div class="back"></div>
      `;
      gridContainer.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
      j++;
      
    }
     j=0;}
    
  }
   

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  
    this.classList.add("flipped");
  
    if (!firstCard) {
      firstCard = this;
      return;
    }
  
    secondCard = this;
   // score++;
   // document.querySelector(".score").textContent = score;
    lockBoard = true;
  
    checkForMatch();
  }

function checkForMatch() {
  let isMatch = firstCard.title === secondCard.title;
  
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  score++;
  document.querySelector(".score").textContent = score;
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}
