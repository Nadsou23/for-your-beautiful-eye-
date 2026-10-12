
/* ================================= */
/* EYE INVESTIGATION PROTOCOL */
/* ================================= */

/* ============================= */
/* QUESTIONS */
/* ============================= */

const questions = [
    {
        question: "Que se passe-t-il quand ces yeux me regardent ?",
        category: "ANALYSE VISUELLE",
        answers: [
            "Mon cerveau fonctionne normalement",
            "Oups... Erreur système",
            "Je fixe un point au mur pour sauver ma dignité",
            "RIEN"
        ],
        correct: 1,
        letter: "A"
    },
    {
        question: "Combien de temps puis-je regarder ces yeux sans sourire ?",
        category: "TEST DE RÉSISTANCE",
        answers: [
            "10 secondes",
            "30 secondes avec un peu de volonté",
            "Environ 2 minutes si je pense à mon bout de sandwich que j'aurais dû finir en 2016",
            "Impossible à déterminer, je n'existe plus. Je suis déjà une soupe de Nada, ramassable à la cuillère."
        ],
        correct: 3,
        letter: "M"
    },
    {
        question: "Selon les analyses, ces yeux sont...",
        category: "DIAGNOSTIC",
        answers: [
            "Normaux",
            "Bof hh",
            "JOLIS",
            "Problématiquement MIAWgnifiques"
        ],
        correct: 3,
        letter: "O"
    },
    {
        question: "Quelle est la réaction scientifique, biologique et intergalactique face à un regard comme celui-ci ?",
        category: "PROTOCOLE DE SÉCURITÉ",
        answers: [
            "Rester concentrado",
            "M'asseoir et prendre des notes",
            "Éviter tout contact visuel avec ce BG",
            "J'abandonne, j'en peux plus !"
        ],
        correct: 3,
        letter: "U"
    },
    {
        question: "Après plusieurs heures d'analyse, quelle conclusion est la plus probable ?",
        category: "CONCLUSION",
        answers: [
            "Les données sont insuffisantes, je ne peux rien en déduire",
            "Il existe une anomalie, mais c'est quoi ?",
            "Le phénomène est inexplicable",
            "MIIIIIIIIIAAAAAAAAAAAAWWWWW, ces yeux sont à moi !"
        ],
        correct: 3,
        letter: "R"
    },
    {
        question: "Dernière question. Pourquoi cette enquête existe-t-elle ?",
        category: "QUESTION FINALE",
        answers: [
            "Pour la science",
            "Pour obtenir des données",
            "Pour tester une hypothèse",
            "Pour ces beaux yeux (et bien sûr pour les manger après... hihi)"
        ],
        correct: 3,
        letter: "<3"
    }
];


/* ============================= */
/* VARIABLES */
/* ============================= */

let currentQuestion = 0;
let collectedLetters = [];
let score = 0;

let scanInterval = null;
let decryptInterval = null;
let transitionTimeout = null;


/* ============================= */
/* OUTIL : ANNULER LES TIMERS */
/* ============================= */

function clearTimers() {
    if (scanInterval !== null) {
        clearInterval(scanInterval);
        scanInterval = null;
    }

    if (decryptInterval !== null) {
        clearInterval(decryptInterval);
        decryptInterval = null;
    }

    if (transitionTimeout !== null) {
        clearTimeout(transitionTimeout);
        transitionTimeout = null;
    }
}


/* ============================= */
/* CHANGER D'ÉCRAN */
/* ============================= */

function showScreen(id) {
    const target = document.getElementById(id);

    if (!target) {
        console.error(`Écran introuvable : #${id}`);
        return;
    }

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    target.classList.add("active");
}


/* ============================= */
/* COMMENCER L'ENQUÊTE */
/* ============================= */

function startInvestigation() {
    clearTimers();

    currentQuestion = 0;
    collectedLetters = Array(questions.length).fill(null);
    score = 0;

    const bar = document.getElementById("progressBar");
    const percentage = document.getElementById("percentage");
    const scanText = document.getElementById("scanText");

    if (!bar || !percentage || !scanText) {
        console.error("Éléments du scan manquants dans le HTML.");
        return;
    }

    bar.style.width = "0%";
    percentage.textContent = "0%";
    scanText.textContent = "Initialisation du protocole...";

    showScreen("scan");
    startScan();
}


/* ============================= */
/* SCAN */
/* ============================= */

function startScan() {
    let progress = 0;

    const bar = document.getElementById("progressBar");
    const percentage = document.getElementById("percentage");
    const scanText = document.getElementById("scanText");

    const messages = [
        "Connexion au système...",
        "Recherche du sujet...",
        "Analyse des données visuelles...",
        "Mesure du niveau de danger...",
        "Détection d'anomalies...",
        "Résultat : beaucoup trop mignon.",
        "Préparation du questionnaire..."
    ];

    scanInterval = setInterval(() => {
        progress = Math.min(progress + 1, 100);

        bar.style.width = `${progress}%`;
        percentage.textContent = `${progress}%`;

        if (progress % 15 === 0 || progress === 100) {
            const index = Math.min(
                Math.floor(progress / 15),
                messages.length - 1
            );

            scanText.textContent = messages[index];
        }

        if (progress >= 100) {
            clearInterval(scanInterval);
            scanInterval = null;

            transitionTimeout = setTimeout(() => {
                transitionTimeout = null;
                loadQuestion();
                showScreen("quiz");
            }, 700);
        }
    }, 35);
}


/* ============================= */
/* CHARGER UNE QUESTION */
/* ============================= */

function loadQuestion() {
    const q = questions[currentQuestion];

    if (!q) {
        showScreen("decrypt");
        decryptWord();
        return;
    }

    document.getElementById("questionNumber").textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;

    document.getElementById("score").textContent =
        `DATA : ${score}`;

    document.getElementById("question").textContent = q.question;

    document.querySelector(".question-category").textContent =
        q.category;

    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.classList.add("answer");
        button.textContent = answer;

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answersContainer.appendChild(button);
    });

    updateLetters();
}


/* ============================= */
/* SÉLECTIONNER UNE RÉPONSE */
/* ============================= */

function selectAnswer(index, element) {
    const q = questions[currentQuestion];

    if (!q || element.disabled) {
        return;
    }

    const allAnswers = document.querySelectorAll(".answer");

    allAnswers.forEach(answer => {
        answer.disabled = true;
        answer.style.pointerEvents = "none";
    });

    if (index === q.correct) {
        element.classList.add("correct");

        score += 1;

        // Chaque lettre reste liée à sa question.
        collectedLetters[currentQuestion] = q.letter;

        updateLetters();
    } else {
        element.classList.add("wrong");

        allAnswers[q.correct].classList.add("correct");
    }

    document.getElementById("score").textContent =
        `DATA : ${score}`;

    transitionTimeout = setTimeout(() => {
        transitionTimeout = null;
        currentQuestion++;

        if (currentQuestion >= questions.length) {
            showScreen("decrypt");
            decryptWord();
        } else {
            loadQuestion();
        }
    }, 900);
}


/* ============================= */
/* AFFICHER LES LETTRES */
/* ============================= */

function updateLetters() {
    const lettersElement = document.getElementById("letters");

    if (!lettersElement) {
        return;
    }

    lettersElement.textContent = questions
        .map((q, index) => collectedLetters[index] || "_")
        .join(" ");
}


/* ============================= */
/* DÉCRYPTAGE */
/* ============================= */

function decryptWord() {
    if (decryptInterval !== null) {
        clearInterval(decryptInterval);
    }

    const stream = document.getElementById("dataStream");

    if (!stream) {
        console.error("Élément #dataStream introuvable dans le HTML.");
        showScreen("final");
        return;
    }

    let counter = 0;

    stream.textContent = "INITIALISATION DU DÉCRYPTAGE...";

    decryptInterval = setInterval(() => {
        counter++;

        stream.textContent = generateRandomBinary();

        if (counter >= 20) {
            clearInterval(decryptInterval);
            decryptInterval = null;

            // AMOUR en code binaire ASCII.
            stream.textContent =
                "01000001 01001101 01001111 01010101 01010010";

            transitionTimeout = setTimeout(() => {
                transitionTimeout = null;
                showScreen("final");
            }, 1000);
        }
    }, 100);
}


/* ============================= */
/* GÉNÉRER DU BINAIRE ALÉATOIRE */
/* ============================= */

function generateRandomBinary() {
    return Array.from({ length: 5 }, () => {
        return Math.floor(Math.random() * 256)
            .toString(2)
            .padStart(8, "0");
    }).join(" ");
}


/* ============================= */
/* RECOMMENCER */
/* ============================= */

function restart() {
    clearTimers();

    currentQuestion = 0;
    collectedLetters = Array(questions.length).fill(null);
    score = 0;

    const bar = document.getElementById("progressBar");
    const percentage = document.getElementById("percentage");
    const scanText = document.getElementById("scanText");
    const stream = document.getElementById("dataStream");

    if (bar) bar.style.width = "0%";
    if (percentage) percentage.textContent = "0%";

    if (scanText) {
        scanText.textContent = "Initialisation du protocole...";
    }

    if (stream) {
        stream.textContent = "";
    }

    updateLetters();
    showScreen("home");
}
