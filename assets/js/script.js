//querySelectors for html elements that will be referenced
var startQuizBtn = document.querySelector(".start-quiz-btn");
var timer = document.querySelector("#timer");
var question = document.querySelector(".question");
var answer1 = document.querySelector(".answer1");
var answer2 = document.querySelector(".answer2");
var answer3 = document.querySelector(".answer3");
var answer4 = document.querySelector(".answer4");
var quizSection = document.querySelector(".quiz-section");
var individualResult = document.querySelector("#right-or-wrong");
var initialsSection = document.querySelector(".initials-section");
var submitButton = document.querySelector(".submit-btn");
var highscoreSection = document.querySelector(".highscores-section");
var viewHighscores = document.querySelector("#highscore");

//My questionary code start.
var question1 = "Commonly used data type DO NOT include"
var quizAnswers1 = {
    content1: "1. String",
    content2: "2. booleans",
    content3: "3. alerts",
    content4: "4. numbers"
}
var question2 = "The condition in a if / else statement is enclosed within_____."
var quizAnswers2 = {
    content1: "1. quotes",
    content2: "2. curly brackets",
    content3: "3. parentheses",
    content4: "4. square brackets"
}

var question3 = "Array in JavaScript can be used to store _____."
var quizAnswers3 = {
    content1: "1. numbers and strings",
    content2: "2. other arrays",
    content3: "3. booleans",
    content4: "4. all of the about"
}

var question4 = "String values must be enclosed with ____ when being assigned to variables.?"
var quizAnswers4 = {
    content1: "1. commas",
    content2: "2. curly brackets",
    content3: "3. quotes",
    content4: "4. parenthesis"
}

var question5 = "A very useful tool used during development and debugging for printing content to the debugger is:"
var quizAnswers5 = {
    content1: "1. JavaScript",
    content2: "2. terminal/bash",
    content3: "3. for loops",
    content4: "4. console.log()"
}

var questionsArray = [question1, question2, question3, question4, question5]
var answersArray = [quizAnswers1, quizAnswers2, quizAnswers3, quizAnswers4, quizAnswers5]


//Setup correct answers
var correctAnswer1 = quizAnswers1.content3;
var correctAnswer2 = quizAnswers2.content3;
var correctAnswer3 = quizAnswers3.content4;
var correctAnswer4 = quizAnswers4.content3;
var correctAnswer5 = quizAnswers5.content4;
var correctAnswersArray = [correctAnswer1, correctAnswer2, correctAnswer3, correctAnswer4, correctAnswer5]

//Start Quiz bottom went is clicked
startQuizBtn.addEventListener("click", startTimer)

//Went start play button is click the main frame is hided
startQuizBtn.addEventListener("click", function(){
    document.querySelector(".jumbotron").style.display = "none";
    quizSection.style.display = "block";
    })

startQuizBtn.addEventListener("click", goToNextQuestion)

var correctIndex = 0;  

//Function trigger move to to next question
function goToNextQuestion(){
    if (correctIndex === questionsArray.length - 1) {
    setTimeout(function(){quizSection.style.display = "none";
    initialsSection.style.display = "inline";
}, 500);
    setTimeout(function(){clearInterval(timerInterval)}, 500);
} else {
    question.textContent = questionsArray[correctIndex];
    answer1.textContent = answersArray[correctIndex].content1;
    answer2.textContent = answersArray[correctIndex].content2;
    answer3.textContent = answersArray[correctIndex].content3;
    answer4.textContent = answersArray[correctIndex].content4;
}
}

//Setup timer 75 seconds, clear time 
var secondsLeft = 75;
var timerInterval;
function startTimer(){
    timerInterval = setInterval(function() {
        secondsLeft --;
        timer.textContent =  "Time: " + secondsLeft + " seconds";
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            quizSection.style.display = "none";
            initialsSection.style.display = "inline";
        }
        }, 1000);
    return timerInterval;
}   


//Check if the select question is answer correct and added 10 seconds if answer is wrong
quizSection.addEventListener("click", determineCorrectAnswer)
function determineCorrectAnswer(event){
    if(event.target.matches(".btn-warning")){
        var chosenAnswer = event.target.textContent;
        individualResult.textContent = " ";
        individualResult.style.display = "block";
            if (chosenAnswer === correctAnswersArray[correctIndex]){
                individualResult.textContent = "Correct";
                setTimeout(function(){ individualResult.style.display = "none"}, 500);
            } else {
                individualResult.textContent = "Wrong!";
                setTimeout(function(){ individualResult.style.display = "none"}, 500);
                secondsLeft -= 10;
                timer.textContent =  "Time: " + secondsLeft + " seconds";
            }
            correctIndex++;
    }
    return secondsLeft;
};


quizSection.addEventListener("click", function(event){
    if(event.target.matches(".btn-warning")){
        goToNextQuestion();
    }})


//submit button: 
submitButton.addEventListener("click", function(event){
    event.preventDefault();
    newUser();        
        initialsSection.style.display = "none";
        document.querySelector(".highscores-section").style.display = "block";
        document.querySelector(".user-scores").style.display = "block";
})


//Add "Secret player" and local storage  
function newUser() {
    var userInitial = document.querySelector("#initials").value;
    if (userInitial === "") {
        userInitial = "Secret player";
    } 
        localStorage.setItem(userInitial, secondsLeft);
        document.querySelector(".user-scores").textContent = " ";
        var p = document.createElement("p");
        p.textContent = userInitial + ": " + secondsLeft;
        document.querySelector(".user-scores").appendChild(p);    
    
}


// start the quiz again when "Challenge Again" button is pressed,  reset question number index, go to quiz intro page,  hide current page
document.querySelector(".challenge-again").addEventListener("click", function(){
   
    correctIndex = 0;
    
    secondsLeft = 76;
    timer.textContent =  "Time: 75 seconds";
    
    document.querySelector(".jumbotron").style.display = "block";
    
    highscoreSection.style.display = "none";
})


//clear highscore when button is pressed, reset score list content
document.querySelector(".clear-highscores").addEventListener("click", function(){
    localStorage.clear();
    document.querySelector(".user-scores").textContent = " ";
    document.querySelector(".user-scores").style.display = "none";

});

//view highscores link, stop timer if goes to highscore panel, hide all other pages and show highscore panel
viewHighscores.addEventListener("click", function(){
    clearInterval(timerInterval);
    document.querySelector(".jumbotron").style.display = "none";
    quizSection.style.display = "none";
    initialsSection.style.display = "none";
    highscoreSection.style.display = "block";
    document.querySelector(".user-scores").textContent = " ";
    for (let i = 0; i< localStorage.length; i++) {
        var p = document.createElement("p");
        var user = localStorage.key(i);
        var scores = localStorage.getItem(localStorage.key(i));
        p.textContent = user + ": " + scores;
        document.querySelector(".user-scores").appendChild(p);}
    })