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
        { q: 'If you spend too much time thinking about a thing, you\'ll never get it done', s: 'Bruce Lee' },
        { q: 'You don\'t have to see the whole staircase, just take the first step.', s: 'Martin Luther King Jr.' },
        { q: 'A journey of a thousand miles begins with a single step.', s: 'Lao Tzu' },
        { q: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', s: 'Aristotle' },
        { q: 'It does not matter how slowly you go as long as you do not stop.', s: 'Confucius' },
        { q: 'Start where you are. Use what you have. Do what you can.', s: 'Arthur Ashe' },
        { q: 'The successful warrior is the average man, with laser-like focus.', s: 'Bruce Lee' },
        { q: 'Concentrate all your thoughts upon the work at hand. The sun\'s rays do not burn until brought to a focus.', s: 'Alexander Graham Bell' },
        { q: 'You will never reach your destination if you stop and throw stones at every dog that barks.', s: 'Winston Churchill' },
        { q: 'The key is not to prioritize what\'s on your schedule, but to schedule your priorities.', s: 'Stephen Covey' }
      ],
      learning: [
        { q: 'Slow is smooth; smooth is fast.', s: 'US Navy Seals' },
        { q: 'The more I read, the more I acquire, the more certain I am that I know nothing.', s: 'Voltaire' },
        { q: 'Failure is simply the opportunity to begin again, this time more intelligently.', s: 'Henry Ford' },
        { q: 'Study without desire spoils the memory, and it retains nothing that it takes in.', s: 'Leonardo da Vinci' },
        { q: 'Education is the kindling of a flame, not the filling of a vessel.', s: 'Socrates' },
        { q: 'Wisdom is not a product of schooling but of the lifelong attempt to acquire it.', s: 'Albert Einstein' },
        { q: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', s: 'Mahatma Gandhi' },
        { q: 'An investment in knowledge pays the best interest.', s: 'Benjamin Franklin' },
        { q: 'The beautiful thing about learning is that no one can take it away from you.', s: 'B.B. King' },
        { q: 'Tell me and I forget. Teach me and I remember. Involve me and I learn.', s: 'Benjamin Franklin' }
      ],
      mindfulness: [
        { q: 'Nature does not hurry, yet everything is accomplished', s: 'Lao Tzu' },
        { q: 'Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.', s: 'Thich Nhat Hanh' },
        { q: 'The mind is like water. When it\'s turbulent, it\'s difficult to see. When it\'s calm, everything becomes clear.', s: 'Prasad Mahes' },
        { q: 'You can\'t stop the waves, but you can learn to surf.', s: 'Jon Kabat-Zinn' },
        { q: 'The greatest weapon against stress is our ability to choose one thought over another.', s: 'William James' },
        { q: 'If you are depressed, you are living in the past. If you are anxious, you are living in the future. If you are at peace, you are living in the present.', s: 'Lao Tzu' },
        { q: 'There is no path to peace. Peace is the path.', s: 'Mahatma Gandhi' },
        { q: 'Serenity is not freedom from the storm, but peace amid the storm.', s: 'Unknown' },
        { q: 'Within you, there is a stillness and a sanctuary to which you can retreat at any time.', s: 'Hermann Hesse' },
        { q: 'When you realize nothing is lacking, the whole world belongs to you.', s: 'Lao Tzu' }
      ],
      health: [
        { q: 'Our bodies are our gardens, our wills are our gardeners.', s: 'William Shakespeare' },
        { q: 'Do not be afraid of growing slowly. Be afraid only of standing still.', s: 'Chinese Proverb' },
        { q: 'A river cuts through rock, not because of its power, but because of its persistence.', s: 'Jim Watkins' },
        { q: 'Discipline is choosing between what you want now and what you want most.', s: 'Abraham Lincoln' },
        { q: 'Success is nothing more than a few simple disciplines, practiced every day.', s: 'Jim Rohn' },
        { q: 'He who has health has hope; and he who has hope has everything.', s: 'Arabian Proverb' },
        { q: 'To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear.', s: 'Buddha' },
        { q: 'Take care of your body. It\'s the only place you have to live.', s: 'Jim Rohn' },
        { q: 'A fit body, a calm mind, a house full of love. These things cannot be bought, they must be earned.', s: 'Naval Ravikant' },
        { q: 'The groundwork for all happiness is good health.', s: 'Leigh Hunt' }
      ],
      creativity: [
        { q: 'You can\'t use up creativity. The more you use, the more you have.', s: 'Maya Angelou' },
        { q: 'Creativity is intelligence having fun.', s: 'Albert Einstein' },
        { q: 'You can\'t wait for inspiration. You have to go after it with a club.', s: 'Jack London' },
        { q: 'Every artist was first an amateur.', s: 'Ralph Waldo Emerson' },
        { q: 'Imagination is everything. It is the preview of life\'s coming attractions.', s: 'Albert Einstein' },
        { q: 'Creativity takes courage.', s: 'Henri Matisse' },
        { q: 'The chief enemy of creativity is "good" sense.', s: 'Pablo Picasso' },
        { q: 'Don’t think. Thinking is the enemy of creativity. It’s self-conscious, and anything self-conscious is lousy. You can’t try to do things. You simply must do things.', s: 'Ray Bradbury' },
        { q: 'To live a creative life, we must lose our fear of being wrong.', s: 'Joseph Chilton Pearce' },
        { q: 'Creativity is allowing yourself to make mistakes. Art is knowing which ones to keep.', s: 'Scott Adams' }
      ]
    };

    // Reflection prompts
    const REFLECTIONS = {
      focus: [
        'What is the one task that would make today meaningful?',
        'Which distraction can I remove for 30 minutes?',
        'What 10-minute task can I complete without overthinking?',
        'Today, I will give my full attention to one task at a time.',
        'Distractions don\'t control me; I choose where my energy goes.',
        'Clarity comes when I quiet the noise and act with intention.',
        'I can always return to my focus when I notice my mind has wandered.'
      ],
      learning: [
        'What is one question I want answered today?',
        'What will I practice for 20 minutes?',
        'Which mistake or gap in knowledge can I review and learn from today?',

        'Learning is a lifelong journey; what step will I take today?',
        'How can I apply what I learn to improve my life?',
        'Every mistake is a lesson; what did I learn from my last one?',
        'Today, I will absorb one lesson deeply rather than skimming many.',
        'I grow wiser with every effort I make to understand.'
      ],
      mindfulness: [
        'Where do I feel tension right now? Breathe into it.',
        'What can I release that isn\'t mine to carry?',
        'Which small worry can I write down and set aside for later?',
        'Can I spend 10 minutes outside, simply observing?',
        'What space in my environment can I declutter right now?',
        'I can\'t control everything, but I can control my response.',
        'Peace begins with a smile and a deep breath.',
        'I am present in this moment, and that is enough.',
        'By letting go of what I cannot control, I make space for what matters.',
        'I nurture my inner peace, regardless of external circumstances.',
        'My breath is my anchor to the present moment.',
        'In stillness, I find clarity and strength.',
        'I embrace the present moment fully, without judgment or resistance.'
      ],
      health: [
        'What\'s my minimum viable workout today?',
        'How will I honor sleep tonight?',
        'What\'s one healthy meal I can prepare this week?',
        'Can I replace one unhealthy choice with a healthier one today?',
        'What is one small promise I can keep to myself by bedtime?',
        'Can I walk, stretch, or move for at least 5 minutes right now?',
        'Small, consistent actions lead to big health improvements over time.',
        'How I treat my body today shapes my tomorrow.',
        'Rest and recovery are as vital as effort and discipline.',
        'I listen to my body\'s needs and respond with care and respect.',
        'I nurture my body with movement, rest, and wholesome food.',
        'Every healthy choice I make strengthens my body and mind.',
        'I am grateful for my body and all it allows me to do.',
        'My health is a priority, and I invest in it daily.',
        'Discipline is a gift I give my future self.',
        'Today, I will keep the promises I made to myself.',
        'I am stronger than my excuses and more committed than my fears.',
        'Progress, not perfection, is my goal.',
        'I honor my commitments to myself because I deserve my own respect.'
      ],
      creativity: [
        'What can I sketch or draft in 10 minutes?',
        'Given as much time and resources as I need, what is the one thing I would create?',
        'Can I remix or expand on something I made previously?',
        'What story, image, or idea has been on my mind that I could capture today?',
        'Can I share one creative thought or piece with someone else?',
        'Creativity flows through me when I give myself permission to explore and experiment.',
        'I embrace imperfection as a natural part of the creative process.',
        'Every idea is a seed; I nurture it with attention and care.',
        'I allow myself to play and experiment without judgment.',
        'Creativity is a muscle that grows stronger with use.',
        'I find inspiration in the world around me and within myself.',
        'My unique perspective is a valuable contribution to the world.',
        'I trust my creative instincts and follow where they lead.'
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
      // Move quoteCard above prompt in DOM
      const main = document.querySelector('main');
      if (main && main.contains(prompt) && main.contains(quoteCard)) {
        main.insertBefore(quoteCard, prompt);
      }
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
        // Move prompt back above quoteCard in DOM
        const main = document.querySelector('main');
        if (main && main.contains(prompt) && main.contains(quoteCard)) {
          main.insertBefore(prompt, quoteCard);
        }
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

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/lotus/service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch((err) => console.log("SW registration failed: ", err));
}
