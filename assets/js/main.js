$('.letter-choice').click(function () {
    $('#basic-instructions').hide();
    $('#timer-box').show();
    $('#word').show();
    $('#input').show();
    $('#zoo').show();
});

function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://random-word-api.vercel.app/api?words=200&length=6");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var wordList = this.responseText;
            console.log(wordList);
            //cb(JSON.parse(this.responseText));//
        }
    };
}

//NOT WORKING//

function generateWords(data) {
    var givenWord = document.getElementById("words");
    givenWord.innerHTML = (wordList);
}

getData(generateWords);

var count = 60, timer = setInterval(function () {
    $("#counter").html(count--);
    if (count == 1) clearInterval(timer);
}, 1000);