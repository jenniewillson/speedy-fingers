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
};

//generates the random word to copy

const baseURL = "https://random-word-api.vercel.app/api?words=200";

function getData(noLetters, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL + "&length=" + noLetters);
    xhr.send();

};

let wordsArray;

function generateWords(noLetters) {
    getData(noLetters, function (data) {
        wordsArray = data;
        document.getElementById("words").innerHTML = wordsArray[0];
        document.getElementById("current-score").innerHTML = 0;
        document.getElementById('userInput').focus();
        console.log(wordsArray);
    });
    resetTime();
};

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
    };
    console.log(letterCount);
    console.log(countPress);
    console.log(wordsArray);
};

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
        let myModal = new bootstrap.Modal(document.getElementById('game-over'));
        myModal.toggle();
    }
};

//resets the game if a word was typed incorrectly

function resetGame() {
    resetTime();
    countPress = 0;
    document.getElementById("words").innerHTML = "";
    document.getElementById("current-score").innerHTML = "";
    shutdownZoo();
    gameOnOff();
}

//checks the level to identify which level high score the score should be checked against

function levelUpdate(level) {
    let currentLevel = level;
    console.log(currentLevel);
};

//updates the score

let score = 1;

function scoreUpdate() {
    document.getElementById("current-score").innerHTML = score++;
};

//adds score to congratulations modal

function returnScore() {
    document.getElementById("current-game-score").innerHTML = document.getElementById("current-score").innerHTML;
};

//provides the countdown and resets the timer

let timer = setInterval(startTime, 1000);
let count = 60;

function startTime() {
    $("#counter").html(count--);
    if (count == -1) {
        clearInterval(timer);
        returnScore();
        wordsArray = "";
        let myModal = new bootstrap.Modal(document.getElementById('game-complete'));
        myModal.toggle();
}
};

function resetTime() {
    $("#counter").html();
    clearInterval(timer);
    count = 60;
    timer = setInterval(startTime, 1000);
};

//adds an animal to the zoo

let Animals = new Array('<i class="fa-solid fa-hippo"></i>', '<i class="fa-solid fa-otter"></i>', '<i class="fa-solid fa-dragon"></i>', '<i class="fa-solid fa-kiwi-bird"></i>', '<i class="fa-solid fa-crow"></i>', '<i class="fa-solid fa-spider"></i>', '<i class="fa-solid fa-fish-fins"></i>', '<i class="fa-solid fa-frog"></i>', '<i class="fa-solid fa-bugs"></i>', '<i class="fa-solid fa-worm"></i>', '<i class="fa-solid fa-locust"></i>');
let zoo = new Array();

function addAnimal() {
    let randomNumber = Math.floor(Math.random() * Animals.length);
    zoo.push(Animals[randomNumber]);
    document.getElementById('zooAnimals').innerHTML = zoo;
}

function shutdownZoo() {
    zoo = [];
    document.getElementById('zooAnimals').innerHTML = "";
}
