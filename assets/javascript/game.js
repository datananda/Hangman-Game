const numGuesses = 10;
let words = ["portland","umami","chia","brooklyn","cornhole","tofu","tote","banjo","bolo","bespoke","asymmetrical","leggings","distillery","freegan","semiotics","forage","tattooed","keffiyeh","seitan","bicycle","bitters","stumptown","sartorial","kitsch","wayfarers","yolo","mixtape","sriracha","pickled","heirloom","butcher","cardigan","polaroid","retro","actually","normcore","ethical","pbr","whatever","quinoa","beard","fixie","brunch","mustache","flannel","occupy","kale","selvage","chambray","organic","flexitarian","dreamcatcher","gentrify","chillwave","vegan","locavore","tousled","hella","artisan","twee","gastropub","vinyl","pinterest","ugh","selfies","etsy","helvetica","paleo","kickstarter","pitchfork","typewriter","fingerstache","keytar","meggings","readymade","synth","diy","iphone","tumblr","letterpress","hoodie","sustainable","biodiesel","hashtag","pug","scenester","plaid","skateboard","disrupt","ennui","literally","authentic","narwhal","banksy","blog","swag","bespoke"];
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
        let randNumber = Math.floor(Math.random() * words.length);
        this.currentWord = words[randNumber].split('');
        words.splice(randNumber, 1);
        this.currentReveal.length = this.currentWord.length; //TODO: ADD FUNCTIONALITY FOR WORDS WITH SPACES
        this.currentReveal.fill('_');
        this.printUpdate();
        document.getElementById("hipsterman").setAttribute("src","assets/images/hangman0.png");
    },
    checkIsLetter: function(char, keyCode) {
        if (keyCode >= 65 && keyCode <= 90) {
            this.checkIsNewGuess(char);
        }
        else {
            //TODO: ADD SIGNAL IF NON LETTER PRESSED
        }
    },
    checkIsNewGuess: function(char) {
        char = char.toLowerCase();
        if (this.lettersGuessed.indexOf(char) === -1) {
            this.checkInWord(char);
        }
        else {
            //TODO: ADD SIGNAL IF LETTER ALREADY GUESSED
        }
    },
    checkInWord: function(char) {
        if (this.currentWord.includes(char)) {
            this.revealLetters(char);
        }
        else {
            this.lettersGuessed.push(char);
            this.guessesRemaining--;
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
        if (this.guessesRemaining === 0) {
            let timeout = setTimeout(myFunc,1000);

            function myFunc() {
                hangmanGame.startNewGame();
            }
        }
    },
    checkForWin: function() {
        if (this.currentReveal.indexOf('_') === -1) {
            this.wins++;
            this.printUpdate();
            document.getElementById("wins-icons").appendChild(iconElement.cloneNode());
            let timeout = setTimeout(myFunc,1000);

            function myFunc() {
                hangmanGame.startNewGame();
            }
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