// hides and shows sections depending on whether game is in progress

$('.letter-choice').click(gameOnOff);

function gameOnOff() {
    $('#basic-instructions').toggle();
    $('#timer-box').toggle();
    $('#words').toggle();
    $('#input').toggle();
    $('#zoo').toggle();
    $('#zooAnimals').innerHTML = "";
    $('#userInput').val('');
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
        console.log(wordsArray);
    });
    startTime();
};

//adds an animal to the zoo

let Animals = new Array('<i class="fa-solid fa-hippo"></i>', '<i class="fa-solid fa-otter"></i>', '<i class="fa-solid fa-dragon"></i>', '<i class="fa-solid fa-kiwi-bird"></i>', '<i class="fa-solid fa-crow"></i>', '<i class="fa-solid fa-spider"></i>', '<i class="fa-solid fa-fish-fins"></i>', '<i class="fa-solid fa-frog"></i>', '<i class="fa-solid fa-bugs"></i>', '<i class="fa-solid fa-worm"></i>', '<i class="fa-solid fa-locust"></i>');
let zoo = new Array();

function addAnimal() {
    let randomNumber = Math.floor(Math.random() * Animals.length);
    zoo.push(Animals[randomNumber]);
    document.getElementById('zooAnimals').innerHTML = zoo;
}

//checks if the word is typed correctly

let countPress = 0;

function iteratePress() {
    let letterCount = document.getElementById("words").innerHTML.split("").length;
    if (countPress < letterCount-1) {
            countPress++;
        } else {
            countPress = 0;
            document.getElementById("userInput").value = "";
            wordsArray.shift();
            document.getElementById("words").innerHTML = wordsArray[0]
            addAnimal();
        };
    console.log(letterCount);
    console.log(countPress);
    console.log(wordsArray)
    };

function checkLetter(event) {
    let sourceLetter = document.getElementById("words").innerHTML.charAt(countPress);
    let inputLetter = event.key;
    if (inputLetter === sourceLetter) {
        document.getElementById("userInput").style.color = "#49c195";
    }
    else {
        document.getElementById("userInput").style.color = "#ee1b29";
        countPress = 0;
        document.getElementById("words").innerHTML = "";
        wordsArray = "";
        gameOnOff();
    }
};



//provides the countdown

function startTime() {
    let count = 60, timer = setInterval(function () {
    $("#counter").html(count--);
    if (count == -1) clearInterval(timer);
}, 1000);
};

