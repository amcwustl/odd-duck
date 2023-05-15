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
  imgTwo.title = productsArray[imageTwoIndex].name;
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

function handleShowResults(){
  if(votingRounds === 0){
    for(let i in productsArray){
      let productsListItem = document.createElement('li');

      productsListItem.textContent = `${productsArray[i].name} - Votes: ${productsArray[i].votes} & Views: ${productsArray[i].views}`;

      resultsList.appendChild(productsListItem);
    }
    resultBtn.removeEventListener('click', handleShowResults);
  }
}

// executable code

let products = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

let sweep = new Product('sweep','png');
productsArray.push(sweep);

let x;
for (let j in products){
  x = new Product(products[j]);
  productsArray.push(x);
}

renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);
