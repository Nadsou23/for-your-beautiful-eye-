// ==========================================
// PROTOCOLE D'INVESTIGATION — TES BEAUX YEUX
// ==========================================

const ecrans = document.querySelectorAll(".ecran");

function afficherEcran(id) {
  ecrans.forEach((ecran) => {
    ecran.classList.remove("actif");
  });

  document.getElementById(id).classList.add("actif");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ==========================================
// QUESTIONS DU QUIZ
// Les cinq premières lettres forment AMOUR.
// La sixième question ne donne aucune lettre.
// ==========================================

const questions = [
  {
    categorie: "ANALYSE DU REGARD",
    texte: "Quel est le principal indice qui a déclenché cette enquête ?",
    reponses: [
      "Un mystérieux message",
      "Des yeux beaucoup trop beaux",
      "Une anomalie informatique"
    ],
    correcte: 1,
    lettre: "A",
    retour: "Indice confirmé : ce regard est suspect."
  },
  {
    categorie: "OBSERVATION",
    texte: "Que se passe-t-il lorsqu'un regard croise ces yeux ?",
    reponses: [
      "Le système reste parfaitement normal",
      "Une panne de connexion",
      "Une perte momentanée de concentration"
    ],
    correcte: 2,
    lettre: "M",
    retour: "Observation validée : concentration compromise."
  },
  {
    categorie: "ANALYSE SCIENTIFIQUE",
    texte: "Quelle est l'explication la plus probable ?",
    reponses: [
      "Un phénomène totalement banal",
      "Un effet visuel sans importance",
      "Un charme difficile à expliquer"
    ],
    correcte: 2,
    lettre: "O",
    retour: "Hypothèse retenue : charme hors du commun."
  },
  {
    categorie: "INTERROGATOIRE",
    texte: "Quel est le niveau de danger de ce regard ?",
    reponses: [
      "Faible",
      "Modéré",
      "Critique pour les cœurs sensibles"
    ],
    correcte: 2,
    lettre: "U",
    retour: "Alerte confirmée : risque élevé pour les cœurs."
  },
  {
    categorie: "CONCLUSION INTERMÉDIAIRE",
    texte: "Quelle mesure faut-il prendre face à une telle découverte ?",
    reponses: [
      "Clore immédiatement le dossier",
      "Continuer l'enquête malgré les risques",
      "Faire comme si de rien n'était"
    ],
    correcte: 1,
    lettre: "R",
    retour: "Dernière lettre récupérée. Décryptage imminent."
  },
  {
    categorie: "QUESTION FINALE",
    texte: "Peut-on vraiment considérer cette enquête comme objective ?",
    reponses: [
      "Oui, l'analyse est totalement neutre",
      "Non, l'enquêteur semble déjà conquis",
      "Le système refuse de répondre"
    ],
    correcte: 1,
    lettre: null,
    retour: "Biais détecté : l'enquête est devenue personnelle."
  }
];

let indexQuestion = 0;
let lettresTrouvees = [];

const boutonDemarrer = document.getElementById("bouton-demarrer");
const boutonDecrypter = document.getElementById("bouton-decrypter");
const boutonSuite = document.getElementById("bouton-suite");
const boutonRecommencer = document.getElementById("bouton-recommencer");

const zoneQuestion = document.getElementById("question");
const zoneReponses = document.getElementById("reponses");
const zoneRetour = document.getElementById("retour-reponse");

const numeroQuestion = document.getElementById("numero-question");
const categorieQuestion = document.getElementById("categorie-question");
const progressionQuiz = document.getElementById("progression-quiz");


// ==========================================
// DÉMARRAGE ET ANALYSE
// ==========================================

boutonDemarrer.addEventListener("click", lancerAnalyse);

function lancerAnalyse() {
  afficherEcran("analyse");

  const progression = document.getElementById("progression-analyse");
  const pourcentage = document.getElementById("pourcentage");
  const texteAnalyse = document.getElementById("texte-analyse");

  const etapes = [
    "Initialisation du protocole...",
    "Recherche des indices visuels...",
    "Analyse du niveau de charme...",
    "Anomalie confirmée.",
    "Préparation de l'interrogatoire..."
  ];

  let valeur = 0;

  progression.style.width = "0%";
  pourcentage.textContent = "0 %";

  const intervalle = setInterval(() => {
    valeur += 2;

    if (valeur > 100) {
      valeur = 100;
    }

    progression.style.width = valeur + "%";
    pourcentage.textContent = valeur + " %";

    const indexEtape = Math.min(
      Math.floor(valeur / 22),
      etapes.length - 1
    );

    texteAnalyse.textContent = etapes[indexEtape];

    if (valeur >= 100) {
      clearInterval(intervalle);

      setTimeout(() => {
        indexQuestion = 0;
        lettresTrouvees = [];
        afficherQuestion();
        afficherEcran("quiz");
      }, 650);
    }
  }, 45);
}


// ==========================================
// AFFICHAGE DES QUESTIONS
// ==========================================

function afficherQuestion() {
  const questionActuelle = questions[indexQuestion];

  numeroQuestion.textContent =
    `QUESTION ${String(indexQuestion + 1).padStart(2, "0")} / ${questions.length}`;

  categorieQuestion.textContent = questionActuelle.categorie;

  zoneQuestion.textContent = questionActuelle.texte;
  zoneReponses.innerHTML = "";
  zoneRetour.textContent = "";

  progressionQuiz.style.width =
    `${(indexQuestion / questions.length) * 100}%`;

  questionActuelle.reponses.forEach((reponse, index) => {
    const bouton = document.createElement("button");

    bouton.className = "reponse";
    bouton.textContent = reponse;

    bouton.addEventListener("click", () => {
      verifierReponse(index, bouton);
    });

    zoneReponses.appendChild(bouton);
  });
}


// ==========================================
// VÉRIFICATION DES RÉPONSES
// Une mauvaise réponse ne fait pas avancer.
// Chaque lettre est liée à sa question.
// ==========================================

function verifierReponse(indexReponse, boutonClique) {
  const questionActuelle = questions[indexQuestion];
  const boutons = zoneReponses.querySelectorAll(".reponse");

  if (indexReponse !== questionActuelle.correcte) {
    boutonClique.classList.add("incorrecte");
    zoneRetour.textContent =
      "❌ Indice insuffisant. Réessaie, l'enquête continue.";

    return;
  }

  boutons.forEach((bouton) => {
    bouton.disabled = true;
  });

  boutonClique.classList.add("correcte");

  zoneRetour.textContent = "✓ " + questionActuelle.retour;

  // On ne récupère une lettre que si la question en possède une.
  // La sixième question a lettre: null, donc aucun E supplémentaire.
  if (questionActuelle.lettre !== null) {
    lettresTrouvees[indexQuestion] = questionActuelle.lettre;
  }

  progressionQuiz.style.width =
    `${((indexQuestion + 1) / questions.length) * 100}%`;

  setTimeout(() => {
    indexQuestion++;

    if (indexQuestion < questions.length) {
      afficherQuestion();
    } else {
      afficherEcranDecryptage();
    }
  }, 1100);
}


// ==========================================
// DÉCRYPTAGE : LE MOT EST TOUJOURS AMOUR
// ==========================================

function afficherEcranDecryptage() {
  afficherEcran("decryptage");

  // Correction du problème : le mot contient exactement 5 lettres.
  document.getElementById("mot-cache").textContent = "_ _ _ _ _";

  document.getElementById("message-decryptage").textContent = "";

  boutonDecrypter.hidden = false;
  boutonSuite.hidden = true;
}

boutonDecrypter.addEventListener("click", () => {
  const motFinal = lettresTrouvees.join("");

  // Vérification de sécurité : les lettres doivent former AMOUR.
  if (motFinal !== "AMOUR") {
    document.getElementById("mot-cache").textContent = "A M O U R";
  } else {
    document.getElementById("mot-cache").textContent =
      lettresTrouvees.join(" ");
  }

  document.getElementById("message-decryptage").textContent =
    "Décryptage réussi. Le dossier révèle enfin son secret. ♥";

  boutonDecrypter.hidden = true;
  boutonSuite.hidden = false;
});

boutonSuite.addEventListener("click", () => {
  afficherEcran("final");
});


// ==========================================
// EASTER EGG : CLIQUER 7 FOIS SUR LE CŒUR
// ==========================================

const coeurSecret = document.getElementById("coeur-secret");
const messageSecret = document.getElementById("message-secret");

let nombreClics = 0;

coeurSecret.addEventListener("click", () => {
  nombreClics++;

  if (nombreClics < 7) {
    coeurSecret.textContent = nombreClics % 2 === 0 ? "♡" : "♥";
    return;
  }

  messageSecret.hidden = false;
  coeurSecret.textContent = "♥";
  coeurSecret.disabled = true;
  coeurSecret.setAttribute("aria-label", "Secret découvert");

  messageSecret.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});


// ==========================================
// RECOMMENCER L'ENQUÊTE
// ==========================================

boutonRecommencer.addEventListener("click", () => {
  indexQuestion = 0;
  lettresTrouvees = [];

  lancerAnalyse();
});
