function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://random-word-api.vercel.app/api?words=200&length=6");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function generateWords(data) {
    var givenWords = document.getElementById("words");
    givenWords.innerHTML = (data);
}

getData(generateWords);

var count = 60, timer = setInterval(function () {
    $("#counter").html(count--);
    if (count == 1) clearInterval(timer);
}, 1000);