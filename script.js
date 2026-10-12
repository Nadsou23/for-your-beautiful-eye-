/* ================================= */
/* EYE INVESTIGATION PROTOCOL */
/* ================================= */


/* ============================= */
/* QUESTIONS */
/* ============================= */

const questions = [

    {
        question:
            "Que se passe-t-il quand ces yeux me regardent ?",

        category:
            "ANALYSE VISUELLE",

        answers: [

            "Mon cerveau fonctionne normalement",

            "Oups...Erreur système",

            "Je fixe un point au mur pour sauver ma dignité",

            "RIEN"

        ],

        correct: 1,

        letter: "A"
    },


    {
        question:
            "Combien de temps puis-je regarder ces yeux sans sourire ?",

        category:
            "TEST DE RÉSISTANCE",

        answers: [

            "10 secondes",

            "30 secondes avec un peu de volonté",

            "Environ 2 minutes si je pense à mon bout d sandwich que j'aurai du fini en 2016",

            "Impossible à déterminer, je n'existe plus, je suis deja une soupe de Nada que tu peux ramasser à la cuillère"

        ],

        correct: 3,

        letter: "M"
    },


    {
        question:
            "Selon les analyses, ces yeux sont...",

        category:
            "DIAGNOSTIC",

        answers: [

            "Normaux",

            "Bof hh",

            "JOLIE",

            "Problématiquement MIAWgnifiques"

        ],

        correct: 3,

        letter: "O"
    },


    {
        question:
            "Quelle est la réaction scientifique, biologique, intergalactique face à un regard comme celui-ci ?",

        category:
            "PROTOCOLE DE SÉCURITÉ",

        answers: [

            "Rester concentrado",

            "S'assoir et prendre des notes",

            "Éviter tout contact visuel de ce BG",

            "J'abondonne, j'en peux plus!"

        ],

        correct: 3,

        letter: "U"
    },


    {
        question:
            "Après plusieurs heures d'analyse, quelle conclusion est la plus probable ?",

        category:
            "CONCLUSION",

        answers: [

            "Les données sont insuffisantes, je peux rien en déduire",

            "Il existe une anomalie, mais c'est quoi?",

            "Le phénomène est inexplicable ",

            "MIIIIIIIIIAAAAAAAAAAAAWWWWW, ces yeux sont à moi"

        ],

        correct: 3,

        letter: "R"
    },


    {
        question:
            "Dernière question. Pourquoi cette enquête existe-t-elle ?",

        category:
            "QUESTION FINALE",

        answers: [

            "Pour la science",

            "Pour obtenir des données",

            "Pour tester une hypothèse",

            "Pour ces beaux yeux (et bien sur le manger après..hihi)"

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


/* ============================= */
/* CHANGER D'ÉCRAN */
/* ============================= */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    document
        .getElementById(id)
        .classList.add("active");

}


/* ============================= */
/* COMMENCER */
/* ============================= */

function startInvestigation() {

    showScreen("scan");

    startScan();

}


/* ============================= */
/* SCAN */
/* ============================= */

function startScan() {

    let progress = 0;

    const bar =
        document.getElementById("progressBar");

    const percentage =
        document.getElementById("percentage");

    const scanText =
        document.getElementById("scanText");


    const messages = [

        "Connexion au système...",

        "Recherche du sujet...",

        "Analyse des données visuelles...",

        "Mesure du niveau de danger...",

        "Détection d'anomalies...",

        "Résultat : beaucoup trop mignon.",

        "Préparation du questionnaire..."

    ];


    const interval = setInterval(() => {

        progress += 1;

        bar.style.width =
            progress + "%";

        percentage.textContent =
            progress + "%";


        if (progress % 15 === 0) {

            const index =
                Math.min(
                    Math.floor(progress / 15),
                    messages.length - 1
                );

            scanText.textContent =
                messages[index];

        }


        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                currentQuestion = 0;

                collectedLetters = [];

                score = 0;

                loadQuestion();

                showScreen("quiz");

            }, 700);

        }

    }, 35);

}


/* ============================= */
/* CHARGER QUESTION */
/* ============================= */

function loadQuestion() {

    const q =
        questions[currentQuestion];


    document.getElementById(
        "questionNumber"
    ).textContent =

        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;


    document.getElementById(
        "score"
    ).textContent =

        `DATA: ${score}`;


    document.getElementById(
        "question"
    ).textContent = q.question;


    document.querySelector(
        ".question-category"
    ).textContent = q.category;


    const answersContainer =
        document.getElementById("answers");


    answersContainer.innerHTML = "";


    q.answers.forEach((answer, index) => {

        const button =
            document.createElement("div");


        button.classList.add("answer");


        button.textContent =
            answer;


        button.onclick = () =>
            selectAnswer(index, button);


        answersContainer.appendChild(button);

    });


    updateLetters();

}


/* ============================= */
/* RÉPONSE */
/* ============================= */

function selectAnswer(index, element) {

    const q =
        questions[currentQuestion];


    const allAnswers =
        document.querySelectorAll(".answer");


    allAnswers.forEach(answer => {

        answer.style.pointerEvents =
            "none";

    });


    if (index === q.correct) {

        element.classList.add("correct");

        score += 1;

        collectedLetters.push(q.letter);

        updateLetters();

    } else {

        element.classList.add("wrong");

        allAnswers[q.correct]
            .classList.add("correct");

    }


    setTimeout(() => {

        currentQuestion++;


        if (
            currentQuestion >=
            questions.length
        ) {

            showScreen("decrypt");

        } else {

            loadQuestion();

        }

    }, 900);

}


/* ============================= */
/* AFFICHER LETTRES */
/* ============================= */

function updateLetters() {

    let display = "";


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        if (collectedLetters[i]) {

            display +=
                collectedLetters[i] + " ";

        } else {

            display += "_ ";

        }

    }


    document.getElementById(
        "letters"
    ).textContent = display;

}


/* ============================= */
/* DÉCRYPTAGE */
/* ============================= */

function decryptWord() {

    const stream =
        document.getElementById("dataStream");


    let counter = 0;


    const interval = setInterval(() => {

        counter++;


        stream.textContent =
            generateRandomBinary();


        if (counter >= 20) {

            clearInterval(interval);

            stream.textContent =
                "01000001 01001101 01001111 01010101 01010010";

            setTimeout(() => {

                showScreen("final");

            }, 1000);

        }

    }, 100);

}


/* ============================= */
/* BINAIRE ALÉATOIRE */
/* ============================= */

function generateRandomBinary() {

    let result = "";


    for (let i = 0; i < 5; i++) {

        result +=
            Math.random()
                .toString(2)
                .substring(2, 10);

        result += " ";

    }


    return result;

}


/* ============================= */
/* RESTART */
/* ============================= */

function restart() {

    currentQuestion = 0;

    collectedLetters = [];

    score = 0;


    document.getElementById(
        "progressBar"
    ).style.width = "0%";


    document.getElementById(
        "percentage"
    ).textContent = "0%";


    document.getElementById(
        "scanText"
    ).textContent =
        "Initialisation du protocole...";


    showScreen("home");

}
