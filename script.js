
"use strict";

/* =====================================================
   CONFIGURATION
   Modifie ici le mot secret et le texte de la déclaration.
   Les lettres gagnées par le quiz doivent correspondre
   aux lettres du mot secret, dans le même ordre.
   ===================================================== */

const SECRET_WORD = "AMOUR";

const LOVE_MESSAGE = (name) =>
  `Tu sais, ${name}, il y a quelque chose chez toi que je trouve vraiment fascinant : tes yeux.

  Je ne sais pas si tu réalises l'effet qu'ils peuvent avoir, mais ils ont ce petit quelque chose qui attire mon attention et qui rend difficile le fait de regarder ailleurs.

  Alors, après cette longue enquête, mon verdict est officiel : tes yeux sont bien trop beaux pour passer inaperçus. Et si j'ai créé tout ce protocole, c'est simplement parce que certaines choses méritent d'être dites d'une façon un peu spéciale.

  Fin du rapport. Mais certainement pas de la fascination. ♥`;

/*
  Chaque question récompense une lettre précise.
  Pour garder le mot AMOUR cohérent, ne change pas les
  lettres de récompense sans adapter le mot et les questions.
*/
const QUESTIONS = [
  {
    letter: "A",
    question: "Quel est le premier réflexe quand un regard attire vraiment l'attention ?",
    answers: [
      "Faire semblant de ne rien avoir remarqué",
      "Avoir envie de le regarder encore",
      "Regarder immédiatement ailleurs"
    ],
    correct: 1,
    success: "Analyse validée. Ce regard mérite clairement une deuxième observation."
  },
  {
    letter: "M",
    question: "Quel est le meilleur mot pour décrire des yeux qui restent en mémoire ?",
    answers: [
      "Ordinaires",
      "Inoubliables",
      "Discrets"
    ],
    correct: 1,
    success: "Réponse acceptée. Le dossier confirme une fascination persistante."
  },
  {
    letter: "O",
    question: "Si ses yeux pouvaient transmettre un message, lequel serait le plus probable ?",
    answers: [
      "Regarde ailleurs",
      "Rien à signaler",
      "Observe encore un peu"
    ],
    correct: 2,
    success: "Signal détecté. Le regard du sujet semble difficile à ignorer."
  },
  {
    letter: "U",
    question: "Quel est le risque principal d'un regard aussi captivant ?",
    answers: [
      "Oublier ce qu'on voulait dire",
      "Terminer l'enquête trop vite",
      "Ne plus jamais regarder les étoiles"
    ],
    correct: 0,
    success: "Alerte confirmée : perte momentanée de concentration."
  },
  {
    letter: "R",
    question: "Quelle est la conclusion scientifique de cette enquête ?",
    answers: [
      "Le sujet est parfaitement ordinaire",
      "Les preuves sont insuffisantes",
      "Ces yeux méritent une déclaration"
    ],
    correct: 2,
    success: "Conclusion validée. Le rapport peut être déclassifié."
  }
];

/* =====================================================
   ÉLÉMENTS DU SITE
   ===================================================== */

const screens = {
  welcome: document.getElementById("welcome-screen"),
  scan: document.getElementById("scan-screen"),
  quiz: document.getElementById("quiz-screen"),
  decrypt: document.getElementById("decrypt-screen"),
  final: document.getElementById("final-screen")
};

const identityForm = document.getElementById("identity-form");
const subjectInput = document.getElementById("subject-name");

const scanMessage = document.getElementById("scan-message");
const scanProgress = document.getElementById("scan-progress");
const scanPercent = document.getElementById("scan-percent");
const scanStatus = document.getElementById("scan-status");

const questionNumber = document.getElementById("question-number");
const questionTag = document.getElementById("question-tag");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const answerFeedback = document.getElementById("answer-feedback");
const nextButton = document.getElementById("next-question");
const quizProgress = document.getElementById("quiz-progress");
const letterSlots = document.getElementById("letter-slots");

const decryptLetters = document.getElementById("decrypt-letters");
const decryptStatus = document.getElementById("decrypt-status");
const decryptButton = document.getElementById("decrypt-button");

const finalName = document.getElementById("final-name");
const revealedWord = document.getElementById("revealed-word");
const loveMessage = document.getElementById("love-message");
const restartButton = document.getElementById("restart-button");

const glitchOverlay = document.getElementById("glitch-overlay");
const glitchClose = document.getElementById("glitch-close");
const easterEgg = document.getElementById("easter-egg");
const easterToast = document.getElementById("easter-toast");

/* =====================================================
   ÉTAT DU JEU
   ===================================================== */

let subjectName = "";
let currentQuestion = 0;
let selectedAnswer = false;
let collectedLetters = Array(QUESTIONS.length).fill(null);
let glitchAlreadyShown = false;
let secretClickCount = 0;
let secretUnlocked = false;
let scanTimer = null;
let scanStarted = false;
let decryptStarted = false;
let toastTimer = null;

/* =====================================================
   NAVIGATION ENTRE LES ÉCRANS
   ===================================================== */

function showScreen(screenToShow) {
  Object.values(screens).forEach((screen) => {
    screen.classList.remove("active");
  });

  screenToShow.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth"
  });
}

/* =====================================================
   ACCUEIL ET IDENTITÉ
   ===================================================== */

identityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredName = subjectInput.value.trim();

  if (!enteredName) {
    subjectInput.focus();
    return;
  }

  subjectName = enteredName;
  scanMessage.textContent =
    `Connexion au dossier de ${subjectName}. Préparation de l'analyse...`;

  showScreen(screens.scan);
  startScan();
});

/* =====================================================
   SCAN ANIMÉ
   ===================================================== */

function startScan() {
  if (scanTimer) {
    clearInterval(scanTimer);
  }

  scanStarted = true;

  let progress = 0;
  scanProgress.style.width = "0%";
  scanPercent.textContent = "0 %";
  scanStatus.textContent = "CONNEXION AU DOSSIER...";

  const stages = [
    { limit: 20, text: "IDENTIFICATION DU SUJET..." },
    { limit: 45, text: "ANALYSE DU REGARD..." },
    { limit: 70, text: "MESURE DU NIVEAU DE FASCINATION..." },
    { limit: 90, text: "VÉRIFICATION DES DONNÉES..." },
    { limit: 100, text: "ACCÈS AUTORISÉ ♥" }
  ];

  scanTimer = setInterval(() => {
    progress = Math.min(progress + Math.floor(Math.random() * 8) + 3, 100);

    scanProgress.style.width = `${progress}%`;
    scanPercent.textContent = `${progress} %`;

    const stage = stages.find((item) => progress <= item.limit);
    if (stage) {
      scanStatus.textContent = stage.text;
    }

    if (progress >= 100) {
      clearInterval(scanTimer);
      scanTimer = null;
      scanStarted = false;

      setTimeout(() => {
        currentQuestion = 0;
        collectedLetters = Array(QUESTIONS.length).fill(null);
        renderLetterSlots();
        loadQuestion();
        showScreen(screens.quiz);
      }, 750);
    }
  }, 180);
}

/* =====================================================
   QUIZ
   ===================================================== */

function loadQuestion() {
  selectedAnswer = false;

  const question = QUESTIONS[currentQuestion];

  questionNumber.textContent = String(currentQuestion + 1).padStart(2, "0");
  questionTag.textContent =
    `QUESTION ${String(currentQuestion + 1).padStart(2, "0")}`;
  questionText.textContent = question.question;

  answersContainer.replaceChildren();
  answerFeedback.textContent = "";
  answerFeedback.className = "feedback";

  nextButton.hidden = true;
  nextButton.textContent =
    currentQuestion === QUESTIONS.length - 1
      ? "PASSER AU DÉCRYPTAGE →"
      : "QUESTION SUIVANTE →";

  quizProgress.style.width =
    `${(currentQuestion / QUESTIONS.length) * 100}%`;

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";

    const key = document.createElement("span");
    key.className = "option-key";
    key.textContent = String.fromCharCode(65 + index);

    const label = document.createElement("span");
    label.textContent = answer;

    button.append(key, label);
    button.addEventListener("click", () => checkAnswer(index, button));

    answersContainer.appendChild(button);
  });

  renderLetterSlots();
}

function checkAnswer(answerIndex, selectedButton) {
  if (selectedAnswer) return;

  const question = QUESTIONS[currentQuestion];
  const allButtons = answersContainer.querySelectorAll(".answer-option");

  if (answerIndex !== question.correct) {
    selectedButton.classList.add("wrong");

    answerFeedback.textContent =
      "Réponse incorrecte. Analyse à reprendre : essaie encore.";
    answerFeedback.className = "feedback error";

    // On laisse réessayer : aucune lettre n'est attribuée
    // tant que la bonne réponse n'a pas été sélectionnée.
    return;
  }

  selectedAnswer = true;
  selectedButton.classList.add("correct");

  allButtons.forEach((button) => {
    button.disabled = true;
  });

  // Une lettre par question, à un emplacement fixe :
  // impossible de gagner des doublons en cliquant plusieurs fois.
  collectedLetters[currentQuestion] = question.letter;

  answerFeedback.textContent = `✓ ${question.success} Lettre récupérée : ${question.letter}`;
  answerFeedback.className = "feedback success";

  quizProgress.style.width =
    `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`;

  renderLetterSlots();
  nextButton.hidden = false;
}

nextButton.addEventListener("click", () => {
  if (!selectedAnswer) return;

  // Glitch surprise après la troisième bonne réponse.
  if (currentQuestion === 2 && !glitchAlreadyShown) {
    glitchAlreadyShown = true;
    glitchOverlay.classList.add("visible");
    return;
  }

  advanceQuiz();
});

glitchClose.addEventListener("click", () => {
  glitchOverlay.classList.remove("visible");
  advanceQuiz();
});

function advanceQuiz() {
  if (currentQuestion < QUESTIONS.length - 1) {
    currentQuestion += 1;
    loadQuestion();
    return;
  }

  showDecryptScreen();
}

/* =====================================================
   AFFICHAGE DES LETTRES GAGNÉES
   ===================================================== */

function renderLetterSlots() {
  letterSlots.replaceChildren();

  QUESTIONS.forEach((question, index) => {
    const slot = document.createElement("span");
    slot.className = "letter-slot";

    if (collectedLetters[index] !== null) {
      slot.textContent = collectedLetters[index];
      slot.classList.add("earned");
    } else {
      slot.textContent = "·";
    }

    slot.setAttribute(
      "aria-label",
      collectedLetters[index]
        ? `Lettre ${collectedLetters[index]} récupérée`
        : `Lettre ${index + 1} à récupérer`
    );

    letterSlots.appendChild(slot);
  });
}

/* =====================================================
   DÉCRYPTAGE
   ===================================================== */

function showDecryptScreen() {
  const allLettersCollected = collectedLetters.every(
    (letter, index) => letter === QUESTIONS[index].letter
  );

  if (!allLettersCollected) {
    // Sécurité supplémentaire : le décryptage n'est possible
    // que si toutes les réponses ont été validées.
    currentQuestion = collectedLetters.findIndex((letter) => letter === null);
    loadQuestion();
    showScreen(screens.quiz);
    return;
  }

  decryptLetters.replaceChildren();

  collectedLetters.forEach((letter) => {
    const tile = document.createElement("span");
    tile.className = "decrypt-letter";
    tile.textContent = letter;
    decryptLetters.appendChild(tile);
  });

  decryptStatus.textContent = "> DÉCRYPTAGE EN ATTENTE";
  decryptButton.disabled = false;
  decryptButton.hidden = false;
  decryptStarted = false;

  showScreen(screens.decrypt);
}

decryptButton.addEventListener("click", () => {
  if (decryptStarted) return;
  decryptStarted = true;
  decryptButton.disabled = true;
  decryptButton.textContent = "DÉCRYPTAGE EN COURS...";

  const tiles = decryptLetters.querySelectorAll(".decrypt-letter");

  decryptStatus.textContent = "> DÉCRYPTAGE DU MESSAGE...";
  tiles.forEach((tile) => tile.classList.remove("revealed"));

  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("revealed");

      if (index === tiles.length - 1) {
        setTimeout(() => {
          decryptStatus.textContent = "> MESSAGE DÉCRYPTÉ : ACCÈS AUTORISÉ ♥";
          decryptButton.hidden = true;
          revealFinalMessage();
        }, 500);
      }
    }, index * 350);
  });
});

/* =====================================================
   RÉVÉLATION FINALE
   ===================================================== */

function revealFinalMessage() {
  revealedWord.textContent = SECRET_WORD;
  finalName.textContent = subjectName;
  loveMessage.textContent = LOVE_MESSAGE(subjectName);

  setTimeout(() => {
    showScreen(screens.final);
  }, 800);
}

/* =====================================================
   EASTER EGG : CLIQUER 7 FOIS SUR L'ŒIL
   ===================================================== */

function handleSecretClick() {
  if (secretUnlocked) return;

  secretClickCount += 1;

  if (secretClickCount >= 7) {
    secretUnlocked = true;
    easterToast.classList.add("visible");

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
      easterToast.classList.remove("visible");
    }, 5500);
  }
}

easterEgg.addEventListener("click", handleSecretClick);

easterEgg.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleSecretClick();
  }
});

/* =====================================================
   RECOMMENCER L'ENQUÊTE
   ===================================================== */

restartButton.addEventListener("click", () => {
  if (scanTimer) {
    clearInterval(scanTimer);
    scanTimer = null;
  }

  subjectName = "";
  currentQuestion = 0;
  selectedAnswer = false;
  collectedLetters = Array(QUESTIONS.length).fill(null);
  glitchAlreadyShown = false;
  scanStarted = false;
  decryptStarted = false;

  subjectInput.value = "";
  scanProgress.style.width = "0%";
  scanPercent.textContent = "0 %";
  scanStatus.textContent = "CONNEXION AU DOSSIER...";

  glitchOverlay.classList.remove("visible");
  decryptButton.disabled = false;
  decryptButton.hidden = false;
  decryptButton.textContent = "DÉCRYPTER LE MESSAGE ⌁";

  renderLetterSlots();
  showScreen(screens.welcome);
});

/* =====================================================
   CONTRÔLE DE COHÉRENCE AU CHARGEMENT
   ===================================================== */

if (
  SECRET_WORD.length !== QUESTIONS.length ||
  SECRET_WORD !== QUESTIONS.map((question) => question.letter).join("")
) {
  console.warn(
    "Le mot secret doit correspondre aux lettres des questions. " +
    "Vérifie SECRET_WORD et QUESTIONS."
  );
}
