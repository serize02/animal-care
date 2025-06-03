document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

const quizData = [
    {
        question: "De los siguientes alimentos, cuáles no deberías darle a tu perro?",
        options: [
            "Aguacate",
            "Cebolla",
            "Chocolate",
            "Ninguno de los anteriores"
        ],
        correct: 3
    },
    {
        question: "Si tu gato levanta y mueve la cola efusivamente significa que está:",
        options: [
            "Feliz",
            "Molesto",
            "Cansado"
        ],
        correct: 0
    },
    {
        question: "Si tu perro tiene seis meses su equivalente en años humanos es:",
        options: [
            "50 años",
            "7 años",
            "15 años",
            "10 años"
        ],
        correct: 3
    },
    {
        question: "Los cítricos son recomendados para alimentar a los hámsteres:",
        options: [
            "Verdadero",
            "Falso",
        ],
        correct: 1
    },
    {
        question: "El tiempo de gestación de los gatos es de:",
        options: [
            "2 meses",
            "9 meses",
            "5 meses",
        ],
        correct: 0
    },
    {
        question: "Los patos tienen un campo de visión de:",
        options: [
            "180°",
            "340°",
            "360°",
        ],
        correct: 1
    },
    {
        question: "Los perros pueden entender unas 160 palabras de lo que dicen los humanos:",
        options: [
            "Verdadero",
            "Quizás",
            "Falso",
        ],
        correct: 0
    },
    {
        question: "Cuando un perro duerme muy bien, cómodo, seguro adopta la posición:",
        options: [
            "Enroscado",
            "Patas arriba",
            "Estirado",
        ],
        correct: 1
    },
    {
        question: "Los perros, al igual que los humanos, pueden ser diestros o zurdos:",
        options: [
            "Verdadero",
            "Falso",
            "No me digas"
        ],
        correct: 0
    },
    {
        question: "Existe la posibilidad de que los perros sufran depresión si no se les da la suficiente atención y cuidados:",
        options: [
            "Verdadero",
            "Quizás",
            "Falso",
        ],
        correct: 0
    }
];

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-quiz');
const quizResults = document.getElementById('quiz-results');
let userAnswers = Array(quizData.length).fill(null);

quizData.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.className = 'mb-12 p-6 bg-white rounded-lg shadow-md';
    
    questionElement.innerHTML = `
        <h3 class="text-xl font-semibold mb-4 text-dark">${index + 1}. ${question.question}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${question.options.map((option, optionIndex) => `
                <div class="quiz-option cursor-pointer p-4 border border-primary rounded-lg transition duration-300"
                     data-question="${index}" 
                     data-option="${optionIndex}"
                     onclick="selectAnswer(${index}, ${optionIndex})">
                    ${option}
                </div>
            `).join('')}
        </div>
    `;
    
    quizContainer.appendChild(questionElement);
});

window.selectAnswer = function(questionIndex, optionIndex) {

    const options = document.querySelectorAll(`[data-question="${questionIndex}"]`);
    options.forEach(opt => opt.classList.remove('selected'));
    
    const selectedOption = document.querySelector(`[data-question="${questionIndex}"][data-option="${optionIndex}"]`);
    selectedOption.classList.add('selected');
    
    userAnswers[questionIndex] = optionIndex;
};

submitButton.addEventListener('click', function() {
    let score = 0;
    
    quizData.forEach((question, index) => {
        const options = document.querySelectorAll(`[data-question="${index}"]`);
        
        if (userAnswers[index] === question.correct) {
            score++;
            options[question.correct].classList.add('correct');
        } else if (userAnswers[index] !== null) {
            options[userAnswers[index]].classList.add('incorrect');
            options[question.correct].classList.add('correct');
        } else {
            options[question.correct].classList.add('correct');
        }
    });
    
    const percentage = Math.round((score / quizData.length) * 100);
    quizResults.textContent = `You scored ${score} out of ${quizData.length} (${percentage}%)`;
    quizResults.classList.remove('hidden');
    
    submitButton.disabled = true;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});