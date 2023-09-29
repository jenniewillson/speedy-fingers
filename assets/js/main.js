$('.letter-choice').click(function () {
    $('#basic-instructions').hide();
    $('#timer-box').show();
    $('#words').show();
    $('#input').show();
    $('#zoo').show();
});

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


var count = 60, timer = setInterval(function () {
    $("#counter").html(count--);
    if (count == 1) clearInterval(timer);
}, 1000);