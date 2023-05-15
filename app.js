'use strict';

// global variables
let votingRounds = 25;
let productsArray = [];

// DOM Windows
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

// ** FUNCTIONS **

// Constructor Function
function Product(name, imageExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}

// Helper Functions
function randomIndexGenerator(){
  return Math.floor(Math.random() * productsArray.length);
}

function renderImgs(){
  let imageOneIndex = randomIndexGenerator();
  let imageTwoIndex = randomIndexGenerator();
  let imageThreeIndex = randomIndexGenerator();

  while (imageTwoIndex === imageOneIndex){
    imageTwoIndex = randomIndexGenerator();
  }
  while (imageThreeIndex === imageOneIndex || imageThreeIndex === imageTwoIndex){
    imageThreeIndex = randomIndexGenerator();
  }

  imgOne.src = productsArray[imageOneIndex].image;
  imgOne.title = productsArray[imageOneIndex].name;
  imgTwo.src = productsArray[imageTwoIndex].image;
  imgTwo.title = prodcutsArray[imageTwoIndex].name;
  imgThree.src = productsArray[imageThreeIndex].image;
  imgThree.title = productsArray[imageThreeIndex].name;

productsArray[imageOneIndex].views ++;
productsArray[imageTwoIndex].views ++;
productsArray[imageThreeIndex].views ++;
}

function handleImgClick(event){
  let imageClicked = event.target.title;

  for (let i in productsArray){
    if(imageClicked === productsArray[i].name){
      productsArray[i].votes ++;
      votingRounds --;
      renderImgs();
    }
  }

  if (votingRounds === 0){
    imgContainer.removeEventListener('click', handleImgClick);
  }
}

// executable code

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);