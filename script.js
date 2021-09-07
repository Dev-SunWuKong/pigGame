'use strict';

const score0El = document.querySelector('#score--0'); //both works the same for ID
const score1El = document.getElementById('score--1'); //
const diceEl = document.querySelector('.dice');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const scores = [0, 0];
let activeplayer = 0;
let currentScore = 0;
let playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const addRemove = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const newGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  activeplayer = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;

  diceEl.classList.add('hidden');
  if (!player0.classList.contains('player--active')) {
    addRemove();
  }
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate random number from 1 to 6
    let numRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(numRoll);

    //display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${numRoll}.png`;

    //check if the rolled dice number is 1
    if (numRoll !== 1) {
      currentScore += numRoll;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      ///////SWITCH PLAYERS//////
      currentScore = 0;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
      activeplayer = activeplayer === 0 ? 1 : 0;
      addRemove();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    currentScore = 0;
    document.getElementById(`current--${activeplayer}`).textContent =
      currentScore;

    if (scores[activeplayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else if (activeplayer === 0) {
      addRemove();
      activeplayer = 1;
    } else {
      addRemove();
      activeplayer = 0;
    }
  }
});

btnNew.addEventListener('click', function () {
  if (!playing) playing = true;
  newGame();
});
