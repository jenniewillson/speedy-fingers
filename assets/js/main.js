/**
 * Function executes once DOM is loaded:
 * 
 * Checks if high scores data in local storage exists
 * Loads in any existing data to high scores elements
 * Try-catch to ensure contact and 404 pages do not attempt to load this as not needed
 */

$(function () {
    try {
        if (localStorage.getItem('4-letter-local') !== null && localStorage.getItem('4-letter-local') !== undefined) {
            document.getElementById('4-letter').innerHTML = localStorage.getItem('4-letter-local');
        }
        if (localStorage.getItem('5-letter-local') !== null && localStorage.getItem('5-letter-local') !== undefined) {
            document.getElementById('5-letter').innerHTML = localStorage.getItem('5-letter-local');
        }
        if (localStorage.getItem('6-letter-local') !== null && localStorage.getItem('6-letter-local') !== undefined) {
            document.getElementById('6-letter').innerHTML = localStorage.getItem('6-letter-local');
        }
        if (localStorage.getItem('7-letter-local') !== null && localStorage.getItem('7-letter-local') !== undefined) {
            document.getElementById('7-letter').innerHTML = localStorage.getItem('7-letter-local');
        }
        if (localStorage.getItem('random-letter-local') !== null && localStorage.getItem('random-letter-local') !== undefined) {
            document.getElementById('random-letter').innerHTML = localStorage.getItem('random-letter-local');
        }
    } catch (e) {
        //do nothing, as this js file is shared with 404 and contact pages, which do not need local storage pre-loaded
    }
});

/**
 * Listener to trigger the gameOnOff function:
 * 
 * Triggers when user clicks on any of the buttons with class 'letter-choice'
 */
$('.letter-choice').click(gameOnOff);

/**
 * Function gameOnOff:
 * 
 * Hide and show elements dependent upon whether game is on or off
 * Hides Tagline, basic instructions, letter choice, high scores and detailed instructions buttons off when game starts
 * Reveals Timer, Words, Input, Zoo, current score
 * 
 * Reverses when game ends
 * 
 * Called by various other functions
 */

function gameOnOff() {
    $('#basic-instructions').toggle();
    $('#timer-box').toggle();
    $('#words').toggle();
    $('#input').toggle();
    $('#zoo').toggle();
    $('#userInput').val('');
    $('#score-box').toggle();
    $('.letter-choice').toggle();
    $('#high-score-d-instruct').toggle();
    $('.tagline').toggle();
}

/**
 * Function getData:
 * 
 * connects to api to retrieve a set of words for each game
 * returns error if API is down
 * retrieves 200 words at a time so it does not need to be called for each word
 * 
 * @param noLetters - number of letters in words, identified by the user choice of letter button
 * uses callback once API is complete to return JSON response
 */

const baseURL = 'https://random-word-api.vercel.app/api?words=200';

function getData(noLetters, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                //Successfully called API
                cb(JSON.parse(this.responseText));
            } else {
                document.getElementById('error').innerHTML = 'Sorry, we were unable to find any words - please try again later!';
            }

        }
    };

    xhr.open('GET', baseURL + '&length=' + noLetters);
    xhr.send();

}

/**
 *  Function onlyUnique:
 * 
 * Takes the words in the array provided by API and removes any duplicates
 */

let wordsArray = [];

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

/**
 * Function generateWords:
 * 
 * Retrieves the number of letters required by user from button selection
 * calls the getData function using this informaton
 * Uses the onlyUnique function to filter the array
 * 
 * Readies the game by resetting the current score to 0
 * And moving focus to the input field ready for the user to begin
 * 
 * Once that is all complete, calls resetTime function to start the timer
 */

function generateWords(noLetters) {
    getData(noLetters, function (data) {
        wordsArray = data.filter(onlyUnique);
        document.getElementById('words').innerHTML = wordsArray[0];
        document.getElementById('current-score').innerHTML = 0;
        document.getElementById('userInput').focus();
    });
    resetTime();
}

/**
 * Function iteratePress:
 * 
 * @variable letterCount:
 * 
 * identifies each word given
 * splits into an array of letters
 * counts the length
 * 
 * @variable countPress:
 * begins at 0 and function iterates each time user clicks a button
 * when number of clicks is equal to the number of letters, resets to 0
 * enables later check whether letter is correct
 * 
 * also:
 * clears user input field ready to type next word
 * removes used word from array
 * retrieves next word from array
 * 
 * and:
 * calls @function addAnimal
 * calls @function scoreUpdate
 */

let countPress = 0;

function iteratePress() {
    let letterCount = document.getElementById('words').innerHTML.split('').length;
    if (countPress < letterCount - 1) {
        countPress++;
    } else {
        countPress = 0;
        document.getElementById('userInput').value = '';
        wordsArray.shift();
        document.getElementById('words').innerHTML = wordsArray[0];
        addAnimal();
        scoreUpdate();
    }
}

/** 
 * Function checkLetter:
 * 
 * uses @function countPress to establish which letter to check in given word
 * compares with the letter typed by the user by using event.key to identify the letter
 * 
 * ignores keys 32 and 13 (enter and spacebar)
 * 
 * uses localeCompare to ignore case
 * 
 * if the letter typed matches the letter given, text turns green and user can continue
 * 
 * if letter typed does not match:
 * text turns red
 * focus is removed so user cannot type any more
 * timer reset
 * list of words is cleared
 * triggers 'Game over' modal
 * adds high score to text shown on modal
 * moves focus to close button on modal to avoid extra navigation for user
*/

function checkLetter(event) {
    let sourceLetter = document.getElementById('words').innerHTML.charAt(countPress);
    let inputLetter = event.key;
    if (event.keyCode == 32 || event.keyCode == 13) {
        e.preventDefault();
    }
    else {
        if (inputLetter.localeCompare(sourceLetter, undefined, { sensitivity: 'base' }) === 0) {
            document.getElementById('userInput').style.color = '#49c195';
        }
        else {
            document.getElementById('userInput').style.color = '#ee1b29';
            document.activeElement.blur();
            clearInterval(timer);
            wordsArray = '';
            let gameOverModal = new bootstrap.Modal(document.getElementById('game-over'));
            gameOverModal.toggle();
            returnScore();
            highScore();
            document.getElementById('game-end-modal-button').focus();
        }
    }
}

/**
 * Function resetGame:
 * 
 * called by the close buttons on the game over and game complete modals
 * 
 * clears timer, countPress, words, current score
 * 
 * calls @function shutdownZoo to ensure Zoo is cleared
 * calls @function gameOnOff to toggle elements correctly for game off mode
 * 
 * moves focus to the initial letter selection button to make it easier for user to start new game
 */

function resetGame() {
    $('#counter').html('');
    clearInterval(timer);
    countPress = 0;
    document.getElementById('words').innerHTML = '';
    document.getElementById('current-score').innerHTML = 0;
    score = 1;
    shutdownZoo();
    gameOnOff();
    document.getElementById('first-button').focus();
}

/**
 * Function levelUpdate:
 * 
 * Adds the level to @variable currentLevel to inform high score check
 */

let currentLevel = 0;

function levelUpdate(level) {
    currentLevel = level;
}

/**
 * Function scoreUpdate:
 * 
 * Updates the current score when called
 */

let score = 1;

function scoreUpdate() {
    document.getElementById('current-score').innerHTML = score++;
}

/**
 * Function returnScore:
 * 
 * retrieves current game score from element
 * adds game score to the relevant modal
 */


function returnScore() {
    let currentScore = document.getElementById('current-score').innerHTML;
    document.getElementById('current-game-score').innerHTML = currentScore;
    document.getElementById('losing-game-score').innerHTML = currentScore;
}

/**
 * Function highScore:
 * 
 * checks currentLevel to identify which high score to compare
 * retrieves current score and previous high score
 * updates high score if current score is higher
 * 
 * Local storage:
 * 
 * creates or updates local storage to store latest high score
 */

function highScore() {
    if (currentLevel == '4') {
        if (document.getElementById('current-score').innerHTML > document.getElementById('4-letter').innerHTML) {
            document.getElementById('4-letter').innerHTML = document.getElementById('current-score').innerHTML;
        }
    }
    else if (currentLevel == '5') {
        if (document.getElementById('current-score').innerHTML > document.getElementById('5-letter').innerHTML) {
            document.getElementById('5-letter').innerHTML = document.getElementById('current-score').innerHTML;
        }
    }
    else if (currentLevel == '6') {
        if (document.getElementById('current-score').innerHTML > document.getElementById('6-letter').innerHTML) {
            document.getElementById('6-letter').innerHTML = document.getElementById('current-score').innerHTML;
        }
    }
    else if (currentLevel == '7') {
        if (document.getElementById('current-score').innerHTML > document.getElementById('7-letter').innerHTML) {
            document.getElementById('7-letter').innerHTML = document.getElementById('current-score').innerHTML;
        }
    }
    else if (currentLevel == 'random') {
        if (document.getElementById('current-score').innerHTML > document.getElementById('random-letter').innerHTML) {
            document.getElementById('random-letter').innerHTML = document.getElementById('current-score').innerHTML;
        }
    }
    localStorage.setItem('4-letter-local', document.getElementById('4-letter').innerHTML);
    localStorage.setItem('5-letter-local', document.getElementById('5-letter').innerHTML);
    localStorage.setItem('6-letter-local', document.getElementById('6-letter').innerHTML);
    localStorage.setItem('7-letter-local', document.getElementById('7-letter').innerHTML);
    localStorage.setItem('random-letter-local', document.getElementById('random-letter').innerHTML);
}

/**
 * Function startTime:
 * 
 * creates timer
 * starts count at 60
 * counts down by 1
 * 
 * When count reaches -1 (used otherwise 0 does not show) triggers end of game:
 * 
 * removes focus from input so user cannot input further letters
 * calls @function highScore @function clearInterval @function returnScore
 * clears list of words
 * triggers game complete modal
 * moves focus to close button of modal to reduce navigation required
 */

let timer;
let count = 60;

function startTime() {
    $('#counter').html(count--);
    if (count == -1) {
        document.activeElement.blur();
        highScore();
        clearInterval(timer);
        returnScore();
        wordsArray = '';
        let gameCompleteModal = new bootstrap.Modal(document.getElementById('game-complete'));
        gameCompleteModal.toggle();
        document.getElementById('game-won-modal-button').focus();
    }
}

/**
 * Function resetTime:
 * 
 * clears the existing timer
 * resets the start count to 60
 * sets timer back to count down one second at a time
 */

function resetTime() {
    $('#counter').html();
    clearInterval(timer);
    count = 60;
    timer = setInterval(startTime, 1000);
}

/**
 * @variable Animals sets an array of animal icons
 * 
 * Function addAnimal:
 * 
 * retrieves the length of the animal array and selects a random number from the length of that array
 * adds the selected animal to the zoo
 */

let Animals = new Array('<i class="fa-solid fa-hippo"></i>', '<i class="fa-solid fa-otter"></i>', '<i class="fa-solid fa-dragon"></i>', '<i class="fa-solid fa-kiwi-bird"></i>', '<i class="fa-solid fa-crow"></i>', '<i class="fa-solid fa-spider"></i>', '<i class="fa-solid fa-fish-fins"></i>', '<i class="fa-solid fa-frog"></i>', '<i class="fa-solid fa-bugs"></i>', '<i class="fa-solid fa-worm"></i>', '<i class="fa-solid fa-locust"></i>');
let zoo = [];

function addAnimal() {
    let randomNumber = Math.floor(Math.random() * Animals.length);
    zoo.push(Animals[randomNumber]);
    document.getElementById('zooAnimals').innerHTML = zoo.join(' ');
}

/**
 * Function shutdownZoo:
 * 
 * clears the array of animals in the zoo
 */

function shutdownZoo() {
    zoo = [];
    document.getElementById('zooAnimals').innerHTML = '';
}

/**
 * Listener to trigger send of email
 * 
 * listeners for selecting form submit button on contact.html page
 * prevents default form behaviour
 * Updates submit button value to show message is being sent
 * Sends email using emailjs
 * Returns error if unable to send
 * Resets form
 * Triggers email sent modal
 * Moves focus to close button on email sent modal
 */

const emailbtn = document.getElementById('button');

if (document.getElementById('form') !== null) {
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();
        emailbtn.value = 'Sending...';

        const serviceID = 'default_service';
        const templateID = 'template_nui9tuv';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                emailbtn.value = 'Send Email';
                document.getElementById('email-sent-ack').focus();
                document.getElementById('form').reset();
            }, (err) => {
                emailbtn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
        var modal = document.getElementById('email-sent');
        modal.style.display = 'block';
    });
}

/**
 * Listens for user clicking on close in email sent modal
 * Returns user to home page to avoid unnecessary navigation
 */

if (document.getElementById('email-sent-ack') !== null) {
    document.getElementById('email-sent-ack').addEventListener('click', function () {
        window.location.href = 'index.html';
    });
}