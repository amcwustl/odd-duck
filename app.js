'use strict';

// global variables
let votingRounds = 25;
let productsArray = [];
let previousView = new Array(6);

// DOM Windows
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');
const ctx = document.getElementById('myChart');

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
  previousView.splice(0,3);

  while (previousView.includes(imageOneIndex)) {
    imageOneIndex = randomIndexGenerator();
  }
  previousView.push(imageOneIndex);

  while (previousView.includes(imageTwoIndex)) {
    imageTwoIndex = randomIndexGenerator();
  }
  previousView.push(imageTwoIndex);

  while (previousView.includes(imageThreeIndex)) {
    imageThreeIndex = randomIndexGenerator();
  }
  previousView.push(imageThreeIndex);

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
    resultBtn.classList.add('neon-blink');

    let stringifiedProducts = JSON.stringify(productsArray);
    localStorage.setItem('myProducts', stringifiedProducts);
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
    resultBtn.classList.remove('neon-blink');
    renderChart();
  }
}

function renderChart(){
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i in productsArray){
    productNames.push(productsArray[i].name[0].toUpperCase() + productsArray[i].name.slice(1));
    productVotes.push(productsArray[i].votes);
    productViews.push(productsArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        borderWidth: 3,
        borderColor: '#8b008b',
        backgroundColor: 'rgb(204, 153, 255)'
      },
      {
        label: '# of Votes',
        data: productVotes,
        borderWidth: 3,
        borderColor: 'rgb(204, 85, 0)',
        backgroundColor: 'rgb(255, 204, 153)'
      }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          enabled: true,
          mode: 'nearest',
          backgroundColor: 'rgb(0, 0, 139)',


        },
        title: {
          display: true,
          text: 'Odd Duck Product Voting Results'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          display: true,
          text: 'Votes'
        },
        x: {
          text: 'Product Name',
          display: true
        }
      }
    }
  };
  new Chart(ctx, chartObj);
}

// executable code

// Local Storage Continues Here

let retrievedProducts = localStorage.getItem('myProducts');
let parsedProducts = JSON.parse(retrievedProducts);

if(retrievedProducts) {
  productsArray = parsedProducts;

} else {
  let products = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

  let sweep = new Product('sweep','png');
  productsArray.push(sweep);

  let x;
  for (let j in products){
    x = new Product(products[j]);
    productsArray.push(x);
  }
}



renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);
