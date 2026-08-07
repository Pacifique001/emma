import { galleryItems } from "./gallery.js";

const personalization = {
  name: "Emma",
  nickname: "Pacifiqque",
  ourSpecialMemory: "i do not know what to say, but i love you and i hope you have a wonderful birthday.",
  whatILoveAboutYou: "kindness",
  specialMessage: `Happy Birthday to someone truly special to me. ❤️

Today, I celebrate more than the day you were born — I celebrate the beautiful person you are and the happiness you bring into the lives of those around you.

I hope this new year of your life brings you endless reasons to smile, beautiful memories, peaceful moments, and dreams that come true.

Never forget that **you are loved, valued, appreciated, and deeply cared for.

If I could give you one gift today, it would be the chance to see yourself through my eyes — so you could understand just how special you truly are to me.

Happy Birthday, Emma. 🎂❤️

May your life always be as beautiful as the heart you carry. ✨`,
  yourName: "Pacifique",
  // Replace these defaults with your own words to personalize the page.
};

const wishes = [
  "I hope this new chapter brings you more happiness than you ever imagined.",
  "I hope every dream you've been quietly carrying in your heart finds its way to you.",
  "I hope you always remember how valuable, beautiful, and worthy you are.",
  "I hope life gives you countless reasons to smile.",
  "I hope you meet beautiful opportunities, beautiful people, and beautiful moments.",
  "And above everything… I hope you never forget that there is someone who genuinely cares about you and wants to see you happy."
];

const letterParagraphs = [
  `Happy Birthday to someone I care about more than I can properly put into words.`,
  `Today, I don't just celebrate the day you were born. I celebrate the person you have become, the memories you have created, the lives you have touched, and all the beautiful things that are still waiting for you.`,
  `I hope you know that your existence matters. Your smile matters. Your dreams matter. And you matter.`,
  `No matter where life takes you, I hope you continue becoming the person you were always meant to be.`,
  `May your days be filled with genuine happiness, your heart with peace, and your future with everything you've ever hoped for.`,
  `And if someday you forget how special you are, come back to this little page and remember that someone took the time to create all of this simply because you matter to them.`,
  `Happy Birthday, ${personalization.name}. ❤️`,
  `You deserve beautiful things — today, tomorrow, and always.`
];

const state = {
  heroStep: 0,
  cakeLit: false,
  musicOn: false,
  musicTimer: null,
  letterTimer: null,
  audioContext: null,
  masterGain: null,
  ambianceTone: null,
  ambianceFilter: null
};

const els = {
  body: document.body,
  experience: document.getElementById("experience"),
  heroLine1: document.getElementById("hero-line-1"),
  heroLine2: document.getElementById("hero-line-2"),
  heroLine3: document.getElementById("hero-line-3"),
  heroSubcopy: document.getElementById("hero-subcopy"),
  startButton: document.getElementById("start-button"),
  musicToggle: document.getElementById("music-toggle"),
  secretHeart: document.getElementById("secret-heart"),
  galleryGrid: document.getElementById("gallery-grid"),
  wishTemplate: document.getElementById("wish-template"),
  wishList: document.getElementById("wish-list"),
  cake: document.getElementById("cake"),
  cakeCandles: document.getElementById("cake-candles"),
  cakeTitle: document.getElementById("cake-title"),
  cakeSubtitle: document.getElementById("cake-subtitle"),
  wishReveal: document.getElementById("wish-reveal"),
  openLetter: document.getElementById("open-letter"),
  storyText: document.getElementById("story-text"),
  specialMemory: document.getElementById("special-memory"),
  whatILove: document.getElementById("what-i-love"),
  specialMessage: document.getElementById("special-message"),
  signatureName: document.getElementById("signature-name"),
  finalSignature: document.getElementById("final-signature"),
  letterModal: document.getElementById("letter-modal"),
  letterText: document.getElementById("letter-text"),
  galleryModal: document.getElementById("gallery-modal"),
  modalImage: document.getElementById("modal-image"),
  modalCaption: document.getElementById("modal-caption"),
  secretModal: document.getElementById("secret-modal"),
  sparkLayer: document.getElementById("spark-layer"),
  particleLayer: document.getElementById("particle-layer"),
  centerpiece: document.getElementById("centerpiece")
};

function personalizeCopy() {
  els.heroLine3.textContent = `Happy Birthday, ${personalization.name} 🎂❤️`;
  els.heroSubcopy.textContent = `A private birthday world made just for ${personalization.name}.`;
  els.storyText.textContent = `${personalization.name}, this page is my quiet way of saying what ordinary words struggle to hold. ${personalization.nickname === "[NICKNAME]" ? "" : `${personalization.nickname}, `}you are not a passing part of my life. You are one of the people who make it softer, brighter, and far more meaningful.`;
  els.specialMemory.textContent = personalization.ourSpecialMemory;
  els.whatILove.textContent = personalization.whatILoveAboutYou;
  els.specialMessage.textContent = personalization.specialMessage;
  els.signatureName.textContent = personalization.yourName;
  els.finalSignature.textContent = `${personalization.yourName} ❤️`;
}

function buildGallery() {
  els.galleryGrid.innerHTML = galleryItems.map((item, index) => `
    <button class="gallery-card reveal" type="button" data-gallery-index="${index}" aria-label="Open memory ${index + 1}">
      <div class="gallery-card__frame">
        <img src="${item.src}" alt="${item.alt}" loading="lazy" />
        <div class="gallery-card__caption">${item.caption}</div>
      </div>
    </button>
  `).join("");
}

function buildWishes() {
  wishes.forEach((wish, index) => {
    const node = els.wishTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".wish-item__number").textContent = String(index + 1).padStart(2, "0");
    node.querySelector(".wish-item__text").textContent = wish;
    els.wishList.appendChild(node);
  });
}

function observeReveal() {
  const revealables = document.querySelectorAll(".reveal-on-scroll, .reveal, .stagger-item, .wish-item, .gallery-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      target.classList.add("is-visible");
      if (target.classList.contains("reveal-on-scroll")) {
        target.querySelectorAll(".reveal, .stagger-item").forEach((item) => item.classList.add("is-visible"));
      }
      if (target.classList.contains("wish-item")) {
        target.classList.add("is-visible");
      }
      observer.unobserve(target);
    });
  }, { threshold: 0.18 });

  revealables.forEach((el) => observer.observe(el));
}

function heroSequence() {
  setTimeout(() => els.heroLine1.classList.add("is-visible"), 180);
  setTimeout(() => {
    els.heroLine1.style.opacity = "0.26";
    els.heroLine2.classList.add("is-visible");
  }, 1900);
  setTimeout(() => {
    els.heroLine2.style.opacity = "0.32";
    els.heroLine3.classList.add("is-visible");
  }, 3600);
  setTimeout(() => {
    document.querySelectorAll(".hero .reveal").forEach((node) => node.classList.add("is-visible"));
  }, 4300);
}

function revealExperience({ scroll = false } = {}) {
  document.body.classList.add("started");
  document.querySelectorAll(".reveal-on-scroll, .reveal, .stagger-item, .wish-item, .gallery-card").forEach((node) => {
    node.classList.add("is-visible");
  });
  if (scroll) {
    els.experience.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  spawnGlowBurst(els.startButton, 26, true);
}

function startExperience() {
  revealExperience({ scroll: true });
}

function openModal(modal) {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (modal === els.letterModal && state.letterTimer) {
    clearInterval(state.letterTimer);
    state.letterTimer = null;
  }
}

function openGallery(index) {
  const item = galleryItems[index];
  if (!item) return;
  els.modalImage.src = item.src;
  els.modalImage.alt = item.alt;
  els.modalCaption.textContent = item.caption;
  openModal(els.galleryModal);
}

function typeLetter() {
  els.letterText.textContent = "";
  openModal(els.letterModal);
  const fullText = letterParagraphs.join("\n\n");
  let index = 0;

  if (state.letterTimer) {
    clearInterval(state.letterTimer);
  }

  state.letterTimer = setInterval(() => {
    els.letterText.textContent += fullText[index];
    index += 1;
    if (index >= fullText.length) {
      clearInterval(state.letterTimer);
      state.letterTimer = null;
    }
  }, 28);
}

function buildCandleGroup() {
  els.cakeCandles.innerHTML = Array.from({ length: 4 }, () => '<div class="cake__candle"></div>').join("");
}

function handleCake() {
  if (!state.cakeLit) {
    state.cakeLit = true;
    els.cake.classList.add("is-lit");
    els.cake.classList.remove("is-blown");
    els.cakeTitle.textContent = "The candles are glowing now.";
    els.cakeSubtitle.textContent = "Take a breath, make a wish, and let the moment linger.";
    spawnGlowBurst(els.cake, 22, true);
    return;
  }

  els.cake.classList.add("is-blown");
  setTimeout(() => els.cake.classList.remove("is-blown", "is-lit"), 500);
  state.cakeLit = false;
  els.cakeTitle.textContent = "Make a wish… ✨";
  els.cakeSubtitle.textContent = "May this year be your most beautiful chapter yet.";
  els.wishReveal.hidden = false;
  els.wishReveal.classList.add("is-visible");
  launchCelebration(els.cake);
}

function spawnGlowBurst(anchor, count, includeHearts = false) {
  const rect = anchor.getBoundingClientRect();
  const container = anchor.closest(".hero") || anchor.closest(".cake-wrap") || document.body;
  for (let index = 0; index < count; index += 1) {
    const spark = document.createElement("span");
    spark.className = includeHearts && index % 4 === 0 ? "heart" : "spark";
    spark.textContent = includeHearts && index % 4 === 0 ? "♥" : "";
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    const radius = 10 + Math.random() * 92;
    const angle = (Math.PI * 2 * index) / count;
    const driftX = Math.cos(angle) * radius;
    const driftY = Math.sin(angle) * radius - 24;
    spark.style.left = `${startX}px`;
    spark.style.top = `${startY}px`;
    spark.style.fontSize = `${0.65 + Math.random() * 0.75}rem`;
    spark.style.opacity = "0.95";
    spark.style.transform = "translate(-50%, -50%)";
    container.appendChild(spark);

    const duration = 850 + Math.random() * 500;
    spark.animate([
      { transform: "translate(-50%, -50%) scale(0.6)", opacity: 1 },
      { transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) scale(1.2)`, opacity: 1, offset: 0.65 },
      { transform: `translate(calc(-50% + ${driftX * 1.6}px), calc(-50% + ${driftY * 1.8}px)) scale(0.25)`, opacity: 0 }
    ], {
      duration,
      easing: "cubic-bezier(0.18, 0.72, 0.2, 1)",
      fill: "forwards"
    }).onfinish = () => spark.remove();
  }
}

function launchCelebration(anchor) {
  const rect = anchor.getBoundingClientRect();
  const container = document.body;
  const count = 60;

  for (let index = 0; index < count; index += 1) {
    const confetti = document.createElement("span");
    confetti.className = "confetti";
    confetti.style.left = `${rect.left + rect.width / 2}px`;
    confetti.style.top = `${rect.top + rect.height / 2}px`;
    confetti.style.background = index % 3 === 0 ? "#ff8ab1" : index % 3 === 1 ? "#ffd89a" : "#ffffff";
    confetti.style.transform = "translate(-50%, -50%)";
    container.appendChild(confetti);

    const angle = (Math.PI * 2 * index) / count;
    const distance = 120 + Math.random() * 260;
    const rotate = Math.random() * 240 - 120;
    const fall = 100 + Math.random() * 180;
    confetti.animate([
      { transform: "translate(-50%, -50%) scale(1) rotate(0deg)", opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance - fall}px)) scale(1) rotate(${rotate}deg)`, opacity: 1, offset: 0.4 },
      { transform: `translate(calc(-50% + ${Math.cos(angle) * distance * 1.25}px), calc(-50% + ${Math.sin(angle) * distance * 1.6}px)) scale(0.25) rotate(${rotate * 1.7}deg)`, opacity: 0 }
    ], {
      duration: 1600 + Math.random() * 800,
      easing: "cubic-bezier(0.16, 0.84, 0.35, 1)",
      fill: "forwards"
    }).onfinish = () => confetti.remove();
  }

  spawnGlowBurst(anchor, 18, true);
  for (let index = 0; index < 16; index += 1) {
    createFloatingElement("heart", container, rect);
    createFloatingElement("particle", container, rect);
  }

  els.centerpiece.classList.add("revealed");
}

function createFloatingElement(type, container, rect) {
  const node = document.createElement("span");
  node.className = type;
  node.textContent = type === "heart" ? "♥" : "";
  const x = rect.left + rect.width / 2 + (Math.random() * 220 - 110);
  const y = rect.top + rect.height / 2 + (Math.random() * 120 - 60);
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;
  node.style.opacity = "0.95";
  container.appendChild(node);

  const dx = Math.random() * 240 - 120;
  const dy = -(160 + Math.random() * 260);
  const duration = 2200 + Math.random() * 1200;

  node.animate([
    { transform: "translate(-50%, -50%) scale(0.55)", opacity: 0 },
    { transform: "translate(-50%, -50%) scale(1)", opacity: 1, offset: 0.15 },
    { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.95)`, opacity: 1, offset: 0.72 },
    { transform: `translate(calc(-50% + ${dx * 1.15}px), calc(-50% + ${dy * 1.15}px)) scale(0.35)`, opacity: 0 }
  ], {
    duration,
    easing: "cubic-bezier(0.16, 0.84, 0.35, 1)",
    fill: "forwards"
  }).onfinish = () => node.remove();
}

function initMusic() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    els.musicToggle.disabled = true;
    els.musicToggle.textContent = "Music unavailable";
    return;
  }

  state.audioContext = new AudioContextClass();
  state.masterGain = state.audioContext.createGain();
  state.masterGain.gain.value = 0.035;
  state.ambianceFilter = state.audioContext.createBiquadFilter();
  state.ambianceFilter.type = "lowpass";
  state.ambianceFilter.frequency.value = 680;
  state.ambianceTone = state.audioContext.createOscillator();
  const toneGain = state.audioContext.createGain();
  toneGain.gain.value = 0.0;
  state.ambianceTone.type = "sine";
  state.ambianceTone.frequency.value = 145;

  state.ambianceTone.connect(toneGain);
  toneGain.connect(state.ambianceFilter);
  state.ambianceFilter.connect(state.masterGain);
  state.masterGain.connect(state.audioContext.destination);
  state.ambianceTone.start();

  const motif = [
    261.63, 329.63, 392.0, 523.25,
    493.88, 392.0, 329.63, 293.66
  ];
  let step = 0;

  const playStep = () => {
    if (!state.audioContext || state.audioContext.state === "closed") return;
    const now = state.audioContext.currentTime;
    const note = motif[step % motif.length];
    const oscillator = state.audioContext.createOscillator();
    const envelope = state.audioContext.createGain();
    oscillator.type = step % 2 === 0 ? "triangle" : "sine";
    oscillator.frequency.value = note;
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(0.12, now + 0.12);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
    oscillator.connect(envelope);
    envelope.connect(state.ambianceFilter);
    oscillator.start(now);
    oscillator.stop(now + 1.65);
    step += 1;
  };

  state.musicTimer = setInterval(playStep, 1500);
  playStep();
}

function toggleMusic() {
  if (!state.audioContext) {
    initMusic();
  }

  if (!state.audioContext) return;

  if (state.musicOn) {
    state.masterGain.gain.linearRampToValueAtTime(0.0001, state.audioContext.currentTime + 0.3);
    clearInterval(state.musicTimer);
    state.musicTimer = null;
    state.musicOn = false;
    els.body.classList.remove("music-on");
    els.musicToggle.textContent = "Start Music";
    els.musicToggle.setAttribute("aria-pressed", "false");
    return;
  }

  if (state.audioContext.state === "suspended") {
    state.audioContext.resume();
  }

  state.masterGain.gain.setValueAtTime(0.0001, state.audioContext.currentTime);
  state.masterGain.gain.linearRampToValueAtTime(0.035, state.audioContext.currentTime + 0.5);
  state.musicTimer = setInterval(() => {
    const now = state.audioContext.currentTime;
    const oscillator = state.audioContext.createOscillator();
    const envelope = state.audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = [261.63, 311.13, 349.23, 392.0][Math.floor(Math.random() * 4)];
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(0.09, now + 0.08);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + 1.35);
    oscillator.connect(envelope);
    envelope.connect(state.ambianceFilter);
    oscillator.start(now);
    oscillator.stop(now + 1.38);
  }, 1300);

  state.musicOn = true;
  els.body.classList.add("music-on");
  els.musicToggle.textContent = "Music On";
  els.musicToggle.setAttribute("aria-pressed", "true");
}

function wireEvents() {
  els.startButton.addEventListener("click", () => {
    startExperience();
  });

  els.musicToggle.addEventListener("click", () => {
    if (!state.audioContext) {
      initMusic();
    }
    toggleMusic();
  });

  els.secretHeart.addEventListener("click", () => openModal(els.secretModal));

  els.openLetter.addEventListener("click", typeLetter);

  els.cake.addEventListener("click", handleCake);

  els.galleryGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-index]");
    if (!button) return;
    openGallery(Number(button.dataset.galleryIndex));
  });

  document.addEventListener("click", (event) => {
    const closeButton = event.target.closest("[data-close-modal], [data-close-letter], [data-close-secret]");
    if (!closeButton) return;
    closeModal(els.galleryModal);
    closeModal(els.letterModal);
    closeModal(els.secretModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeModal(els.galleryModal);
    closeModal(els.letterModal);
    closeModal(els.secretModal);
  });
}

function prepareWishAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.25 });

  document.querySelectorAll(".wish-item").forEach((item) => observer.observe(item));
}

function primeSparkles() {
  const count = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 24;
  for (let index = 0; index < count; index += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.top = `${Math.random() * 100}%`;
    spark.style.opacity = `${0.3 + Math.random() * 0.4}`;
    els.sparkLayer.appendChild(spark);
    spark.animate([
      { transform: "scale(0.6)", opacity: 0.2 },
      { transform: "scale(1.35)", opacity: 0.95 },
      { transform: "scale(0.6)", opacity: 0.2 }
    ], {
      duration: 3200 + Math.random() * 2400,
      iterations: Infinity,
      easing: "ease-in-out",
      delay: Math.random() * 1800
    });
  }
}

personalizeCopy();
buildGallery();
buildWishes();
buildCandleGroup();
observeReveal();
prepareWishAnimation();
primeSparkles();
heroSequence();
wireEvents();
