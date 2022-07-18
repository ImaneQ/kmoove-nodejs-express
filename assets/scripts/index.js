'use strict';
console.log("hello world");

// ACCUEIL NTN


const pinkGrid = document.querySelector('.pinkGrid');
const pinkGridRight = document.querySelector('.pinkGrid--Right');
const pinkGridLeft = document.querySelector('.pinkGrid--Left');
const body = document.querySelector('body');
const screenMobile = window.innerWidth < 550;


let rightLines = 10;

for (let i = 0; i < rightLines; i++) {
  const rightLine = document.createElement('div');
  rightLine.classList.add(`lineRight`, `lineRight-${i + 1}`);
  pinkGridRight.appendChild(rightLine);
}

for (let i = rightLines; i > 0; i--) {
  const leftLine = document.createElement('div');
  leftLine.classList.add(`lineLeft`, `lineLeft-${i}`);
  pinkGridLeft.appendChild(leftLine);
}

const horyzontalLines = !screenMobile ? 12 : 20;

for (let i = horyzontalLines; i > 0; i--) {
  const hLine = document.createElement('div');
  hLine.classList.add(`hLine`, `hLine-${i}`);
  pinkGrid.appendChild(hLine);
  if (i > 9) {
    hLine.style.background = '#f0086a';
  } else if (i > 6) {
    hLine.style.background =
      'linear-gradient(90deg, rgba(25,25,112,1) -10%, rgba(240,8,106,1) 50%, rgba(25,25,112,1) 110%)';
  } else {
    hLine.style.background =
      'linear-gradient(90deg, rgba(25,25,112,0.1) 0%, rgba(240,8,106,1) 50%, rgba(25,25,112,0.1) 100%)';
  }
}

// ----------------------- Hamburger click ------------------------------------

const hamburgerItems = document.querySelectorAll('.hamburger');
const hamburgerContainer = document.querySelector('.hamburger-container');
const homeAnim = document.querySelector('.home-anim');
const navBar = document.querySelector('.navBar');
const overlay = document.querySelector('.overlay');

hamburgerContainer.addEventListener('click', () => {
  hamburgerContainer.classList.toggle('cross');
  homeAnim.classList.toggle('showNavBar');
  navBar.classList.toggle('showNav');
  overlay.classList.toggle('showNav');
});

overlay.addEventListener('click', () => {
  hamburgerContainer.classList.remove('cross');
  homeAnim.classList.remove('showNavBar');
  navBar.classList.remove('showNav');
  overlay.classList.remove('showNav');
});
