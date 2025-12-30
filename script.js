// 🎵 AUDIO
const menuMusic = new Audio('Sounds/cotton-toys-soundroll-main-version-16753-01-17.mp3');
const gameMusic = new Audio('Sounds/boogie-pecan-pie-main-version-41135-02-14.mp3');
const clickSound = new Audio('Sounds/whoosh-clean-fast-bosnow-3-3-00-00.mp3');
const matchSound = new Audio('Sounds/zapsplat_multimedia_game_sound_classic_arcade_rise_beam_up_open_level_113890.mp3');

menuMusic.loop = true;
gameMusic.loop = true;

menuMusic.volume = 0.2;
gameMusic.volume = 0.2;

let muted = false;

// 🧠 GAME STATE
let level = 1;
let score = 0;
let matchesFound = 0;
let firstCard = null;
let lockBoard = false;

// 🦎 CARD IMAGES
const images = [
    'Images/Bibron’s Stiletto snake.png',
    'Images/black file snake.png',
    'Images/black headed centipede eater.png',
    'Images/Black mamba.png',
    'Images/common brown house snake.png',
    'Images/common purple-glossed sanke.png',
    'Images/common rhombic_egg eater.png',
    'Images/common wolf snake.png',
    'Images/east african shovel-snout.png',
    'Images/eastern bark mopane eater.png',
    'Images/eastern tiger snake.png',
    'Images/female boomslang.png',
    'Images/Herald_Red-lipped Snake.png',
    'Images/intermediate-shield nosed snake.png',
    'Images/male boomslang.png',
    'Images/marbled tree snake.png',
    'Images/Mozambique spitting cobra.png',
    'Images/olive grass snake.png',
    'Images/puff adder.png',
    'Images/Reticulated centipede eater.png',
    'Images/Schlegel’s Beaked Blind Snake.png',
    'Images/Snouted Cobra.png',
    'Images/snouted night adder.png',
    'Images/southern african python.png',
    'Images/southern vine snake.png',
    'Images/spotted bush snake.png',
    'Images/thread snakes.png',
    'Images/variegated wolf snake.png',
    'Images/Western Stripe-bellied Sand Snake.png',
    'Images/Zambesi garter snake.png'
];

const gameBoard = document.getElementById('gameBoard');

menuMusic.play();

// 🎮 MENU
function startGame() {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('gameUI').classList.remove('hidden');

    menuMusic.pause();
    gameMusic.play();

    startLevel();
}

function toggleMute() {
    muted = !muted;
    [menuMusic, gameMusic, clickSound, matchSound].forEach(s => s.muted = muted);
}

// 🧩 LEVELS
function startLevel() {
    matchesFound = 0;
    document.getElementById('levelDisplay').textContent = level;
    gameBoard.innerHTML = '';

    let pairs = level === 1 ? 3 : 6;
    let columns = level === 1 ? 3 : 4;

   gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;


    let selected = images.slice(0, pairs);
    let cards = [...selected, ...selected].sort(() => Math.random() - 0.5);

    cards.forEach(img => createCard(img));
}

// 🃏 CARD CREATION
function createCard(img) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-face card-back">
                <img src="images/back.png">
            </div>
            <div class="card-face card-front">
                <img src="${img}">
            </div>
        </div>
    `;

    card.dataset.image = img;
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
}

// 🔁 GAME LOGIC
function flipCard(card) {
    if (lockBoard || card.classList.contains('flipped')) return;

    clickSound.play();
    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card;
        return;
    }

    checkMatch(card);
}

function checkMatch(secondCard) {
    lockBoard = true;

    if (firstCard.dataset.image === secondCard.dataset.image) {
        matchSound.play();
        score += 100;
        matchesFound++;
        document.getElementById('score').textContent = score;

        resetTurn();

        if (matchesFound === (level === 1 ? 3 : 6)) nextLevel();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    lockBoard = false;
}

// ⏭ AUTO-ADVANCE
function nextLevel() {
    setTimeout(() => {
        level++;
        if (level > 3) {
            alert("🎉 Game Complete!");
            gameMusic.pause();
        } else {
            startLevel();
        }
    }, 1000);
function startGame() {
}
}
function goToMenu() {
    console.log("Menu clicked");

    gameMusic.pause();
    menuMusic.currentTime = 0;
    menuMusic.play();

    document.getElementById('gameUI').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');

    level = 1;
    score = 0;
    matchesFound = 0;
    document.getElementById('score').textContent = score;
    gameBoard.innerHTML = '';
}
