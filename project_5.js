let randomnumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#submit');
const userinput = document.querySelector('#input');
const guessslot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastresult');
const lowerhi = document.querySelector('.lowerhi');
const startover = document.querySelector('body');  // Updated to append button to body

let playgame = true;
let prevguesses = [];
let numguesses = 1;

if (playgame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userinput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        displayMessage("Please enter a valid number.");
    } else if (guess > 100) {
        displayMessage("Please enter a number below 100.");
    } else if (guess < 1) {
        displayMessage("Please enter a number above 1.");
    } else {
        prevguesses.push(guess);
        if (numguesses === 10) {
            displayGuess(guess);
            displayMessage(`Game over! The number was ${randomnumber}.`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomnumber) {
        displayMessage(`Congratulations! You guessed the correct number: ${randomnumber}.`);
        endGame();
    } else if (guess > randomnumber) {
        displayMessage("The number is lower.");
    } else {
        displayMessage("The number is higher.");
    }
}

function displayMessage(message) {
    lowerhi.innerHTML = `<h2>${message}</h2>`;
    userinput.value = "";
}

function displayGuess(guess) {
    guessslot.innerHTML += ` ${guess} , `;
    numguesses++;
    remaining.innerHTML = `${11 - numguesses}`;
}

function newGame() {
    const newgame = document.querySelector('#newgame');
    newgame.addEventListener('click', function (e) {
        playgame = true;
        randomnumber = parseInt(Math.random() * 100 + 1);
        prevguesses = [];
        numguesses = 1;
        userinput.removeAttribute('disabled');
        guessslot.innerHTML = "";
        remaining.innerHTML = `${11}`;
        lowerhi.innerHTML = "";
        newgame.remove();
    });
}
function endGame() {
    userinput.setAttribute('disabled', '');
    const newGameButton = document.createElement('button');
    newGameButton.setAttribute('id', 'newgame');
    newGameButton.textContent = 'Start New Game';
    startover.appendChild(newGameButton);
    newGame();
    playgame = false;
}
