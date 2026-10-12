
:root {
  --bg: #08060d;
  --panel: rgba(19, 13, 28, 0.88);
  --pink: #ff4fc8;
  --pink-light: #ff9de5;
  --purple: #9a6bff;
  --text: #f9f2ff;
  --muted: #a59aaf;
  --line: rgba(255, 79, 200, 0.22);
  --green: #8dffcb;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  overflow-x: hidden;
  background: var(--bg);
  color: var(--text);
  font-family: "Courier New", monospace;
  display: flex;
  flex-direction: column;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

button:focus-visible,
input:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid var(--pink-light);
  outline-offset: 4px;
}

::selection {
  background: var(--pink);
  color: #100714;
}

.scanlines {
  position: fixed;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  opacity: 0.12;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 3px,
    rgba(255, 255, 255, 0.06) 4px
  );
}

.ambient {
  position: fixed;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  filter: blur(110px);
  opacity: 0.15;
  pointer-events: none;
}

.ambient-one {
  background: #d42dff;
  top: 8%;
  left: -180px;
}

.ambient-two {
  background: #ff238f;
  bottom: 0;
  right: -180px;
}

.topbar,
.footer {
  width: min(100% - 40px, 1050px);
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.topbar {
  min-height: 75px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  font-size: 11px;
  letter-spacing: 1px;
}

.brand {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  color: var(--text);
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 1.5px;
}

.brand-icon {
  color: var(--pink);
  font-size: 24px;
  text-shadow: 0 0 15px var(--pink);
}

.pink {
  color: var(--pink);
}

.status {
  color: var(--green);
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-size: 10px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 10px var(--green);
  animation: blink 1.5s infinite;
}

.main-container {
  width: min(100% - 36px, 700px);
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 45px 0 65px;
}

.screen {
  display: none;
  width: 100%;
  animation: appear 0.55s ease both;
}

.screen.active {
  display: block;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 25px;
  color: var(--pink);
  font-size: 10px;
  letter-spacing: 2px;
}

.tiny-square {
  width: 7px;
  height: 7px;
  background: var(--pink);
  box-shadow: 0 0 12px var(--pink);
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 18px;
  font-size: clamp(32px, 7vw, 58px);
  line-height: 1.08;
  letter-spacing: -2px;
}

h2 {
  font-size: clamp(27px, 5vw, 39px);
  line-height: 1.2;
  letter-spacing: -1.2px;
  margin-bottom: 12px;
}

h3 {
  font-size: clamp(19px, 4vw, 25px);
  line-height: 1.45;
}

.gradient-text {
  background: linear-gradient(105deg, #fff 0%, var(--pink-light) 45%, var(--purple) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 20px rgba(255, 79, 200, 0.12));
}

.intro {
  max-width: 550px;
  margin: 0 auto 28px;
  color: #b9afc4;
  font-family: Arial, sans-serif;
  font-size: 15px;
  line-height: 1.8;
}

#identity-form {
  max-width: 430px;
  margin: 30px auto 0;
  text-align: left;
}

#identity-form label {
  display: block;
  margin-bottom: 10px;
  color: var(--pink-light);
  font-size: 10px;
  letter-spacing: 1.3px;
  line-height: 1.6;
}

#identity-form input {
  width: 100%;
  padding: 16px;
  border: 1px solid rgba(255, 79, 200, 0.35);
  border-radius: 5px;
  margin-bottom: 12px;
  color: white;
  background: rgba(255, 255, 255, 0.035);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

#identity-form input::placeholder {
  color: #74697f;
}

#identity-form input:focus {
  border-color: var(--pink);
  box-shadow: 0 0 20px rgba(255, 79, 200, 0.12);
}

.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  min-height: 50px;
  padding: 14px 19px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  width: 100%;
  color: #160719;
  border: 1px solid var(--pink);
  background: linear-gradient(100deg, var(--pink-light), var(--pink));
  box-shadow: 0 0 22px rgba(255, 79, 200, 0.15);
}

.button-primary:hover {
  box-shadow: 0 0 28px rgba(255, 79, 200, 0.35);
}

.button-secondary {
  color: var(--pink-light);
  border: 1px solid var(--line);
  background: transparent;
}

.microcopy {
  margin-top: 19px;
  margin-bottom: 0;
  color: #756a80;
  font-size: 9px;
  letter-spacing: 1.5px;
  line-height: 1.8;
}

#identity-form .button {
  margin-top: 3px;
}

.hero-eye {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto 24px;
  display: grid;
  place-items: center;
  cursor: pointer;
  border-radius: 50%;
}

.eye-ring {
  position: absolute;
  border: 1px solid rgba(255, 79, 200, 0.45);
  border-radius: 50%;
}

.ring-outer {
  inset: 4px;
  animation: rotate 15s linear infinite;
  border-style: dashed;
}

.ring-inner {
  inset: 22px;
  border-color: rgba(154, 107, 255, 0.7);
  box-shadow: inset 0 0 24px rgba(154, 107, 255, 0.1),
              0 0 25px rgba(255, 79, 200, 0.1);
  animation: pulse 3s ease-in-out infinite;
}

.eye-core {
  color: var(--pink-light);
  font-size: 52px;
  text-shadow: 0 0 12px var(--pink), 0 0 35px var(--pink);
  animation: pulse 2s ease-in-out infinite;
}

.eye-spark {
  position: absolute;
  color: white;
  text-shadow: 0 0 12px var(--pink);
}

.spark-one {
  top: 17px;
  right: 14px;
}

.spark-two {
  bottom: 16px;
  left: 17px;
}

.classified-card,
.scan-panel,
.question-card,
.love-letter,
.decrypt-console {
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--panel);
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.15);
}

.classified-card {
  padding: 19px;
  text-align: left;
}

.card-heading,
.file-line,
.progress-meta,
.quiz-heading,
.letter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-heading {
  margin-bottom: 17px;
  padding-bottom: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 1.2px;
}

.confidential {
  color: var(--pink);
  font-size: 9px;
}

.file-line {
  padding: 9px 0;
  gap: 15px;
  font-size: 10px;
}

.file-line span {
  color: #94879f;
}

.file-line strong {
  text-align: right;
  font-size: 10px;
}

.section-icon {
  margin: 18px 0;
  color: var(--pink);
  font-size: 36px;
  text-shadow: 0 0 25px var(--pink);
}

#scan-screen,
#decrypt-screen,
#final-screen {
  text-align: center;
}

.scan-panel {
  padding: 20px;
}

.scan-visual {
  position: relative;
  display: grid;
  place-items: center;
  height: 190px;
  margin-bottom: 25px;
  overflow: hidden;
  background:
    linear-gradient(rgba(255, 79, 200, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 79, 200, 0.045) 1px, transparent 1px);
  background-size: 25px 25px;
}

.scan-circle {
  width: 120px;
  height: 120px;
  border: 1px solid var(--pink);
  border-radius: 50%;
  box-shadow: 0 0 35px rgba(255, 79, 200, 0.13),
              inset 0 0 35px rgba(255, 79, 200, 0.1);
  animation: pulse 2s ease-in-out infinite;
}

.scan-crosshair {
  position: absolute;
  font-size: 48px;
  color: var(--pink-light);
}

.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--pink);
  box-shadow: 0 0 16px var(--pink);
  animation: scan 2.5s ease-in-out infinite alternate;
}

.scan-label {
  position: absolute;
  bottom: 10px;
  left: 12px;
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 2px;
}

.progress-track {
  height: 5px;
  overflow: hidden;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
}

.progress-fill {
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--purple), var(--pink));
  box-shadow: 0 0 12px var(--pink);
  transition: width 0.35s ease;
}

.progress-meta {
  margin-top: 10px;
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 1px;
  text-align: left;
}

.quiz-heading {
  margin-bottom: 20px;
  align-items: flex-start;
}

.quiz-heading h2 {
  margin-bottom: 8px;
}

.quiz-heading .muted {
  font-family: Arial, sans-serif;
  font-size: 13px;
  line-height: 1.6;
}

.question-counter {
  padding: 9px 11px;
  border: 1px solid var(--line);
  color: var(--pink-light);
  font-size: 13px;
  white-space: nowrap;
}

.muted {
  color: var(--muted);
}

.quiz-progress-track {
  margin-bottom: 23px;
}

.letter-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 20px;
  font-size: 9px;
  letter-spacing: 1px;
}

.letter-slots {
  display: flex;
  gap: 6px;
}

.letter-slot,
.decrypt-letter {
  display: grid;
  place-items: center;
  width: 31px;
  height: 38px;
  border: 1px solid rgba(255, 79, 200, 0.24);
  border-radius: 3px;
  color: #6f627c;
  background: rgba(255, 255, 255, 0.025);
  font-size: 17px;
  transition: color 0.25s, background 0.25s, box-shadow 0.25s;
}

.letter-slot.earned {
  color: white;
  border-color: var(--pink);
  background: rgba(255, 79, 200, 0.12);
  box-shadow: 0 0 15px rgba(255, 79, 200, 0.15);
  animation: letterPop 0.4s ease both;
}

.question-card {
  padding: clamp(20px, 5vw, 32px);
  text-align: left;
}

.question-tag {
  margin-bottom: 18px;
  color: var(--pink);
  font-size: 10px;
  letter-spacing: 1.5px;
}

.question-card h3 {
  margin-bottom: 23px;
}

.answers {
  display: grid;
  gap: 10px;
}

.answer-option {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #d9d0e2;
  background: rgba(255, 255, 255, 0.025);
  text-align: left;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}

.answer-option:hover:not(:disabled) {
  transform: translateX(3px);
  border-color: var(--pink);
  background: rgba(255, 79, 200, 0.07);
}

.answer-option:disabled {
  cursor: default;
  opacity: 0.85;
}

.answer-option .option-key {
  display: grid;
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid rgba(255, 79, 200, 0.3);
  border-radius: 3px;
  color: var(--pink-light);
  font-family: "Courier New", monospace;
}

.answer-option.correct {
  border-color: var(--green);
  background: rgba(141, 255, 203, 0.08);
}

.answer-option.correct .option-key {
  color: var(--green);
  border-color: var(--green);
}

.answer-option.wrong {
  border-color: #ff638a;
  background: rgba(255, 70, 110, 0.07);
}

.feedback {
  min-height: 22px;
  margin: 17px 0;
  color: var(--muted);
  font-family: Arial, sans-serif;
  font-size: 13px;
  line-height: 1.6;
}

.feedback.success {
  color: var(--green);
}

.feedback.error {
  color: #ff91a9;
}

#next-question {
  margin-top: 2px;
}

#next-question[hidden] {
  display: none;
}

.decrypt-letters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 9px;
  margin: 35px 0;
}

.decrypt-letter {
  width: clamp(43px, 10vw, 59px);
  height: clamp(52px, 12vw, 68px);
  font-size: clamp(22px, 5vw, 31px);
}

.decrypt-letter.revealed {
  color: white;
  border-color: var(--pink);
  background: rgba(255, 79, 200, 0.14);
  box-shadow: 0 0 22px rgba(255, 79, 200, 0.2);
  animation: letterPop 0.45s ease both;
}

.decrypt-console {
  padding: 16px 19px;
  margin-bottom: 23px;
  text-align: left;
  font-size: 10px;
  line-height: 1.8;
}

.decrypt-console p {
  margin-bottom: 5px;
  color: var(--muted);
}

.decrypt-console p:last-child {
  margin-bottom: 0;
  color: var(--pink-light);
}

.final-heart {
  margin: 0 auto 15px;
  color: var(--pink);
  font-size: 50px;
  animation: heartBeat 1.5s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(255, 79, 200, 0.5);
}

.final-kicker {
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 3px;
}

#final-name {
  margin-bottom: 15px;
  overflow-wrap: anywhere;
}

.revealed-word {
  margin: 0 auto 26px;
  color: var(--pink-light);
  font-size: clamp(27px, 7vw, 44px);
  font-weight: bold;
  letter-spacing: clamp(4px, 2vw, 12px);
  text-shadow: 0 0 24px rgba(255, 79, 200, 0.3);
  overflow-wrap: anywhere;
}

.love-letter {
  padding: clamp(19px, 5vw, 30px);
  text-align: left;
}

.letter-header {
  margin-bottom: 24px;
  padding-bottom: 13px;
  border-bottom: 1px solid var(--line);
  color: var(--pink-light);
  font-size: 9px;
  letter-spacing: 1px;
  line-height: 1.7;
}

#love-message {
  color: #e0d5e8;
  font-family: Arial, sans-serif;
  font-size: 15px;
  line-height: 1.95;
  white-space: pre-line;
}

.signature {
  padding-top: 15px;
  color: var(--muted);
  font-size: 11px;
  text-align: right;
}

.signature span {
  color: var(--pink);
}

.final-footnote {
  margin: 23px 0;
  color: #8d7e98;
  font-size: 9px;
  line-height: 1.9;
  letter-spacing: 1px;
}

.easter-toast {
  position: fixed;
  z-index: 20;
  right: 20px;
  bottom: 22px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: min(360px, calc(100vw - 32px));
  padding: 17px;
  border: 1px solid var(--pink);
  border-radius: 5px;
  background: #170b20;
  box-shadow: 0 0 35px rgba(255, 79, 200, 0.22);
  opacity: 0;
  transform: translateY(15px);
  pointer-events: none;
  transition: opacity 0.3s, transform 0.3s;
}

.easter-toast.visible {
  opacity: 1;
  transform: translateY(0);
}

.toast-icon {
  color: var(--pink);
  font-size: 23px;
}

.easter-toast strong {
  color: var(--pink-light);
  font-size: 10px;
  letter-spacing: 1px;
}

.easter-toast p {
  margin: 8px 0 0;
  color: #d3c5dc;
  font-family: Arial, sans-serif;
  font-size: 12px;
  line-height: 1.6;
}

.glitch-overlay {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: none;
  place-items: center;
  padding: 20px;
  background: rgba(5, 2, 9, 0.95);
}

.glitch-overlay.visible {
  display: grid;
  animation: glitchFlash 0.35s steps(2, end) 2;
}

.glitch-box {
  width: min(100%, 460px);
  padding: clamp(22px, 5vw, 36px);
  border: 1px solid var(--pink);
  background: #110817;
  box-shadow: 0 0 50px rgba(255, 79, 200, 0.18);
  text-align: center;
}

.glitch-box > p:first-child {
  color: #ff759b;
  font-size: 10px;
  letter-spacing: 2px;
}

.glitch-box h2 {
  color: var(--pink-light);
  margin: 20px 0;
  animation: glitchText 0.25s steps(2, end) 3;
}

.glitch-box > p:not(:first-child) {
  color: #c2b3cc;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.7;
}

.glitch-box .button {
  margin-top: 12px;
}

.footer {
  min-height: 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  color: #766a81;
  font-size: 9px;
  letter-spacing: 1px;
}

@keyframes appear {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes blink {
  50% { opacity: 0.35; }
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.85; }
  50% { transform: scale(1.06); opacity: 1; }
}

@keyframes scan {
  from { top: 15%; }
  to { top: 85%; }
}

@keyframes letterPop {
  0% { transform: scale(0.65); opacity: 0.3; }
  75% { transform: scale(1.12); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.13); }
  30% { transform: scale(1); }
  45% { transform: scale(1.08); }
}

@keyframes glitchFlash {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-1px); }
}

@keyframes glitchText {
  0%, 100% { transform: translateX(0); text-shadow: none; }
  50% { transform: translateX(2px); text-shadow: -2px 0 #ff2a8b, 2px 0 #7c5cff; }
}

@media (max-width: 520px) {
  .topbar,
  .footer {
    width: calc(100% - 28px);
  }

  .topbar {
    min-height: 65px;
    font-size: 9px;
  }

  .brand {
    gap: 6px;
    letter-spacing: 0.7px;
  }

  .brand-icon {
    font-size: 19px;
  }

  .status {
    font-size: 8px;
    gap: 5px;
  }

  .main-container {
    width: calc(100% - 30px);
    padding: 35px 0 45px;
  }

  .eyebrow {
    font-size: 9px;
    letter-spacing: 1px;
    line-height: 1.7;
  }

  .intro {
    font-size: 14px;
  }

  .classified-card {
    padding: 15px;
  }

  .file-line {
    align-items: flex-start;
    font-size: 9px;
  }

  .file-line span,
  .file-line strong {
    font-size: 9px;
    line-height: 1.6;
  }

  .letter-status {
    align-items: flex-start;
    flex-direction: column;
  }

  .letter-slots {
    width: 100%;
  }

  .letter-slot {
    flex: 1;
    min-width: 0;
  }

  .question-card {
    padding: 18px;
  }

  .answer-option {
    padding: 12px 10px;
    font-size: 13px;
  }

  .footer {
    min-height: 55px;
    font-size: 8px;
    letter-spacing: 0.5px;
  }

  .scanlines {
    opacity: 0.07;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
