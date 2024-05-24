// Functions

// Function to reset the quiz and start over
function restartQuiz() {
    // Reset the quiz page
    document.getElementById('quiz-page').style.display = 'block';
    document.getElementById('answers-page').style.display = 'none';
    resultsContainer.innerHTML = ''; // Clear previous results
    // Reset quiz timer
    startQuiz();
    // Reset question slides
    currentSlide = 0;
    showSlide(currentSlide);
    // Reset answer colors
    const answerContainers = quizContainer.querySelectorAll('.answers');
    answerContainers.forEach(container => {
        container.style.color = ''; // Reset answer colors
    });
}

// Variables...

// Event listener for the "Retake Quiz" button on the answers page
document.getElementById('retake-quiz').addEventListener('click', restartQuiz);

function buildQuiz() {
    // Variable to store the HTML output
    const output = [];

    // For each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {

        // Variable to store the list of possible answers
        const answers = [];

        // And for each available answer...
        for (letter in currentQuestion.answers) {
            // Add an HTML radio button
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        // Add this question and its answers to the output
        output.push(
            `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>
            </div>`
        );
    });

    // Finally, combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showResults() {
    // Gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // Keep track of user's answers and correct count
    let numCorrect = 0;

    // For each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        // Find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // If answer is correct, increment the correct count
        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            // Color the correct answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // If answer is wrong or blank, color the answers red
        else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    // Display the total correct count and the total question count
    resultsContainer.innerHTML = `You got ${numCorrect} out of ${myQuestions.length} correct!`;

    // Hide the quiz page and show the answers page
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('answers-page').style.display = 'block';

    // Populate the answer details
    const answerDetailsContainer = document.getElementById('answer-details');
    answerDetailsContainer.innerHTML = '';
    myQuestions.forEach((question, index) => {
        answerDetailsContainer.innerHTML += `<p><strong>Question ${index + 1}:</strong> ${question.correctAnswer}</p>`;
    });

    // Populate the correct count
    document.getElementById('correct-count').textContent = numCorrect;
    document.getElementById('total-count').textContent = myQuestions.length;

    // Stop the quiz timer
    stopQuizTimer();
}

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    // Display previous/next buttons based on the current slide index
    if (currentSlide === 0) {
        previousButton.style.display = 'none';
    } else {
        previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    // Check if there's a next slide available
    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
    }
}

function showPreviousSlide() {
    // Check if there's a previous slide available
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Function to start the quiz and timer
function startQuiz() {
    document.getElementById('intro-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';

    // Timer
    var timeLeft = 45;
    var timer = setInterval(function () {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('No more time left!');
            showResults();
        }
    }, 1000);

    // Store the timer ID in a global variable for later use
    window.quizTimer = timer;
}

// Function to stop the quiz timer
function stopQuizTimer() {
    clearInterval(window.quizTimer);
}

// Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
    {
        question: "What is my favorite animal?",
        answers: {
            a: "Dogs",
            b: "Cats",
            c: "Birds"
        },
        correctAnswer: "a"
    },
    {
        question: "What is my favorite ice cream flavor?",
        answers: {
            a: "Vanilla",
            b: "Chocolate",
            c: "Cookies and cream"
        },
        correctAnswer: "a"
    },
    {
        question: "What was my dogs name?",
        answers: {
            a: "Maggie",
            b: "Nikki",
            c: "Philip"
        },
        correctAnswer: "a"
    },
    {
        question: "When is my birthday?",
        answers: {
            a: "July 23",
            b: "May 5",
            c: "February 1",
            d: "December 5"
        },
        correctAnswer: "c"
    },
    {
        question: "What is my zodiac sign?",
        answers: {
            a: "Libra",
            b: "Aquarius",
            c: "Leo",
            d: "Taurus"
        },
        correctAnswer: "b"
    },
    {
        question: "How many siblings do I have?",
        answers: {
            a: "1",
            b: "5",
            c: "2",
            d: "3"
        },
        correctAnswer: "c"
    },
    {
        question: "How old am I?",
        answers: {
            a: "22",
            b: "24",
            c: "21"
        },
        correctAnswer: "b"
    },
    {
        question: "What is my favorite color?",
        answers: {
            a: "Light pink",
            b: "Red",
            c: "Lavander",
            d: "Black"
        },
        correctAnswer: "c"
    }
];

// Kick things off
buildQuiz();

// Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Show the first slide
showSlide(currentSlide);

// Event listeners
document.getElementById('start-quiz').addEventListener('click', startQuiz);
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", function() {
    console.log("Previous button clicked"); // Add console log statement
    showPreviousSlide();
});
nextButton.addEventListener("click", function() {
    console.log("Next button clicked"); // Add console log statement
    showNextSlide();
});
