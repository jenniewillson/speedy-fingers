// hides and shows sections depending on whether game is in progress

$('.letter-choice').click(function () {
    $('#basic-instructions').hide();
    $('#timer-box').show();
    $('#words').show();
    $('#input').show();
    $('#zoo').show();
});

//generates the random word to copy

const baseURL = "https://random-word-api.vercel.app/api?words=1";

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

function generateWords(noLetters) {
    getData(noLetters, function (data) {
        document.getElementById("words").innerHTML = data;
        console.log(data);
    });
};

//checks if the word is typed correctly

function checkLetter(event) {
    let sourceLetter = document.getElementById("words").innerHTML.charAt(0);
    let inputLetter = event.key;
    if (inputLetter === sourceLetter) {
        console.log("correct!");
    }
    else {
        console.log("wrong!");
    }
};

//provides the countdown

var count = 60, timer = setInterval(function () {
    $("#counter").html(count--);
    if (count == -1) clearInterval(timer);
}, 1000);

//detailed instructions pop-up

$('#d-instructions').click(function () {
    window.alert("Select the number of letters you would like in the words you are shown.\r\rWhen you click in the box, the timer will start.You have a minute to types as many words as possible.\r\rIf you get a word wrong, your turn ends.Click the selector for the number of letters to start a new game.\r\rThe more words you get correct, the more animals you gain in your zoo!If you get all your words correct, you win! \r\rKeep trying to beat your high score!");
});