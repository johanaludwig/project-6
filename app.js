let missed = 0;
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const ul = phrase.firstElementChild;
const buttons = document.getElementsByTagName('button');
const title = document.querySelector('.title');
const startGame = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const scoreboard = document.getElementById('scoreboard');
const stars = scoreboard.querySelectorAll('i');
const shown = document.getElementsByClassName('show');
const letters = document.getElementsByClassName('letter');

let phrases = [
    'A Piece of Cake',
    'An Arm and a Leg',
    'Dreams of empire',
    'When pigs fly',
    'Break a leg',
    'Keep going',
    'To cut corners',
    'Speak of the devil'
];


/* 
Randomly choose a phrase from the phrases array, 
split phrase into new array of characters, 
return the new character array.
*/
getRandomPhrase = (array) => {
    let randomPhrase = array[Math.floor(Math.random() * array.length)];
    return randomPhrase.split('');
};

const phraseArray = getRandomPhrase(phrases);


/* Add Phrase to the Display.
Loops through an array of characters,
create a list item, put the character inside of the list item, 
and append it to the html
*/
addPhraseToDisplay = (array) => {

    for (let i = 0; i < array.length ; i ++ ) {
        let li = document.createElement('li');
        li.textContent = array[i];

        if (li.textContent === " ") {

            li.className = 'space';
            ul.appendChild(li);

        } else {

            li.className = 'letter';
            ul.appendChild(li);
        }
    }
}

addPhraseToDisplay(phraseArray);

/* Button checked 
Loop over the letters and check if they match the letter in the button the player has chosen
If there’s a match, the function add the “show” class to the list item containing that letter
*/
checkLetter = (button) => {
    let letterCheck = null;

    for (let i = 0; i < letters.length; i++) {

        if (letters[i].textContent.toLowerCase() === button) {
            letters[i].classList.add('show');
            letterCheck = true;
        }
    }

    return letterCheck;
}

/* Check whether the game has been won or lost */
checkWin = () => {

    if (letters.length === shown.length) {

        overlay.className = "win";
        overlay.style.display = "flex";
        title.textContent = "Congratulations! Well played!";
        startGame.textContent = "Play Again";

    } else if (missed === 5) {

        overlay.className = 'lose';
        overlay.style.display = "flex";
        title.textContent = "Sorry, you lost the game!";
        startGame.textContent = "Try Again";
    }
}

/* 
Event delegation to listen only to button events from the keyboard.
and remove one of the tries from the scoreboard.
*/
qwerty.addEventListener('click', (event) => {
    let guess = event.target.textContent;

    if (event.target.type === 'submit') {
        event.target.classList.add('chosen');
        event.target.disabled = 'true';

        const match = checkLetter(guess);

        if (match != true) {
            missed ++; 
            stars[stars.length - missed].className = 'far fa-star';
       }

        checkWin();
    }
})

// Start/reset the game again
startGame.addEventListener('click', () => {
    overlay.className = "start";
    missed = 0;
    ul.textContent = '';

    for (let i = 0; i < buttons.length; i ++) {
        buttons[i].removeAttribute('class');
        buttons[i].removeAttribute('disabled');
    } 

    for ( let i = 0; i < stars.length; i ++) {
        stars[i].className = 'fas fa-star';
    }
   
    addPhraseToDisplay(phraseArray);
    overlay.style.display = "none";  
}); 