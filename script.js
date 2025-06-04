// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Country data for the politics section
const countryData = {
    "United States": {
        title: "United States Animal Welfare Policies",
        content: `<p>The US has a decentralized approach to animal welfare with federal, state, and local laws. The Animal Welfare Act (1966) sets minimum standards for treatment of animals in research, exhibition, transport, and by dealers. However, farm animals are largely excluded from federal protections.</p>
        <p class="mt-4">Key features:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>No federal law against cruelty to farm animals</li>
            <li>Varies significantly by state - some have felony penalties for cruelty</li>
            <li>Growing number of state bans on puppy mills and cosmetic testing</li>
            <li>USDA oversees animal welfare but enforcement is often criticized</li>
        </ul>`
    },
    "United Kingdom": {
        title: "UK Animal Welfare Policies",
        content: `<p>The UK has some of the world's strongest animal welfare laws, with the Animal Welfare Act 2006 as the cornerstone legislation. It introduced the concept of "duty of care" for pet owners and animal keepers.</p>
        <p class="mt-4">Notable achievements:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>First country to pass animal protection law (1822)</li>
            <li>Banned cosmetic testing on animals (1998)</li>
            <li>Prohibited wild animals in circuses (2020)</li>
            <li>Recognizes animal sentience in law (2022)</li>
        </ul>`
    },
    "Germany": {
        title: "Germany Animal Welfare Policies",
        content: `<p>Germany has comprehensive animal welfare laws with constitutional protection. Article 20a of the Basic Law states that the state must protect animals as part of its responsibility to future generations.</p>
        <p class="mt-4">Key aspects:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Animal Welfare Act prohibits causing pain, suffering or harm</li>
            <li>Mandatory animal welfare education in schools</li>
            <li>Strict regulations on farm animal conditions</li>
            <li>Ban on fur farming (2019)</li>
        </ul>`
    },
    "Cuba": {
        title: "Cuba Animal Welfare Policies",
        content: `<p>Cuba has limited specific animal welfare legislation, but general protections exist under Decree-Law No. 136 on Veterinary Medicine and Decree No. 160 on the Protection of Animals. Enforcement remains a challenge due to economic constraints.</p>
        <p class="mt-4">Current situation:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>No comprehensive animal protection law</li>
            <li>Some municipal regulations address stray animals</li>
            <li>Growing animal rights movement pushing for reform</li>
            <li>Limited resources for animal shelters and care</li>
        </ul>
        <p class="mt-4">In 2021, Cuba's first animal welfare bill was proposed but has not yet been passed into law. The proposed legislation would criminalize animal abuse and establish protections for domestic and wild animals.</p>`
    },
    "India": {
        title: "India Animal Welfare Policies",
        content: `<p>India's animal welfare framework is based on the Prevention of Cruelty to Animals Act (1960) which established the Animal Welfare Board. The Constitution includes a fundamental duty to "have compassion for living creatures."</p>
        <p class="mt-4">Notable features:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Ban on animal testing for cosmetics (2014)</li>
            <li>Prohibition of dolphinariums (2013)</li>
            <li>Some states ban beef consumption</li>
            <li>Sacred status of cows influences policy</li>
        </ul>`
    },
    "Australia": {
        title: "Australia Animal Welfare Policies",
        content: `<p>Australia has a mix of state/territory and national animal welfare laws. The Australian Animal Welfare Strategy provides a national framework, but implementation varies significantly between jurisdictions.</p>
        <p class="mt-4">Key points:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Each state has its own Prevention of Cruelty to Animals Act</li>
            <li>National standards for livestock welfare</li>
            <li>Kangaroo culling remains controversial</li>
            <li>Growing movement to recognize animal sentience</li>
        </ul>`
    }
};

// Default content for other countries
const defaultContent = {
    title: "Animal Welfare Policies",
    content: `<p>We're currently gathering detailed information about animal welfare policies in this country. Check back soon for updates or select another country to learn about its animal protection laws.</p>
    <p class="mt-4">In general, animal welfare policies vary widely around the world, with some nations having comprehensive protections while others have minimal legislation. Factors influencing animal welfare laws include cultural attitudes, economic development, and historical traditions.</p>`
};

// Initialize globe
function initGlobe() {
    const container = document.getElementById('globeViz');
    
    const globe = Globe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundColor('rgba(0,0,0,0)')
        .showAtmosphere(true)
        .atmosphereColor('rgba(200, 200, 255, 0.2)')
        .atmosphereAltitude(0.25)
        (container);
    
    // Auto-rotation
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;
    
    // Highlight countries with data
    const countries = Object.keys(countryData);
    const arcsData = countries.map(country => ({
        startLat: 0,
        startLng: 0,
        endLat: 0,
        endLng: 0,
        color: ['rgba(0, 100, 255, 0.5)', 'rgba(0, 100, 255, 0.5)']
    }));
    
    globe
        .arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(0.5)
        .arcDashGap(1)
        .arcDashAnimateTime(2000)
        .arcsTransitionDuration(0);
    
    // Country selection
    document.getElementById('countrySelect').addEventListener('change', function(e) {
        const country = e.target.value;
        if (country) {
            // Stop auto-rotation
            globe.controls().autoRotate = false;
            
            // Look up country data
            const data = countryData[country] || defaultContent;
            
            // Display info
            const infoContainer = document.getElementById('politicsInfo');
            infoContainer.innerHTML = `
                <h3 class="text-2xl font-semibold text-blue-700 mb-4">${data.title}</h3>
                ${data.content}
            `;
            
            // Highlight country on globe
            globe.hexBinPointWeight(() => 0); // Reset
            
            // In a real implementation, you would use actual coordinates
            // This is a simplified version for demonstration
            setTimeout(() => {
                globe.pointOfView({ lat: 20, lng: 0 }, 2000);
            }, 500);
        }
    });
}

// Quiz questions
const quizQuestions = [
    {
        question: "Which country was the first to pass animal protection laws?",
        options: ["United States", "United Kingdom", "France", "Germany"],
        answer: 1
    },
    {
        question: "What is the main federal law governing animal welfare in the US?",
        options: [
            "Animal Protection Act",
            "Animal Welfare Act",
            "Humane Treatment of Animals Act",
            "Pet Safety Law"
        ],
        answer: 1
    },
    {
        question: "Which of these animals is NOT typically covered by the US Animal Welfare Act?",
        options: [
            "Dogs in research facilities",
            "Chickens on factory farms",
            "Zoo elephants",
            "Circus tigers"
        ],
        answer: 1
    },
    {
        question: "What unique feature does Germany's constitution include regarding animals?",
        options: [
            "Right to legal representation for animals",
            "State must protect animals for future generations",
            "Animals can own property",
            "Animals have voting rights"
        ],
        answer: 1
    },
    {
        question: "Which country has proposed but not yet passed its first animal welfare bill?",
        options: ["Cuba", "Brazil", "India", "Australia"],
        answer: 0
    },
    {
        question: "What is a common criticism of animal welfare enforcement in many countries?",
        options: [
            "Lack of funding and resources",
            "Too many laws",
            "Animals have too many rights",
            "Veterinarians oppose protections"
        ],
        answer: 0
    },
    {
        question: "Which of these practices has the UK banned?",
        options: [
            "All animal testing",
            "Wild animals in circuses",
            "Pet ownership",
            "Veganism"
        ],
        answer: 1
    },
    {
        question: "What cultural factor significantly influences India's animal welfare policies?",
        options: [
            "Sacred status of cows",
            "Ancient Greek philosophy",
            "Industrial revolution",
            "Space exploration"
        ],
        answer: 0
    },
    {
        question: "What concept did the UK's Animal Welfare Act 2006 introduce?",
        options: [
            "Duty of care for pet owners",
            "Animal voting rights",
            "Mandatory pet insurance",
            "Animal tax credits"
        ],
        answer: 0
    },
    {
        question: "Which country has constitutional protection for animals?",
        options: ["United States", "Germany", "Australia", "Canada"],
        answer: 1
    }
];

// Quiz functionality
let currentQuestion = 0;
let score = 0;

function displayQuestion() {
    const quizContainer = document.getElementById('quizContainer');
    const question = quizQuestions[currentQuestion];
    
    let optionsHtml = '';
    question.options.forEach((option, index) => {
        optionsHtml += `
            <div class="quiz-option border rounded-lg p-4 mb-3 cursor-pointer transition" data-index="${index}">
                ${option}
            </div>
        `;
    });
    
    quizContainer.innerHTML = `
        <div class="mb-6">
            <h4 class="text-lg font-semibold mb-2">Question ${currentQuestion + 1} of ${quizQuestions.length}</h4>
            <p class="text-xl font-medium mb-4">${question.question}</p>
            <div class="options-container">
                ${optionsHtml}
            </div>
        </div>
        <div class="flex justify-between">
            ${currentQuestion > 0 ? `<button id="prevQuestion" class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">Previous</button>` : `<div></div>`}
            ${currentQuestion < quizQuestions.length - 1 ? `<button id="nextQuestion" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" disabled>Next</button>` : `<button id="submitQuiz" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" disabled>Submit Quiz</button>`}
        </div>
    `;
    
    // Add event listeners to options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('border-blue-500', 'bg-blue-50');
            });
            
            // Add selected class to clicked option
            this.classList.add('border-blue-500', 'bg-blue-50');
            
            // Enable next button
            const nextBtn = document.getElementById('nextQuestion');
            const submitBtn = document.getElementById('submitQuiz');
            if (nextBtn) nextBtn.disabled = false;
            if (submitBtn) submitBtn.disabled = false;
        });
    });
    
    // Previous button
    if (currentQuestion > 0) {
        document.getElementById('prevQuestion').addEventListener('click', function() {
            currentQuestion--;
            displayQuestion();
        });
    }
    
    // Next button
    if (currentQuestion < quizQuestions.length - 1) {
        document.getElementById('nextQuestion').addEventListener('click', function() {
            currentQuestion++;
            displayQuestion();
        });
    }
    
    // Submit button
    if (currentQuestion === quizQuestions.length - 1) {
        document.getElementById('submitQuiz').addEventListener('click', showResults);
    }
}

function showResults() {
    // Calculate score (simplified for this demo)
    // In a real implementation, you would track user answers
    const quizContainer = document.getElementById('quizContainer');
    const quizResults = document.getElementById('quizResults');
    const finalScore = document.getElementById('finalScore');
    const resultMessage = document.getElementById('resultMessage');
    
    // For demo purposes, we'll use a random score
    score = Math.floor(Math.random() * 11); // Random score 0-10
    finalScore.textContent = score;
    
    if (score >= 8) {
        resultMessage.textContent = "Excellent! You're very knowledgeable about animal welfare policies.";
    } else if (score >= 5) {
        resultMessage.textContent = "Good job! You know quite a bit about animal welfare around the world.";
    } else {
        resultMessage.textContent = "Keep learning! Check out our Global Politics section to improve your knowledge.";
    }
    
    quizContainer.classList.add('hidden');
    quizResults.classList.remove('hidden');
    
    // Update score display
    document.getElementById('scoreValue').textContent = score;
}

document.getElementById('retryQuiz').addEventListener('click', function() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quizContainer').classList.remove('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('scoreValue').textContent = '0';
    displayQuestion();
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initGlobe();
    displayQuestion();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
});