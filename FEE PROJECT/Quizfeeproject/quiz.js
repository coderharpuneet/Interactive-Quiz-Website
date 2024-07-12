const questions=[
    {
        question: "Up until 2019, which cricketers have the record for the highest-run partnership in the ODI World Cup for India?",
        answers:[
            {text: "Sachin Tendulkar and Saurav Ganguly", correct: false},
            {text: "Saurav Ganguly and Rahul Dravid", correct: true},
            {text: "Saurav Ganguly and Virendra Sehwag", correct: false},
            {text: "Rahul Dravid and Sachin Tendulkar", correct: false}
        ]
    },
    {
        question: "Against which country did India score their lowest total at the ODI World Cup",
        answers:[
            {text: "West Indies", correct: false},
            {text: "England", correct: true},
            {text: "New Zealand", correct: false},
            {text: "Australia",correct: false},
        ]
    },
    {
        question: "Who was the wicket-keeper of the Indian Cricket Team during the World Cup 2003 tournament?",
        answers:[
            {text: "Parthiv Patel", correct: false},
            {text: "Nayan Mongia", correct: false},
            {text: "Rahul Dravid", correct: true},
            {text: "Mahendra Singh Dhoni", correct: false}
        ]
    },
    {
        question: "Which cricketer had scored the most runs at the ODI World Cup until 2019?",
        answers:[
            {text: "Sachin Tendulkar", correct: true},
            {text: "Mohammad Azharuddin", correct: false},
            {text: "Saurav Ganguly", correct: false},
            {text: "Rahu Dravid", correct: false}
        ]
    },
    {
        question: "In which year were the World Cup matches reduced to 50 overs from the previous 60 overs?",
        answers:[
            {text: "1983", correct: false},
            {text: "1979", correct: false},
            {text: "1992", correct: false},
            {text: "1987", correct: true}
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timerExpired = false; // New variable to track timer expiration

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// ... (your existing code)

function showQuestion() {
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Display the timer
    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = "Time Left: 10s";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    // Set a 10-second timer
    let timeLeft = 10;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = "Time Left: " + timeLeft + "s";

        if (timeLeft === 0) {
            // If the user has not selected an answer within 10 seconds, set the score for this question to 0
            timerExpired = true;
            selectAnswer({ target: null });
        }
    }, 1000);
}

// ... (your existing code)


function resetstate() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    // Clear the timer when resetting the state
    clearTimeout(timer);
    timerExpired = false; // Reset the timer expiration status
}

function selectAnswer(e) {
    // Clear the timer when an answer is selected
    clearTimeout(timer);

    const selectedButton = e ? e.target : null;
    const isCorrect = selectedButton && selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else if (timerExpired) {
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetstate();
    if(score<=3){
        questionElement.innerHTML = `Oops!!  You scored ${score} out of ${questions.length}. Better Luck Next Time`;   
    }else{
        questionElement.innerHTML = `Congratulations!! You scored ${score} out of ${questions.length}.`;
    }

    // Hide the timer display in the scorecard
    const timerDisplay = document.getElementById("timer");
    timerDisplay.style.display = "none";

    nextButton.innerHTML = "Exit";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
