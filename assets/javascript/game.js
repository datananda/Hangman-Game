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
    currentWord: '',
    currentReveal: '',
    newGame: function() {
        this.wins = 0;
        this.guessesRemaining = numGuesses;
        this.lettersGuessed = [];
        this.currentWord = words[Math.floor(Math.random() * words.length)];
        this.currentReveal = '';
        for (let i = 0; i < this.currentWord.length; i++) {
            this.currentReveal += '_ ';
        }
        console.log("New Game. Starting with:")
        console.log(this);
    },
    checkLetter: function(char, keyCode) {
        if (keyCode >= 65 && keyCode <= 90) {
            char = char.toLowerCase();
            if (this.lettersGuessed.indexOf(char) === -1) {
                console.log(`${char} is a good guess because you haven't guessed it yet`);
                this.lettersGuessed.push(char);
            }
            else {
                console.log(`You already guessed ${char}`);
            }
        }
        else {
            console.log("Not a letter!");
        }
    }
}

hangmanGame.newGame();

document.onkeyup = function(event) {
    currentGuess = event.key;
    currentKeyCode = event.keyCode;
    console.log(event);
    console.log(`Current guess: ${currentGuess}; Current keyCode: ${currentKeyCode}`);
    hangmanGame.checkLetter(currentGuess, currentKeyCode);
}