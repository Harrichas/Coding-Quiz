var questionTitle = document.querySelector('#questionTitle');
var paragraphSection = document.querySelector('#paragraph');
var ul = document.querySelector('#choices');
var currentQuestionIndex = 0;
var timer;
var timerInterval;
var display;



var questions = [{
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
},
{
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
},
{
    title: "Arrays in Javascript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all the above"],
    answer: "all the above"
},
{
    title: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "paranthesis"],
    answer: "quotes"
},
{
    title: "A very useful tool used during development and debugging for printing content to the debugger is",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
},

];


var startButton = document.querySelector('#startButton')
.addEventListener('click', startButtonClicked);

function startButtonClicked(event) {
    var fiveMinutes = 15 * 5,
    display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
    displayQuestion()
    
}

function answerButtonClicked(event) {
    if(this.value !== questions[currentQuestionIndex].answer) {
        alert('Wrong');
        timer -= 10;
    }
    else {
        alert('Correct');
    }
    currentQuestionIndex++
    displayQuestion();
}

function endGame() {
    clearInterval(timerInterval);
    console.log("game over");
    console.log(timer);
    document.querySelector('#resultsDiv').style.display = "block";
    document.querySelector('.container').style.display = "none";
    document.querySelector('#score').textContent = timer;
    document.querySelector('#time').textContent = timer;
    document.querySelector('#questionTitle').innerHTML = "";
    document.querySelector('#paragraph').innerHTML = "";
    ul.innerHTML = '';
    var restart = document.querySelector('#restart');
    restart.addEventListener('click', function() {
        window.location.href = ""
    });
}

function displayQuestion(event) {
    var currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestionIndex);
    console.log(currentQuestion);
    if( !currentQuestion) {
        return endGame();
    }
    document.querySelector('#questionTitle').textContent = currentQuestion.title;
    document.querySelector('#paragraph').innerHTML = '';
    ul.innerHTML = '';

    for (var i = 0; i < currentQuestion.choices.length; i++) {

        var li = document.createElement('li');
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute('value', currentQuestion.choices[i]);
        choiceButton.textContent = currentQuestion.choices[i];
        choiceButton.onclick = answerButtonClicked;
        choiceButton.classList.add('answerChoice');
        li.append(choiceButton);
        ul.append(li);
    }
}

//set timer

var time = document.getElementById('time');

time.addEventListener('click', startButtonClicked);

function startTimer(duration, display) {
    timer = duration;
    var minutes;
    var seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            return endGame();
        }
    }, 1000);
}


//store in local storage
document.querySelector('#submit').addEventListener('submit', function(event) {
    event.preventDefault();
    var scores = localStorage.getItem("scores");
    if (!scores) {
        scores = []
    }
    else {
        scores = JSON.parse(scores)
    }
    var initials = document.querySelector('#initials').value
    scores.push({
        initials: initials, 
        score: timer
    });
    localStorage.setItem("scores", JSON.stringify(scores));
    displayScores();


} )

//retrieve
document.querySelector('#resultsDiv').style.display = "none";
document.querySelector('#scoresDiv').style.display = "none";

document.querySelector('#viewScores').addEventListener('click', displayScores)

function displayScores() {
    document.querySelector('#scoresDiv').style.display = "block";
    var scores = localStorage.getItem("scores");
    if (!scores) {
        scores = []
    }
    else {
        scores = JSON.parse(scores)
    }
    document.querySelector('#scoreslist').innerHTML = '';
    scores.forEach(function(item) {
       
        var li = document.createElement('li');
        li.textContent = item.initials + '-' + item.score
        document.querySelector('#scoreslist').appendChild(li)
    });
    document.querySelector('.container').style.display = "none";
    document.querySelector('#resultsDiv').style.display = "none";
}
