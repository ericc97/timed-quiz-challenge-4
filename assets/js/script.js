

// getting all required elements
const startBtnEl = document.querySelector(".start-btn");
const infoBoxEl = document.querySelector(".info-box");
const exitBtnEl = infoBoxEl.querySelector(".buttons .quit");
const continueBtnEl = infoBoxEl.querySelector(".buttons .restart");
const quizBoxEl = document.querySelector(".quiz-box");
const resultBoxEl = document.querySelector(".result-box");
const timeCountEl = quizBoxEl.querySelector(".timer .timer-sec");
const timeLineEl = quizBoxEl.querySelector("header .time-line");
const restartQuizEl = resultBoxEl.querySelector(".buttons .restart");

const optionListEl = document.querySelector(".option-list");



// if start quiz button is clicked
startBtnEl.onclick = () => {
    infoBoxEl.classList.add("activeInfo");
    startTimer(50);
    startTimerLine(widthValue);


}

// if exit quiz button is clicked
exitBtnEl.onclick = () => {
    infoBoxEl.classList.remove("activeInfo"); // hide the info box
}

// if next question button is clicked
continueBtnEl.onclick = () => {
    infoBoxEl.classList.remove("activeInfo"); // hide the info box
    quizBoxEl.classList.add("activeQuiz"); // show the quiz box
    showQuestions(0);
    queCounter(1);
    
}


let queCount = 0;
let queNumb = 1;
let counter;
let timeValue = 50;
let widthValue = 0;
let userScore = 0;
let timeTag = 0;


const nextBtn = quizBoxEl.querySelector(".next-btn");
const ScoreBoxEl = resultBoxEl.querySelector(".buttons .score-box")


    



restartQuizEl.onclick = ()=>{
    window.location.reload();
}

// if next button is clicked 
nextBtn.onclick = () =>{
    if(queCount < questions.length - 1){
        queCount++;
        queNumb++;
        showQuestions(queCount);
        queCounter(queNumb);
        nextBtn.style.display = "none";
    }else{
        console.log("Questions Completed");
        showResultBox();
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

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[queCount].answer;
    const allOptions = optionListEl.children.length;

    if(userAnswer == correctAnswer){
        userScore +=1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("answer is correct");
        
    }else {
        answer.classList.add("incorrect");
        console.log("You're wrong");

        timeCountEl.textContent = timeCountEl.textContent -10;

        // if answer is incorrect then automatically select the correct answer
        for (i = 0; i < allOptions; i++) {
            if(optionListEl.children[i].textContent == correctAnswer) {
                optionListEl.children[i].setAttribute("class", "option correct");

                console.log("Auto selected correct answer");
            }
            
        }
    }

    // once user selects an answer, disable other options
    for (i=0; i < allOptions; i++) {
        optionListEl.children[i].classList.add("disabled");
    }
    nextBtn.style.display = "block";
}   

function showResultBox(){
    infoBoxEl.classList.remove("activeInfo"); //hide info box
    quizBoxEl.classList.remove("activeQuiz"); // hide the quiz box
    resultBoxEl.classList.add("activeResult"); // show result box

    const scoreTextEl = resultBoxEl.querySelector(".score-text");
    if(userScore > 3){
        let scoreTag = '<span>Great Job! You got<p>'+ userScore +'</p><p>Out Of</p><p>'+ questions.length +'</p></span>';
        scoreTextEl.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>Not bad but, You only got<p>'+ userScore +'</p><p>Out Of</p><p>'+ questions.length +'</p></span>';
        scoreTextEl.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>Ouch... You only got<p>'+ userScore +'</p><p>Out Of</p><p>'+ questions.length +'</p></span>';
        scoreTextEl.innerHTML = scoreTag;
    }

    
}




function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCountEl.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCountEl.textContent;
            timeCountEl.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCountEl.textContent = "00";
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 100);
    function timer(){
        time += 1;
        timeLineEl.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
        if(time < 0){
            clearInterval(counter);
            timeCountEl.textContent = "00";
        }
    }
}



function queCounter(index){
    const bottomQuesCounter = quizBoxEl.querySelector(".total-que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length + '</p>Questions</span>';
    bottomQuesCounter.innerHTML = totalQuesCountTag;
}

//function showScoreBox(){
    //check localStorage for high score, if it's not there, use 0
    //var highScore = localStorage.getItem("highscore");
    //if (highScore === null) {
        //highScore = 0;
    //}
    //if player has more money left than previous highscore, player has new highscore!
    //if (playerInfo.money > highScore) {
        //localStorage.setItem("highscore", playerInfo.money);
        //localStorage.setItem("name", playerInfo.name);

        //alert(playerInfo.name + " Now has the high score of " + playerInfo.money + "!");
    //}
    //else {
       // alert(playerInfo.name + " You did not beat the highscore of " + highScore + " Your score was  " + playerInfo.money);
    //}
//}