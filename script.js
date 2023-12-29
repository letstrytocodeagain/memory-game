const gameContainer = document.getElementById("game");
const displayCount = document.querySelector(".numberOfMatches");
const displayTries = document.querySelector(".numberOfTries");
const displayLowestScore = document.querySelector("#bestScore");
const divCards = document.getElementById("game");
const startGameBTN = document.querySelector("#startGameBTN");
const restartGameBTN = document.querySelector("#restartGameBTN");
const defaultColor = "white";
let count = 0;
let tries = 0;
let numberOfMatches = 0;
let lowestScore = +localStorage.getItem('lowestScore');
let isCardSelected = false;
let cardOne;
let cardTwo;


//check if there's a lower Score
if(lowestScore > 0){
displayLowestScore.innerText= lowestScore;
}
else{
  localStorage.setItem("lowestScore", 1000); //when localStorage is empty, set high number as the lowestScore.
}


togglePointerEvents(); //deactivate divs

//when the start game button is clicked
startGameBTN.onclick = function(){
  togglePointerEvents();//activate div when start game BTN is pressed
  startGameBTN.classList.add("hidden");
}


restartGameBTN.onclick = function(){
  divCards.innerHTML = "";
  numberOfMatches = 0; //set 0 matches;
  displayCount.innerText = numberOfMatches;
  tries = 0; //set 0 tries
  displayTries.innerText = tries;
  restartGameBTN.classList.add("hidden");
  shuffle(COLORS);
  createDivsForColors(shuffledColors);
}



const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let cardSelected = event.target;
  let color = event.target.classList.value;
  
  console.log("you just clicked", cardSelected);
  console.log("selected:", cardSelected.dataset.selected);

  if(count >= 0 && count < 2){
    count++;
    cardSelected.style.backgroundColor = color;
    if(!cardOne){
      cardOne = cardSelected;
      cardOne.removeEventListener("click", handleCardClick);
    }else{
      cardTwo = cardSelected;
      tries++;
      displayTries.innerText = tries;
      isMatch(cardOne, cardTwo);
    }

  }


  console.log("card 1 is:", cardOne);
  console.log("card 2 is:", cardTwo);
}


function isMatch(c1, c2){
  if(c1.classList.value === c2.classList.value){
    console.log("it's a match");
    numberOfMatches++;

    //GAME IS OVER
    if(numberOfMatches == COLORS.length/2){
      restartGameBTN.classList.remove("hidden"); //show restart button is the game is over
      
      var newInt = +localStorage.getItem('lowestScore'); //trick found in: https://stackoverflow.com/questions/40005108/extracting-numbers-from-localstorage-as-numbers
      if (tries < newInt){

        localStorage.setItem("lowestScore", tries); //store new lowest Score
        displayLowestScore.innerText = tries; //display new lowest Score


      }

      
      
    }
    displayCount.innerText = numberOfMatches;
    c1.removeEventListener("click", handleCardClick);
    c2.removeEventListener("click", handleCardClick);
  }else{
    console.log("It's not a match");
    togglePointerEvents();
  setTimeout(function(){
    c1.addEventListener("click", handleCardClick);
    c1.style.backgroundColor = defaultColor;
    c2.style.backgroundColor = defaultColor;
    togglePointerEvents();
  },1000)
 
  }
  cardOne = undefined;
  cardTwo = undefined;
  count = 0;
  }

  //function to deactivate clicks on divs
  function togglePointerEvents() {
    divCards.style.pointerEvents = divCards.style.pointerEvents === "none" ? "auto" : "none";
  }
  

// when the DOM loads
createDivsForColors(shuffledColors);
