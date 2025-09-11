const intro = document.getElementById('introMsg');
    const prompt = document.getElementById('prompt');
    const quoteCard = document.getElementById('quoteCard');
    const skipBtn = document.getElementById('skipIntro');
    const newQuoteBtn = document.getElementById('newQuote');
    const backBtn = document.getElementById('back');

    const quoteText = document.getElementById('quoteText');
    const quoteSource = document.getElementById('quoteSource');
    const reflectPrompt = document.getElementById('reflectPrompt');

    // Quotes
    const QUOTES = {
      focus: [
        { q: 'If you spend too much time thinking about a thing, you\'ll never get it done', s: 'Bruce Lee' }
      ],
      learning: [
        { q: 'Slow is smooth; smooth is fast.', s: 'US Navy Seals' }
      ],
      mindfulness: [
        { q: 'Nature does not hurry, yet everything is accomplished', s: 'Lao Tzu' }
      ],
      health: [
        { q: 'Our bodies are our gardens, our wills are our gardeners.', s: 'William Shakespeare' }
      ],
      creativity: [
        { q: 'You can\'t use up creativity. The more you use, the more you have.', s: 'Maya Angelou' }
      ]
    };

    // Reflection prompts
    const REFLECTIONS = {
      focus: [
        'What is the one task that would make today meaningful?',
        'Which distraction can you remove for 30 minutes?'
      ],
      learning: [
        'What is one question you want answered today?',
        'What will you practice for 20 minutes?'
      ],
      mindfulness: [
        'Where do you feel tension right now? Breathe into it.',
        'What can you release that isn\'t yours to carry?'
      ],
      health: [
        'What\'s your minimum viable workout today?',
        'How will you honor sleep tonight?'
      ],
      creativity: [
        'What can you sketch or draft in 10 minutes?',
        'Given as much time and resources as you need, what is the one thing you would create?'
      ]
    };

    let currentKey = null;

    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    function showIntro() {
      intro.classList.add('show');
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const delay = reduced ? 700 : 3200;
      const timer = setTimeout(() => fadeToPrompt(), delay);
      skipBtn.onclick = () => {
        skipBtn.style.display = 'none';
        clearTimeout(timer);
        fadeToPrompt(true);
      };
    }

    function fadeToPrompt(skipped=false) {
      // Hide intro
      intro.classList.add('hide');
      intro.setAttribute('aria-hidden', 'true');
      skipBtn.style.display = 'none';
      // Show prompt after short delay unless reduced motion
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const wait = reduced || skipped ? 0 : 400;
      setTimeout(() => {
        prompt.classList.add('show');
        quoteCard.hidden = true;
        quoteCard.classList.remove('show');
      }, wait);
    }

    function showQuoteFor(key) {
      currentKey = key;
      const { q, s } = pick(QUOTES[key]);
      quoteText.textContent = `“${q}”`;
      quoteSource.textContent = s ? `— ${s}` : '';
      reflectPrompt.textContent = pick(REFLECTIONS[key]);

      prompt.classList.remove('show');
      quoteCard.hidden = false;
      requestAnimationFrame(() => quoteCard.classList.add('show'));
    }

    function newQuote() {
      if (!currentKey) return;
      const { q, s } = pick(QUOTES[currentKey]);
      // Quick micro fade
      quoteCard.style.opacity = .6;
      setTimeout(() => {
        quoteText.textContent = `“${q}”`;
        quoteSource.textContent = s ? `— ${s}` : '';
        reflectPrompt.textContent = pick(REFLECTIONS[currentKey]);
        quoteCard.style.opacity = '';
      }, 120);
    }

    document.querySelectorAll('.choice').forEach(btn => {
      btn.addEventListener('click', () => showQuoteFor(btn.dataset.key));
    });

    newQuoteBtn.addEventListener('click', newQuote);
    backBtn.addEventListener('click', () => {
      quoteCard.classList.remove('show');
      setTimeout(() => {
        quoteCard.hidden = true;
        prompt.classList.add('show');
      }, 180);
    });

    document.addEventListener('DOMContentLoaded', showIntro);



// Theme toggle with animations
let theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.body.classList.add("dark");
}
const toggle = document.createElement("button");
toggle.id = "theme-toggle";
toggle.textContent = theme === "dark" ? "🌙" : "☀️";

// Place theme toggle in header by default
const header = document.querySelector("header");
header.appendChild(toggle);

// Move theme toggle above question on mobile
function moveThemeToggleMobile() {
  const mq = window.matchMedia("(max-width: 600px)");
  const question = document.querySelector(".question");
  if (mq.matches && question) {
    question.parentNode.insertBefore(toggle, question);
    toggle.classList.add("mobile-toggle");
  } else {
    if (!header.contains(toggle)) header.appendChild(toggle);
    toggle.classList.remove("mobile-toggle");
  }
}
window.addEventListener("resize", moveThemeToggleMobile);
document.addEventListener("DOMContentLoaded", moveThemeToggleMobile);

toggle.addEventListener("click", () => {
  const goingDark = !document.body.classList.contains("dark");
  document.body.classList.toggle("dark");
  // Update icon
  toggle.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  if (goingDark) {
    for (let i = 0; i < 10; i++) {
      createShootingStar();
    }
  } else {
    createSunburst();
  }
});

function createShootingStar() {
  const star = document.createElement("div");
  star.classList.add("shooting-star");
  // Random starting position in the top half of screen
  star.style.top = `${Math.random() * 50}%`;
  star.style.left = `${Math.random() * 80}%`;
  star.style.animationDelay = `${Math.random() * 0.4}s`;
  const xTravel = 200 + Math.random() * 200;
  const yTravel = 100 + Math.random() * 200;
  star.style.setProperty("--xTravel", `${xTravel}px`);
  star.style.setProperty("--yTravel", `${yTravel}px`);
  document.body.appendChild(star);
  star.addEventListener("animationend", () => star.remove());
}

function createSunburst() {
  const burst = document.createElement("div");
  burst.classList.add("sunburst");
  const btn = document.getElementById("theme-toggle");
  const rect = btn.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;
  burst.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(burst);
  burst.addEventListener("animationend", () => burst.remove());
}