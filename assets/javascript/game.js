/*
game object properties
    - wins: starts at 0 and increments
    - number of guesses remaining: starts at 12 and decrements to 0
    - letters already guessed: array of letters
    - words: array of words
    - current word: single string

game object methods
    - reset game: set wins to 0, set guessesRemaining to numGuesses, pick a word from list of words
    - check if a letter is used
    - check letter: takes key event, checks if it is a letter, & if so, that it hasn't been guessed already
    - check letter: takes a key event as an argument and checks if that event is a letter, if letter that letter is in the currentWord
            - if the letter is in currentWord, show the letters in currentReveal and check if game is won
            - if the letter is not in currentWord, decrement guesses and add the letter to lettersGuessed
    - check game: if currentReveal is all letters, increment wins, show a new word, reset variables 
*/
const numGuesses = 12;
let words = ["word","text","string","character"];
let currentGuess = '';

let hangmanGame = {
    wins: 0,
    guessesRemaining: numGuesses,
    lettersGuessed: [],
    currentWord: [],
    currentReveal: [],
    startNewGame: function() {
        this.wins = 0;
        this.guessesRemaining = numGuesses;
        this.lettersGuessed = [];
        this.currentWord = words[Math.floor(Math.random() * words.length)].split('');
        this.currentReveal.length = this.currentWord.length;
        this.currentReveal.fill('_ ');
        console.log("New Game. Starting with:")
        console.log(this);
    },
    checkIsLetter: function(char, keyCode) {
        if (keyCode >= 65 && keyCode <= 90) {
            this.checkIsNewGuess(char);
        }
        else {
            console.log("Not a letter!");
        }
    },
    checkIsNewGuess: function(char) {
        char = char.toLowerCase();
        if (this.lettersGuessed.indexOf(char) === -1) {
            this.checkInWord(char);
        }
        else {
            console.log(`You already guessed ${char}`);
        }
    },
    checkInWord: function(char) {
        if (this.currentWord.includes(char)) {
            this.revealLetters(char);
        }
        else {
            this.lettersGuessed.push(char);
            this.checkForLoss();
        }
    },
    revealLetters: function(char) {
        for (let i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord[i] === char) {
                this.currentReveal[i] = char + ' ';
            }
        }
        this.checkForWin();
    },
    checkForLoss: function() {
        if (this.guessesRemaining >= 1) {
            this.guessesRemaining--;
        }
        else {
            this.startNewGame();
        }
    },
    checkForWin: function() {
        if (this.currentReveal.indexOf('_ ') === -1) {
            this.startNewGame();
        }
    }
}

hangmanGame.startNewGame();

document.onkeyup = function(event) {
    currentGuess = event.key;
    currentKeyCode = event.keyCode;
    hangmanGame.checkIsLetter(currentGuess, currentKeyCode);
}