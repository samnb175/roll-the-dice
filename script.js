'use strict';

const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
const currentScore1El = document.querySelector('#current--0');
const currentScore2El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing

const init = function () {
    playing = true;
    diceEl.classList.add('hidden');
    score1El.textContent = 0;
    score2El.textContent = 0;
    currentScore1El.textContent = 0;
    currentScore2El.textContent = 0;
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
}

init();

const switchPlayer = function () {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


btnRollEl.addEventListener('click', function() {
    if (playing) {
        if (diceEl.classList.contains('hidden')) {
            diceEl.classList.remove('hidden');
        };
        let diceNum = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `dice-${diceNum}.png`;
        if (diceNum !== 1) {
            currentScore += diceNum;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

btnHoldEl.addEventListener('click', function() {
    if (playing) {
        score[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];

        if (score[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
            playing = false;

        } else {
            switchPlayer();
        }
    }
})

btnNewEl.addEventListener('click', init)
