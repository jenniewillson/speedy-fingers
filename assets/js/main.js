// adds the high scores from local storage when user returns to the game

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

// hides and shows sections depending on whether game is in progress

$('.letter-choice').click(gameOnOff);

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

//contacts the API and returns error if needed

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

// Filters the returned words to unique values only

let wordsArray = [];

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

//Generates the words and adds to element, resets current score and time and moves focus to user input

function generateWords(noLetters) {
    getData(noLetters, function (data) {
        wordsArray = data.filter(onlyUnique);
        document.getElementById('words').innerHTML = wordsArray[0];
        document.getElementById('current-score').innerHTML = 0;
        document.getElementById('userInput').focus();
    });
    resetTime();
}

//identifies which letter of the word is being typed, removes complete words and adds animals to zoo and point to score for each correct word

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

//checks if each letter is typed correctly and ends game if not, including updating the score and clearing the words array

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

//resets the game

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

//checks the level to identify which level high score the score should be checked against

let currentLevel = 0;

function levelUpdate(level) {
    currentLevel = level;
}

//updates the score

let score = 1;

function scoreUpdate() {
    document.getElementById('current-score').innerHTML = score++;
}

//adds score to congratulations or game over modal


function returnScore() {
    let currentScore = document.getElementById('current-score').innerHTML;
    document.getElementById('current-game-score').innerHTML = currentScore;
    document.getElementById('losing-game-score').innerHTML = currentScore;
}

//Checks and updates high score where required, including local storage

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

//provides the countdown and resets the timer

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

function resetTime() {
    $('#counter').html();
    clearInterval(timer);
    count = 60;
    timer = setInterval(startTime, 1000);
}

//adds a random animal to the zoo

let Animals = new Array('<i class="fa-solid fa-hippo"></i>', '<i class="fa-solid fa-otter"></i>', '<i class="fa-solid fa-dragon"></i>', '<i class="fa-solid fa-kiwi-bird"></i>', '<i class="fa-solid fa-crow"></i>', '<i class="fa-solid fa-spider"></i>', '<i class="fa-solid fa-fish-fins"></i>', '<i class="fa-solid fa-frog"></i>', '<i class="fa-solid fa-bugs"></i>', '<i class="fa-solid fa-worm"></i>', '<i class="fa-solid fa-locust"></i>');
let zoo = [];

function addAnimal() {
    let randomNumber = Math.floor(Math.random() * Animals.length);
    zoo.push(Animals[randomNumber]);
    document.getElementById('zooAnimals').innerHTML = zoo.join(' ');
}

//clears the zoo when game is over

function shutdownZoo() {
    zoo = [];
    document.getElementById('zooAnimals').innerHTML = '';
}

//sends message added by user to emailjs or returns error

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

//Returns user to home page once message has been sent

if (document.getElementById('email-sent-ack') !== null) {
    document.getElementById('email-sent-ack').addEventListener('click', function () {
        window.location.href = 'index.html';
    });
}