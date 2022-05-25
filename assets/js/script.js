// Variable targeting HTML Elements
var timerEl = document.getElementById('timer');
var boxEl = document.getElementById("box");
var highScoreEl = document.getElementById('highScores');
var buttonContainer = document.getElementById('buttonContainer');
var startButton = document.getElementById('startButton');
var questionBox = document.getElementById('questionBox');
var answerBox1 = document.getElementById('answerBox1');
var answerBox2 = document.getElementById('answerBox2');
var answerBox3 = document.getElementById('answerBox3');
var commentBox = document.getElementById('commentBox');
var finalBox = document.getElementById("finalBox")
var currentScore = document.getElementById('currentScore');
var finalScore = document.getElementById('finalScore')
var container = document.getElementById("quizContainer")
var initialsEl = document.getElementById("initialsBox")
var submitButton = document.getElementById("submit")
var scoreDisplay = document.getElementById("scoreDisplay")
var playAgainButton = document.getElementById("playAgain")
var liEl0 = document.getElementById("li0")
var liEl1 = document.getElementById("li1")
var liEl2 = document.getElementById("li2")
var liEl3 = document.getElementById("li3")
var liEl4 = document.getElementById("li4")

// Question and answer objects. Program will still work if new object with same format is added
var questions = [
    { 
    question: 'What can a string consist of?',
    answers: ["letters, numbers, and symbols","a piece of twine", "Just letters"],
    rightAnswer: "letters, numbers, and symbols"
    },
    {
    question: 'What does NaN stand for',
    answers: ["Nice and Neat", "Not a Number", "Not a New", ],
    rightAnswer: "Not a Number"
    },
    {
    question: 'Which of these would be considered a Boolean Value?',
    answers: ["45", "Function", "True"],
    rightAnswer: "True"
    },
    {
    question: 'Where is information stored in JavaScript?',
    answers: ["In Methods", "In for Loops", "In Variables"],
    rightAnswer: "In Variables"
}];
 
//Standard Variables
var scoreTally = 0;
var timeLeft = 20;
var questionIndex = 0;
var initialsValue = 0;
var scoreObject = {};
var scoreArray = [];


//Will start quiz when button is presed
startButton.addEventListener("click", startQuiz);

function startQuiz(){
    countDown();
    generateQuestion();
    startButton.setAttribute("style", "display: none");
    timerEl.setAttribute("style", "display: block");
    highScoreEl.setAttribute("style", "display: block");
    setScore();
    container.addEventListener("click", evaluateAnswer)
};
//Begins and controls the timing of the quiz
function countDown() {
    
    var timeInterval = setInterval( function(){
        if (timeLeft > 0) {
            timerEl.textContent = "⌛" + timeLeft;
            timeLeft--;
        } else {
            showScore();
            clearInterval(timeInterval);
        }
    }, 1000)
}

//Populates the questions to the relevant place in the HTML
function generateQuestion () {
    questionBox.textContent = questions[questionIndex].question;
    answerBox1.textContent = questions[questionIndex].answers[0];
    answerBox2.textContent = questions[questionIndex].answers[1];
    answerBox3.textContent = questions[questionIndex].answers[2];
};

//CHecks if answer is right or wrong and then reacts to this
function evaluateAnswer (event) {
    var element = event.target;

if (element.matches(".answer") && element.textContent === questions[questionIndex].rightAnswer) {
 commentBox.textContent = "LAST ANSWER: CORRECT!";
 scoreTally++;
 setScore();
 questionIndex++;
 questionCycle();
} else if (element.matches(".answer") && element.textContent !== questions[questionIndex].rightAnswer ) {
    commentBox.textContent = "LAST ANSWER WRONG!";
    scoreTally--
    setScore();
    questionIndex++;
    timeLeft -=15;
    questionCycle();
}
}

//Keeps track of score
function setScore() {
    highScoreEl.textContent = " Current Score: " + scoreTally
 }

//Monitors how many questions have been asked and then brings up final score once questions are complete
function questionCycle () {
    if (questionIndex < questions.length){
        generateQuestion ();
    } else {
        container.removeEventListener("click", evaluateAnswer)
        showScore();
    }
}

//Changes display to show and give option to submit scores
function showScore() {
    container.setAttribute("style", "display: none");
    timerEl.setAttribute("style", "display: none");
    finalScore.textContent = "QUIZ IS OVER!!!! Your final Score was " + scoreTally + "! If you want to register your Score please put your initials below.";
    highScoreEl.setAttribute("style", "display: none");
    initialsEl.setAttribute("style", "display: block");
    finalBox.setAttribute("style", "height: 150px", "margin-top: 20px")
    buttonContainer.setAttribute("style", "display: none");
   }

//If user chooses to log score then this function pushes initials and score into an array that is saved in local storage where it can be used to populate High Scores
// submitButton.addEventListener("click", function(event){
//     event.preventDefault();
//     scoreArray = JSON.parse(localStorage.getItem("scoreArray")|| "[]")
//     var initialsValue = document.getElementById("initials").value;
//     scoreObject = {name: initialsValue, score: scoreTally}
//     scoreArray.push(scoreObject);
//     submitButton.setAttribute("style", "display: none");

//     if(initialsValue === "") {
//         scoreDisplay.textContent = "Initials cannot be blank!"
//     } else {
//         localStorage.setItem("scoreArray", JSON.stringify (scoreArray));
//         scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
//         scoreArray.push(scoreObject);
//         renderHighScore();
//     }
// })

submitButton.addEventListener("click", playAgain());

//Renders Scores to the Recent scores section. Will display the last five scores only as it utilises minus numbers in the index
function renderHighScore (){
    var parseScore = JSON.parse(localStorage.getItem("scoreArray"));
    if (parseScore !== null) {
        liEl0.textContent = parseScore[parseScore.length -1].name + " Scored " + parseScore[parseScore.length -1].score;
        liEl1.textContent = parseScore[parseScore.length-2].name + " Scored " + parseScore[parseScore.length-2].score;
        liEl2.textContent = parseScore[parseScore.length-3].name + " Scored " + parseScore[parseScore.length-3].score; 
        liEl3.textContent = parseScore[parseScore.length-4].name + " Scored " + parseScore[parseScore.length-4].score;
        liEl4.textContent = parseScore[parseScore.length-5].name + " Scored " + parseScore[parseScore.length-5].score;   
    }
}

//Allows user to play quiz again
function playAgain () {
    startButton.setAttribute("style", "display: block");
    initialsEl.setAttribute("style", "display: hidden");
    timeLeft = 20;
    return;
    // scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
}
//Event listener for play again button
playAgainButton.addEventListener("click", playAgain)

//Ensures Recent Scores is populated on loading of page
renderHighScore()
