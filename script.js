    // DOM Elements
const synopsisBtn = document.getElementById('synopsisBtn');
const quizBtn = document.getElementById('quizBtn');
const creditsBtn = document.getElementById('creditsBtn');
const synopsisSection = document.getElementById('synopsis');
const quizSection = document.getElementById('quiz');
const creditsSection = document.getElementById('credits');
const yesAdoptBtn = document.getElementById('yesAdoptBtn');
const noAdoptBtn = document.getElementById('noAdoptBtn');
const yesAdoptionSection = document.getElementById('yesAdoption');
const noAdoptionSection = document.getElementById('noAdoption');
const navLinks = document.querySelectorAll('.nav-link');

let currentSlide1 = 0;
let currentSlide2 = 0;
const images1 = [
    'assets/12.jpg',
    'assets/13.jpg',
    'assets/14.jpg',
    'assets/15.jpg',
    'assets/16.jpg',
    'assets/17.jpg',
    'assets/18.jpg',
    'assets/19.jpg',
    'assets/20.jpg',
    'assets/21.jpg',
    'assets/22.jpg',
];

const images2 = [
    'assets/23.png',
    'assets/24.png',
    'assets/25.png',
    'assets/26.png',
    'assets/27.png',
];

const quizQuestions = [
    {
        question: "1. De los siguientes alimentos, ¿cuáles no deberías darle a tu perro?",
        options: ["Aguacate", "Cebolla", "Chocolate", "Ninguno de los anteriores"],
        answer: 3
    },
    {
        question: "2. Si tu gato levanta y mueve la cola efusivamente, significa que está:",
        options: ["Feliz", "Molesto", "Cansado"],
        answer: 0
    },
    {
        question: "3. Si tu perro tiene seis meses, su equivalente en años humanos es:",
        options: ["50 años", "7 años", "15 años", "10 años"],
        answer: 3
    },
    {
        question: "4. Los cítricos son recomendados para alimentar a los hámsteres:",
        options: ["Verdadero", "Falso"],
        answer: 1
    },
    {
        question: "5. El tiempo de gestación de los gatos es de:",
        options: ["2 meses", "9 meses", "5 meses"],
        answer: 0
    },
    {
        question: "6. ¿Cada cuánto tiempo debe cambiarse el agua de la pecera?",
        options: ["1 semana", "2 semanas", "Cada mes"],
        answer: 1
    },
    {
        question: "7. Los perros pueden entender unas 160 palabras de lo que dicen los humanos:",
        options: ["Verdadero", "Quizás", "Falso"],
        answer: 0
    },
    {
        question: "8. Cuando un perro duerme muy bien, cómodo y seguro, adopta la posición:",
        options: ["Enroscado", "Patas arriba", "Estirado"],
        answer: 1
    },
    {
        question: "9. Los perros, al igual que los humanos, pueden ser diestros o zurdos:",
        options: ["Verdadero", "Falso", "No me digas"],
        answer: 0
    },
    {
        question: "10. Existe la posibilidad de que los perros sufran depresión si no se les da la suficiente atención y cuidados:",
        options: ["Verdadero", "Quizás", "Falso"],
        answer: 0
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
});

function initCarousels() {
    const carousel1 = document.getElementById('carousel1');
    const carousel2 = document.getElementById('carousel2');
    
    images1.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.alt = `Adoption center ${index + 1}`;
        imgElement.className = 'w-full h-100 object-cover flex-shrink-0';
        imgElement.style.width = '100%';
        carousel1.appendChild(imgElement);
    });
    
    images2.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.alt = `Shelter animal ${index + 1}`;
        imgElement.className = 'w-full h-100 object-cover flex-shrink-0';
        imgElement.style.width = '100%';
        carousel2.appendChild(imgElement);
    });
    
    updateCarouselPosition(1);
    updateCarouselPosition(2);
}

function updateCarouselPosition(carouselNum) {
    const carousel = document.getElementById(`carousel${carouselNum}`);
    const slideCount = carouselNum === 1 ? 10 : 5;
    const currentSlide = carouselNum === 1 ? currentSlide1 : currentSlide2;
    
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    const prevBtn = document.getElementById(`prev${carouselNum}`);
    const nextBtn = document.getElementById(`next${carouselNum}`);
    
    if (currentSlide === 0) {
        prevBtn.classList.add('opacity-50');
        prevBtn.disabled = true;
    } else {
        prevBtn.classList.remove('opacity-50');
        prevBtn.disabled = false;
    }
    
    if (currentSlide === slideCount - 1) {
        nextBtn.classList.add('opacity-50');
        nextBtn.disabled = true;
    } else {
        nextBtn.classList.remove('opacity-50');
        nextBtn.disabled = false;
    }
}

function initQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    
    quizQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'mb-8 p-4 bg-gray-50 rounded-lg';
        
        const questionText = document.createElement('h3');
        questionText.className = 'text-lg font-semibold text-gray-800 mb-3';
        questionText.textContent = question.question;
        
        questionDiv.appendChild(questionText);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'space-y-2';
        
        question.options.forEach((option, optIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'flex items-center';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question${index}`;
            radio.id = `q${index}o${optIndex}`;
            radio.value = optIndex;
            radio.className = 'mr-2';
            
            const label = document.createElement('label');
            label.htmlFor = `q${index}o${optIndex}`;
            label.className = 'text-gray-700';
            label.textContent = option;
            
            optionDiv.appendChild(radio);
            optionDiv.appendChild(label);
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(optionsDiv);
        quizContainer.appendChild(questionDiv);
    });
}

function calculateScore() {
    let score = 0;
    
    quizQuestions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        
        if (selectedOption && parseInt(selectedOption.value) === question.answer) {
            score++;
        }
    });
    
    return score;
}

function showResults(score) {
    const resultsDiv = document.getElementById('quizResults');
    const scoreText = document.getElementById('scoreText');
    const messageText = document.getElementById('resultMessage');
    
    scoreText.innerHTML = `Tu puntuación es de <span class="font-bold">${score}</span>/10!`;
    
    if (score >= 6) {
        messageText.textContent = "¡Felicidades! Se te dan muy bien estos juegos. Creo que estás listo para adoptar una mascota. Si no te sientes preparado aún igual quédate porque planeo convencerte. ";
    } else {
        messageText.textContent = "No te preocupes. Esta es tu oportunidad para aprender más sobre el bienestar animal. Quédate a ver este reportaje para descubrirlo.";
    }
    
    resultsDiv.classList.remove('hidden');
}

function showSection(section) {
    
    section.classList.remove('hidden-section');
    section.style.display = 'block';
    
    section.classList.add('fade-in');
    
    navLinks.forEach(link => {
        link.classList.remove('active-nav');
    });   
}

function hideSection(section) {
    section.classList.add('hidden-section')
    section.style.display = 'none';
}

yesAdoptBtn.addEventListener('click', () => {
    hideSection(noAdoptionSection)
    showSection(yesAdoptionSection);
});

noAdoptBtn.addEventListener('click', () => {
    hideSection(yesAdoptionSection)
    showSection(noAdoptionSection);
});

document.getElementById('prev1').addEventListener('click', () => {
    if (currentSlide1 > 0) {
        currentSlide1--;
        updateCarouselPosition(1);
    }
});

document.getElementById('next1').addEventListener('click', () => {
    if (currentSlide1 < images1.length - 1) {
        currentSlide1++;
        updateCarouselPosition(1);
    }
});

document.getElementById('prev2').addEventListener('click', () => {
    if (currentSlide2 > 0) {
        currentSlide2--;
        updateCarouselPosition(2);
    }
});

document.getElementById('next2').addEventListener('click', () => {
    if (currentSlide2 < images2.length - 1) {
        currentSlide2++;
        updateCarouselPosition(2);
    }
});

document.getElementById('submitQuiz').addEventListener('click', () => {
    const score = calculateScore();
    showResults(score);
    document.getElementById('quizResults').scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
    initCarousels();
    initQuiz();
    document.querySelectorAll('.hidden-section').forEach(section => {
        section.style.display = 'none';
    });
});