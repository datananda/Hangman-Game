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


/* words
["pour over","portland","umami","chia","gluten free","Brooklyn","cornhole","tofu","tote bag","banjo","bolo tie","street art","bespoke","asymmetrical","leggings","distillery","freegan","messenger bag","semiotics","forage","tattooed","fanny pack","keffiyeh","seitan","bicycle rights","pork belly","bitters","stumptown","sartorial","kitsch","wayfarers","YOLO","mixtape","American Apparel","sriracha","pickled","heirloom","Blue Bottle","butcher","pop up","cardigan","polaroid","retro","actually","normcore","ethical","pbr","whatever","quinoa","slow carb","beard","small batch","fixie","brunch","photo booth","mustache","flannel","occupy","kale chips","selvage","Cosby sweater","next level","chambray","single origin","farm to table","organic","flexitarian","dreamcatcher","gentrify","chillwave","vegan","food truck","locavore","tousled","hella","artisan","put a bird on it","VHS","twee","gastropub","vinyl","Pinterest","ugh","selfies","Etsy","Helvetica","paleo","Kickstarter","Pitchfork","typewriter","fingerstache","keytar","meggings","readymade","synth","DIY","art party","iPhone","Tumblr","trust fund","letterpress","hoodie","banh mi","sustainable","biodiesel","hashtag","pug","jean shorts","High Life","scenester","roof party","plaid","skateboard","disrupt","ennui","literally","raw denim","authentic","narwhal","Banksy","shabby chic","blog","swag","Wes Anderson","bespoke"]
*/

const numGuesses = 10;
let words = ["pourover"];
let currentGuess = '';
let iconElement = document.createElement("img");
iconElement.setAttribute("src","assets/images/mustache.png")
iconElement.setAttribute("class","mustache-icon");

let hangmanGame = {
    wins: 0,
    guessesRemaining: numGuesses,
    lettersGuessed: [],
    currentWord: [],
    currentReveal: [],
    startNewGame: function() {
        this.guessesRemaining = numGuesses;
        this.lettersGuessed = [];
        this.currentWord = words[Math.floor(Math.random() * words.length)].split(''); //TODO: ADD FUNCTIONALITY TO REMOVE SELECTED WORD FROM ARRAY OF WORD OPTIONS
        this.currentReveal.length = this.currentWord.length; //TODO: ADD FUNCTIONALITY FOR WORDS WITH SPACES
        this.currentReveal.fill('_');
        this.printUpdate();
        document.getElementById("hipsterman").setAttribute("src","assets/images/hangman0.png");
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
            //TODO: ADD SIGNAL IF LETTER ALREADY GUESSED
            console.log(`You already guessed ${char}`);
        }
    },
    checkInWord: function(char) {
        if (this.currentWord.includes(char)) {
            this.revealLetters(char);
        }
        else {
            this.lettersGuessed.push(char);
            this.printUpdate();
            this.checkForLoss();
        }
    },
    revealLetters: function(char) {
        for (let i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord[i] === char) {
                this.currentReveal[i] = char;
                this.printUpdate();
            }
        }
        this.checkForWin();
    },
    checkForLoss: function() {
        if (this.guessesRemaining > 1) {
            this.guessesRemaining--;
            this.printUpdate();
        }
        else {
            //TODO: ADD PAUSE & LOSS SIGNAL BEFORE STARTING NEW GAME
            this.startNewGame();
        }
    },
    checkForWin: function() {
        if (this.currentReveal.indexOf('_') === -1) {
            this.wins++;
            //TODO: ADD PAUSE & WIN SIGNAL BEFORE STARTING NEW GAME
            this.startNewGame();
            document.getElementById("wins-icons").appendChild(iconElement.cloneNode());
        }
    },
    printUpdate: function() {
        document.getElementById("letters-guessed").innerHTML = this.lettersGuessed.join(' ').toUpperCase();
        document.getElementById("current-reveal").innerHTML = this.currentReveal.join('');
        document.getElementById("guesses-number").innerHTML = this.guessesRemaining.toString();
        let percentRemaining = 100 * this.guessesRemaining / numGuesses;
        document.getElementById("guesses-bar").style.width = percentRemaining.toString() + "%";
        document.getElementById("wins-number").innerHTML = `${this.wins.toString()}`;
        document.getElementById("hipsterman").setAttribute("src","assets/images/hangman" + (numGuesses - this.guessesRemaining) + ".png");
    }
}

hangmanGame.startNewGame();

document.onkeyup = function(event) {
    currentGuess = event.key;
    currentKeyCode = event.keyCode;
    hangmanGame.checkIsLetter(currentGuess, currentKeyCode);
}