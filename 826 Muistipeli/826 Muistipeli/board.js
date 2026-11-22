import { createCardElement, flipCard } from './card.js';

const allCards = [
    '🍎', '🍐', '🍒', '🍉', '🍇', '🍓', '🍌', '🍍',
    '🥝', '🥥', '🍑', '🍈', '🍋', '🍊', '🍏', '🍅'
];

const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let score = 0;
let matchedPairs = 0;

let seconds = 0;
let timerInterval = null;
let gameStarted = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));

        let temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
}

function startTimer() {

    if (gameStarted) return;

    gameStarted = true;

    timerInterval = setInterval(() => {

        seconds++;

        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;

        timerDisplay.textContent =
            String(minutes).padStart(2, '0') + ':' +
            String(remainingSeconds).padStart(2, '0');

    }, 1000);
}


function stopTimer() {

    clearInterval(timerInterval);

}


function updateScore(points) {

    score += points;

    if (score < 0) {
        score = 0;
    }

    scoreDisplay.textContent = score;

}

export function createBoard(cardCount) {

    gameBoard.innerHTML = '';

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    score = 0;
    matchedPairs = 0;

    seconds = 0;
    gameStarted = false;

    stopTimer();

    scoreDisplay.textContent = score;
    timerDisplay.textContent = '00:00';

    const selectedCards = allCards.slice(0, cardCount / 2);

    const cards = [...selectedCards, ...selectedCards];

    shuffle(cards);

    cards.forEach(card => {

        const cardElement = createCardElement(card);

        cardElement.addEventListener('click', () => {

            if (lockBoard) return;

            if (cardElement === firstCard) return;

            if (cardElement.classList.contains('matched')) return;

            startTimer();

            flipCard(cardElement, handleCardFlip);

        });

        gameBoard.appendChild(cardElement);

    });

}

function handleCardFlip(cardElement) {

    if (!firstCard) {

        firstCard = cardElement;

        return;

    }

    secondCard = cardElement;

    lockBoard = true;

    checkForMatch();

}

function checkForMatch() {

    const isMatch =
        firstCard.dataset.card === secondCard.dataset.card;

    if (isMatch) {

        updateScore(5);

        disableCards();

    } else {

        updateScore(-1);

        unflipCards();

    }

}

function disableCards() {

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    matchedPairs++;


    if (matchedPairs === gameBoard.children.length / 2) {

        stopTimer();

        setTimeout(() => {
            alert('Voitit pelin.');
        }, 100);
2
    }

    resetBoard();

}

function unflipCards() {

    setTimeout(() => {

        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';

        resetBoard();

    }, 1500);

}

function resetBoard() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;

}
