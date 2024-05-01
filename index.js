const wordDisplayElement = document.querySelector(".word-display");
const guessesTextElement = document.querySelector(".guesses-text b");
const keyboardDivElement = document.querySelector(".keyboard");
const hangmanImageElement = document.querySelector(".hangman img");
const modalElement = document.querySelector(".modal");
const playAgainButton = modalElement.querySelector("button");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImageElement.src = "hangman/hangman1.png"; 
    guessesTextElement.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplayElement.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDivElement.querySelectorAll("button").forEach(btn => btn.disabled = false);
    modalElement.classList.remove("show");
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    modalElement.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    modalElement.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    modalElement.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplayElement.querySelectorAll("li")[index].innerText = letter;
                wordDisplayElement.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImageElement.src = `hangman/hangman${wrongGuessCount + 1}.png`; 
    }
    button.disabled = true;
    guessesTextElement.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    const char = String.fromCharCode(i);
    button.innerText = char;
    keyboardDivElement.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, char));
}

getRandomWord();
playAgainButton.addEventListener("click", getRandomWord);
