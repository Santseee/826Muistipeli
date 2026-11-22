
import { createBoard } from './board.js';

function startNewGame() {

    let cardCount = parseInt(
        prompt("Syötä korttien määrä (parillinen luku):"),
        10
    );

    if (isNaN(cardCount) || cardCount < 2 || cardCount > 32 || cardCount % 2 !== 0) {
        alert("Syötä parillinen luku väliltä 2–32.");
        return;
    }

    createBoard(cardCount);
}

document.addEventListener('DOMContentLoaded', function() {

    startNewGame();


    const newGameButton = document.getElementById('new-game');

    newGameButton.addEventListener('click', function() {

        startNewGame();

    });

});
