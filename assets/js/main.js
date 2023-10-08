/*jshint esversion: 6 */

$(function () {
    if (localStorage.getItem('4-letter-local') !== null && localStorage.getItem('4-letter-local') !== undefined) {
    document.getElementById('4-letter').innerHTML = localStorage.getItem('4-letter-local');
    };
    if (localStorage.getItem('5-letter-local') !== null && localStorage.getItem('5-letter-local') !== undefined) {
    document.getElementById('5-letter').innerHTML = localStorage.getItem('5-letter-local');
    };
    if (localStorage.getItem('6-letter-local') !== null && localStorage.getItem('6-letter-local') !== undefined) {
    document.getElementById('6-letter').innerHTML = localStorage.getItem('6-letter-local');
    };
    if (localStorage.getItem('7-letter-local') !== null && localStorage.getItem('7-letter-local') !== undefined) {
    document.getElementById('7-letter').innerHTML = localStorage.getItem('7-letter-local');
    };
    if (localStorage.getItem('random-letter-local') !== null && localStorage.getItem('random-letter-local') !== undefined) {
    document.getElementById('random-letter').innerHTML = localStorage.getItem('random-letter-local');
    };
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
}

//generates the random word to copy

const baseURL = "https://random-word-api.vercel.app/api?words=200";

function getData(noLetters, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                //Successfully called API
            cb(JSON.parse(this.responseText));
        } else {
            document.getElementById("error").innerHTML = "Sorry, we were unable to find any words - please try again later!";
        }
        
    }
}

    xhr.open("GET", baseURL + "&length=" + noLetters);
    xhr.send();

}

let wordsArray = [];

function generateWords(noLetters) {
    getData(noLetters, function (data) {
        wordsArray = data;
        document.getElementById("words").innerHTML = wordsArray[0];
        document.getElementById("current-score").innerHTML = 0;
        document.getElementById('userInput').focus();
        console.log(wordsArray);
    });
    resetTime();
}

//checks if the word is typed correctly

let countPress = 0;

function iteratePress() {
    let letterCount = document.getElementById("words").innerHTML.split("").length;
    if (countPress < letterCount - 1) {
        countPress++;
    } else {
        countPress = 0;
        document.getElementById("userInput").value = "";
        wordsArray.shift();
        document.getElementById("words").innerHTML = wordsArray[0];
        addAnimal();
        scoreUpdate();
    }
    console.log(letterCount);
    console.log(countPress);
    console.log(wordsArray);
}

function checkLetter(event) {
    let sourceLetter = document.getElementById("words").innerHTML.charAt(countPress);
    let inputLetter = event.key;
    if (inputLetter === sourceLetter) {
        document.getElementById("userInput").style.color = "#49c195";
    }
    else {
        document.getElementById("userInput").style.color = "#ee1b29";
        document.activeElement.blur();
        clearInterval(timer);
        wordsArray = "";
        let gameOverModal = new bootstrap.Modal(document.getElementById('game-over'));
        gameOverModal.toggle();
        document.getElementById('game-end-modal-button').focus();
    }
}

//resets the game

function resetGame() {
    $("#counter").html("");
    clearInterval(timer);
    countPress = 0;
    document.getElementById("words").innerHTML = "";
    document.getElementById("current-score").innerHTML = 0;
    score = 1;
    shutdownZoo();
    gameOnOff();
}

//checks the level to identify which level high score the score should be checked against

let currentLevel = 0;

function levelUpdate(level) {
    currentLevel = level;
    console.log(currentLevel);
}

//updates the score

let score = 1;

function scoreUpdate() {
    document.getElementById("current-score").innerHTML = score++;
}

//adds score to congratulations modal

function returnScore() {
    document.getElementById("current-game-score").innerHTML = document.getElementById("current-score").innerHTML;
}

//Checks and updates high score

function highScore() {
    if (currentLevel == '4') {
        if (document.getElementById("current-score").innerHTML > document.getElementById('4-letter').innerHTML) {
            document.getElementById('4-letter').innerHTML = document.getElementById("current-score").innerHTML;
        }
    }
    else if (currentLevel == '5') {
        if (document.getElementById("current-score").innerHTML > document.getElementById('5-letter').innerHTML) {
            document.getElementById('5-letter').innerHTML = document.getElementById("current-score").innerHTML;
        }
    }
    else if (currentLevel == '6') {
        if (document.getElementById("current-score").innerHTML > document.getElementById('6-letter').innerHTML) {
            document.getElementById('6-letter').innerHTML = document.getElementById("current-score").innerHTML;
        }
    }
    else if (currentLevel == '7') {
        if (document.getElementById("current-score").innerHTML > document.getElementById('7-letter').innerHTML) {
            document.getElementById('7-letter').innerHTML = document.getElementById("current-score").innerHTML;
        }
    }
    else if (currentLevel == 'random') {
        if (document.getElementById("current-score").innerHTML > document.getElementById('random-letter').innerHTML) {
            document.getElementById('random-letter').innerHTML = document.getElementById("current-score").innerHTML;
        }
    }
    localStorage.setItem('4-letter-local', document.getElementById('4-letter').innerHTML);
    localStorage.setItem('5-letter-local', document.getElementById('5-letter').innerHTML);
    localStorage.setItem('6-letter-local', document.getElementById('6-letter').innerHTML);
    localStorage.setItem('7-letter-local', document.getElementById('7-letter').innerHTML);
    localStorage.setItem('random-letter-local', document.getElementById('random-letter').innerHTML);
    console.log(currentLevel);
    console.log(document.getElementById("current-score").innerHTML);
}

//provides the countdown and resets the timer

let timer;
let count = 60;

function startTime() {
    $("#counter").html(count--);
    if (count == -1) {
        document.activeElement.blur(); 
        highScore();
        clearInterval(timer);
        returnScore();
        wordsArray = "";
        let myModal = new bootstrap.Modal(document.getElementById('game-complete'));
        myModal.toggle();
        document.getElementById('game-won-modal-button').focus();
    }
}

function resetTime() {
    $("#counter").html();
    clearInterval(timer);
    count = 60;
    timer = setInterval(startTime, 1000);
}

//adds an animal to the zoo

let Animals = new Array('<i class="fa-solid fa-hippo"></i>', '<i class="fa-solid fa-otter"></i>', '<i class="fa-solid fa-dragon"></i>', '<i class="fa-solid fa-kiwi-bird"></i>', '<i class="fa-solid fa-crow"></i>', '<i class="fa-solid fa-spider"></i>', '<i class="fa-solid fa-fish-fins"></i>', '<i class="fa-solid fa-frog"></i>', '<i class="fa-solid fa-bugs"></i>', '<i class="fa-solid fa-worm"></i>', '<i class="fa-solid fa-locust"></i>');
let zoo = [];

function addAnimal() {
    let randomNumber = Math.floor(Math.random() * Animals.length);
    zoo.push(Animals[randomNumber]);
    document.getElementById('zooAnimals').innerHTML = zoo.join(" ");
}

function shutdownZoo() {
    zoo = [];
    document.getElementById('zooAnimals').innerHTML = "";
}

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
                document.getElementById("email-sent-ack").focus();
                document.getElementById("form").reset();
            }, (err) => {
                emailbtn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    })
};

if (document.getElementById('email-sent-ack') !== null) {
document.getElementById('email-sent-ack').addEventListener('click', function () {
    window.location.href = 'index.html';
})
};