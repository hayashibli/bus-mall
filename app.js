'use strict';

var Allproducts = [];
var clicks = 0;
var LeftSideImage;
var CenteredImage;
var RightSideImage;

var leftImage;
var centeredImage;
var rightImage;
var lastshowimages = [-1, -1, -1];
var click = [];
var names = [];

// Create a function constructor;

function Products(productName, productlink) {
  this.productName = productName;
  this.productlink = productlink;
  this.numberofclicks = 0;
  this.displayedtimes = 0;
  Allproducts.push(this);
}

// Create objects

new Products('bag', 'images/bag.jpg');
new Products('banana', 'images/banana.jpg');
new Products('bathroom', 'images/bathroom.jpg');
new Products('boots', 'images/boots.jpg');
new Products('breakfast', 'images/breakfast.jpg');
new Products('bubblegum', 'images/bubblegum.jpg');
new Products('chair', 'images/chair.jpg');
new Products('cthulhu', 'images/cthulhu.jpg');
new Products('dog-duck', 'images/dog-duck.jpg');
new Products('dragon', 'images/dragon.jpg');
new Products('pen', 'images/pen.jpg');
new Products('pet-sweep', 'images/pet-sweep.jpg');
new Products('scissors', 'images/scissors.jpg');
new Products('shark', 'images/shark.jpg');
new Products('sweep', 'images/sweep.png');
new Products('tauntaun', 'images/tauntaun.jpg');
new Products('unicorn', 'images/unicorn.jpg');
new Products('usb', 'images/usb.gif');
new Products('water-can', 'images/water-can.jpg');
new Products('wine-glass', 'images/wine-glass.jpg');

console.log('hi' + Allproducts.productName);
// Create function for random displaying of images;

function randomProductsImages() {
  // leftImage = Math.floor((Math.random() * Allproducts.length));
  // console.log(leftImage);

  // centeredImage = Math.floor((Math.random() * Allproducts.length));
  // console.log(centeredImage);

  // rightImage = Math.floor((Math.random() * Allproducts.length));
  // console.log(rightImage);
  // do{
  //   rightImage = Math.floor((Math.random() * Allproducts.length));
  // } while(leftImage === rightImage);


  // do{
  //   centeredImage = Math.floor((Math.random() * Allproducts.length));
  // } while(rightImage === centeredImage || centeredImage === leftImage);


  // Making the images that appear in the first time different from images in the second time
  // Track users' clicks
  // click = image thats is clicked
  // prevent showing the clicked image // make last show array in the function constructor and push the displayed images to it then prevent showing them again
  // show an alteranate image for the clicked one

  // lastshowimages.push(leftImage, centeredImage, rightImage);
  // console.log(lastshowimages);


  //     if(leftImage === lastshowimages.length){
  //     leftImage = Math.floor((Math.random() * Allproducts.length));
  //   }
  //   else if (rightImage === lastshowimages.length){
  //     rightImage = Math.floor((Math.random() * Allproducts.length));
  //   }
  //   else if (centeredImage === lastshowimages.lenght){
  //     centeredImage = Math.floor((Math.random() * Allproducts.length));
  //   }

  do {
    leftImage = Math.floor((Math.random() * Allproducts.length));
  }
  while (
    leftImage === lastshowimages[0] || leftImage === lastshowimages[1] || leftImage === lastshowimages[2]);
  do {
    centeredImage = Math.floor((Math.random() * Allproducts.length));
  }
  while (centeredImage === leftImage || centeredImage === lastshowimages[0] || centeredImage === lastshowimages[1] || centeredImage === lastshowimages[2]);


  do {
    rightImage = Math.floor((Math.random() * Allproducts.length));
  }
  while (rightImage === leftImage || rightImage === centeredImage || rightImage === lastshowimages[0] || rightImage === lastshowimages[1] || rightImage === lastshowimages[2]);

  lastshowimages = [];
  lastshowimages.push(leftImage);
  lastshowimages.push(centeredImage);
  lastshowimages.push(rightImage);
  displayProductsImages(leftImage, centeredImage, rightImage);
}
randomProductsImages();

// Create function to display images

function displayProductsImages(left, centered, right) {
  LeftSideImage = Allproducts[left];
  console.log(LeftSideImage);
  LeftSideImage.displayedtimes++;
  CenteredImage = Allproducts[centered];
  console.log(CenteredImage);
  CenteredImage.displayedtimes++;
  RightSideImage = Allproducts[right];
  console.log(RightSideImage);
  RightSideImage.displayedtimes++;

  var leftProduct = document.getElementById('leftProduct');
  var centeredProduct = document.getElementById('centeredProduct');
  var rightProduct = document.getElementById('rightProduct');


  leftProduct.setAttribute('src', LeftSideImage.productlink);
  centeredProduct.setAttribute('src', CenteredImage.productlink);
  rightProduct.setAttribute('src', RightSideImage.productlink);

}

var section = document.getElementById('productsImages');
section.addEventListener('click', clicksCounter);

function clicksCounter(event) {
  var clickonproduct;
  if (event.target.id === 'leftProduct') {
    clickonproduct = LeftSideImage;
  }
  else if (event.target.id === 'centeredProduct') {
    clickonproduct = CenteredImage;
  }
  else if (event.target.id === 'rightProduct') {
    clickonproduct = RightSideImage;
  }

  if (clickonproduct) {
    clickonproduct.numberofclicks++;
    randomProductsImages();
    clicks++;

  }
  if (clicks >= 25) {
    section.removeEventListener('click', clicksCounter);
    showResults();
  }
}
// console.log('hi');
function showResults() {
  var resultslist = document.getElementById('Results');
  for (var i = 0; i < Allproducts.length; i++) {
    var results = document.createElement('li');
    resultslist.appendChild(results);
    results.textContent = 'Times of display for ' + Allproducts[i].productName + ' is ' + Allproducts[i].displayedtimes + ' and the number of clicks is ' + Allproducts[i].numberofclicks;
    console.log(results.textContent);
  }
}

var ctx = document.getElementById('myChart');

for (var i = 0; i < Allproducts.length; i++) {
  click[i] = Allproducts[i].numberofclicks;
  names[i] = Allproducts[i].productName;
  // displays[i] = Allproducts[i].displayedtimes;
}

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: names,
    datasets: [{
      label: 'Number of votes',
      data: click,
      backgroundColor: [
        'rgb(128, 128, 0)'
      ],
      borderColor: [
        'rgb(255, 255, 0)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

