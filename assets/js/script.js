// 1. Welcome to the timed quiz!
// 2. A 75 second timer will run throughout the quiz.
// 3. If you get a question right, the next question will appear.
// 4. If you get a question wrong, time will be ducted from the remaining time and the next question will appear. 
// 5. Score is calculated based off of the time remaining at the end.
// 6. Your final score will be added to a list of high scores!



// What does HTML stand for?
// Hyper Text Math Law
// Hyper Text Markup Language
// Hyper Text Multi Language
// Hyper Text Macro Language

// What is the purpose of css?
// To Alter the Styling and Overview of the HTML 
// To add more HTML
// To change the order in which the html is read
// To allow hackers access to the code file

// What is Software Engineering?
// Designing a and building a computer to use software
// To build the physical components of a cpu
// Application of engineering principles to the design a software
// None of the above

// What command would you use to clone a repo from github onto your computer?
// git init
//git merge
//git add .
// git clone

// What are the scopes of a variable in JavaScript?
// Global Scope
// Local Scope
// Just A. 
// A and B


// getting all required elements
const startBtnEl = document.querySelector(".start-btn");
const infoBoxEl = document.querySelector(".info-box");
const exitBtnEl = infoBoxEl.querySelector(".buttons .quit");
const continueBtnEl = infoBoxEl.querySelector(".buttons .restart");
const quizBoxEl = document.querySelector(".quiz-box");
const resultBoxEl = document.querySelector(".result-box");
const optionListEl = document.querySelector(".option-list");




// if start quiz button is clicked
startBtnEl.onclick = () => {
    infoBoxEl.classList.add("activeInfo");
}

// if exit quiz button is clicked
exitBtnEl.onclick = () => {
    infoBoxEl.classList.remove("activeInfo"); // hide the info box
}

// if continue quiz button is clicked
continueBtnEl.onclick = () => {
    infoBoxEl.classList.remove("activeInfo"); // hide the info box
    quizBoxEl.classList.add("activeQuiz"); // show the quiz box
    showQuestions(0);
    queCounter(1);
}


let queCount = 0;
let queNumb = 1;


const nextBtn = quizBoxEl.querySelector(".next-btn");
// if next button is clicked 
nextBtn.onclick = () =>{
    if(queCount < questions.length - 1){
        queCount++;
        queNumb++;
        showQuestions(queCount);
        queCounter(queNumb);
    }else{
        console.log("Questions Completed");
    }
    
}


//getting questions and options from array
function showQuestions(index){
    const queText = document.querySelector(".que-text");
    let queTag = '<span>'+ questions[index].numb + ". " + questions[index].question + '</span>';
    let optionTag =         
                    '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                    + '<div class="option">'+  questions[index].options[1] +'<span></span></div>'
                    + '<div class="option">'+  questions[index].options[2] +'<span></span></div>'
                    + '<div class="option">'+  questions[index].options[3] +'<span></span></div>';

    queText.innerHTML = queTag;
    optionListEl.innerHTML = optionTag;

    const option = optionListEl.querySelectorAll(".option");

    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }

}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[queCount].answer;
    let allOptions = optionListEl.children.length;
    if(userAnswer == correctAnswer){
        answer.classList.add("correct");
        console.log("answer is correct");
    }else {
        answer.classList.add("incorrect");
        console.log("You're fucking wrong");
    }

    // once user selects an answer, disable other options
    for (let i=0; i < allOptions; i++) {
        optionListEl.children[i].classList.add("disabled");
    }
}   






function queCounter(index){
    const bottomQuesCounter = quizBoxEl.querySelector(".total-que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length + '</p>Questions</span>';
    bottomQuesCounter.innerHTML = totalQuesCountTag;
}