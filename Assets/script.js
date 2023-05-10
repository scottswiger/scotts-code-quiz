//Declaration of all env variables
let currentQuestion = document.getElementById("questionHeader");
let thisAnswer1 = document.getElementById("answer1");
let thisAnswer2 = document.getElementById("answer2");
let thisAnswer3 = document.getElementById("answer3");
let thisAnswer4 = document.getElementById("answer4");
let startQuiz = document.getElementById("startButton");
let totalScore = document.getElementById("totalScore");
let currentScore = document.getElementById("currentScore");
let timer = document.getElementById("timer");
let answersList = document.getElementById("answerHeader");

//Variables
let i = 0;
let correctVal = 0;
let incorrectVal = 0;
let remTime = 0;
let score = 0;
let key = "";
let userInitials = "";


//Array of question objects
let questions = [
    {
        question: "Commonly used data types does NOT include which of the following?",
        answer1: "a-  alerts",
        answer2: "b-  strings",
        answer3: "c-  booleans",
        answer4: "d-  numbers",
        correctAnswer: "a"
    },
    {
        question: "The condition in an if / else statement is enclosed within _____",
        answer1: "a-  quotes",
        answer2: "b-  curly braces",
        answer3: "c-  parentheses",
        answer4: "d-  square brackets",
        correctAnswer: "c"
    },
    {
        question: "Arrays in Javascript can be used to store _____",
        answer1: "a-  numbers and strings",
        answer2: "b-  other arrays",
        answer3: "c-  booleans",
        answer4: "d-  all of the above",
        correctAnswer: "d"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables",
        answer1: "a-  commas",
        answer2: "b-  curly brackets",
        answer3: "c-  quotes",
        answer4: "d-  parentheses",
        correctAnswer: "c"
    },
    {
        question: "A very useful tool during development and debugging for printing content to the console is?",
        answer1: "a-  JavaScript",
        answer2: "b-  terminal / bash",
        answer3: "c-  for loops",
        answer4: "d-  console.log",
        correctAnswer: "d"
    }
]

//Event Listener for the start button, which activates the timer and quiz
startQuiz.addEventListener("click", () => {
    beginQuiz();
    beginCount();
});


//Event Listener for pressing the keys to log an an answer
document.addEventListener('keydown', function (event) {
    if (timeLeft === 0) {
        return;
    }
    key = event.key.toLowerCase();
    let keyEntry = "abcd".split("");
    if (keyEntry.includes(key)) {
        console.log(key);
        verifyValue();
    }
});


//Function to start the quiz and display the potential answers 
function beginQuiz() {
    answersList.style = "visibility: hidden;"
    if (i === questions.length) {
        totalScore.innerHTML = "Correct Total: " + correctVal + "  Incorrect Total: " + incorrectVal;
        displayResults();
    } else {
        totalScore.innerHTML = "Correct Total: " + correctVal + "  Incorrect Total: " + incorrectVal;
        startQuiz.innerHTML = "Please press the key that corresponds with right answer";
        currentQuestion.innerHTML = questions[i].question;
        thisAnswer1.innerHTML = questions[i].answer1;
        thisAnswer2.innerHTML = questions[i].answer2;
        thisAnswer3.innerHTML = questions[i].answer3;
        thisAnswer4.innerHTML = questions[i].answer4;
    }
};

//Verifies the inputs against the indexed value
function verifyValue() {
    score = Math.floor(remTime * correctVal);
    currentScore.innerHTML = "Your Score is " + score;
    if (key == questions[i].correctAnswer) {
        correctVal = correctVal + 1;
        i = i + 1;
        alert("Correct!");

    } else {
        remTime = remTime - 20; 
        incorrectVal = incorrectVal + 1;
        i = i + 1;
        alert("Wrong Answer! -20 Seconds");
    } beginQuiz();
}

//Function that displays the results to the user 
function displayResults() {
    startQuiz.addEventListener("click", logScores);
    startQuiz.innerHTML = "Click here to log your score and initials";
    currentQuestion.innerHTML = "Thanks for Playing!";
    thisAnswer1.innerHTML = "Your final score: " + score;
    thisAnswer2.innerHTML = ""
    thisAnswer3.innerHTML = ""
    thisAnswer4.innerHTML = ""
};

//Timer that starts on quiz start and ends on quiz end
function beginCount() {
    timeLeft = 120;
    let timeInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = timeLeft + " seconds remaining!"
        if (i === questions.length) {
            reportResults();
            timer.textContent = "";
        }
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timer.textContent = "";
            alert("Your time has expired ): ")
            displayResults();
        } else if (i === questions.length) {
            clearInterval(timeInterval);
        }
    }, 1000);
};

//Function that logs the scores to local storage
function logScores() {
    userInitials = window.prompt("Please enter your initials");
    localStorage.setItem("user-initials", userInitials);
    localStorage.setItem("user-score", score);
    i = questions.length;
};