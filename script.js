// ==========================================
// 1. NAVEGACIÓN ENTRE PANTALLAS
// ==========================================

const screens = document.querySelectorAll(".screen");
const navItems = document.querySelectorAll(".nav-item");

function goToScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    navItems.forEach(item => {
        item.classList.toggle(
            "active",
            item.dataset.go === screenId
        );
    });

    const destination = document.getElementById(screenId);

    if (destination) {
        destination.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
        goToScreen(button.dataset.go);
    });
});


// ==========================================
// 2. SOBRE DE BIENVENIDA
// ==========================================

const envelope = document.getElementById("openEnvelope");
const envelopeHint = document.getElementById("envelopeHint");

envelope.addEventListener("click", () => {
    if (envelope.classList.contains("opened")) return;

    envelope.classList.add("opened");

    envelopeHint.textContent =
        "UNA HISTORIA QUE QUIERO COMPARTIR CONTIGO ♡";

    setTimeout(() => {
        goToScreen("story");
    }, 1200);
});


// ==========================================
// 3. HISTORIA INTERACTIVA
// ==========================================

const chapters = [
    {
        label: "CUARTO DE SECUNDARIA",
        title: "Cuando nos conocimos",
        text: "Todo comenzó cuando éramos compañeros de cuarto de secundaria. En aquel momento todavía no imaginaba lo importante que llegarías a ser para mí. Simplemente eras una compañera con la que, sin saberlo, comenzaría una historia muy especial."
    },
    {
        label: "QUINTO DE SECUNDARIA",
        title: "Una amistad que creció",
        text: "Fui yo quien empezó a hablarte. Al principio éramos amigos, compartíamos conversaciones y poco a poco fui conociéndote más. Con el tiempo empecé a darme cuenta de que lo que sentía por ti ya no era solamente una amistad. Tu actitud, tu carisma y tu forma de ser hicieron que empezaras a ocupar un lugar muy especial en mi vida."
    },
    {
        label: "EXPERIENCIA VACACIONAL DE CAS · SANTA APOLONIA",
        title: "El día que me atreví a decírtelo",
        text: "Ese día tenía algo que quería decirte, pero no encontraba la manera de hacerlo. Me tardé muchísimo porque los nervios podían más que yo. Cada vez que me preguntabas qué era lo que quería decirte, me ponía todavía más nervioso. Incluso mis compañeros, que estaban esperando, terminaron yéndose. Pero, después de tantas vueltas, finalmente llegó el momento de decirte lo que sentía. Quizá no encontré las palabras rápidamente, pero lo que sentía por ti era completamente sincero."
    },
    {
        label: "18 DE ENERO DE 2026",
        title: "Nuestra fecha especial",
        text: "El 18 de enero de 2026 comenzó oficialmente nuestra relación. Es una fecha que siempre voy a recordar porque marca el inicio de una etapa muy bonita de mi vida: la de poder compartir contigo algo que había comenzado tiempo atrás, entre conversaciones, amistad y sentimientos."
    }
];

const chapterCards = document.querySelectorAll(".chapter-card");
const chapterDetail = document.getElementById("chapterDetail");

chapterCards.forEach(card => {
    card.addEventListener("click", () => {
        const index = Number(card.dataset.chapter);
        const chapter = chapters[index];

        if (!chapter) return;

        document.getElementById("detailLabel").textContent =
            chapter.label;

        document.getElementById("detailTitle").textContent =
            chapter.title;

        document.getElementById("detailText").textContent =
            chapter.text;

        chapterDetail.classList.add("show");

        chapterDetail.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
});

document.getElementById("closeChapter").addEventListener("click", () => {
    chapterDetail.classList.remove("show");
});


// ==========================================
// 4. RECUERDO DE X-MEN
// ==========================================

const memoryButton = document.getElementById("memoryButton");
const memoryExtra = document.getElementById("memoryExtra");

memoryButton.addEventListener("click", () => {
    const isVisible = memoryExtra.classList.toggle("show");

    memoryButton.innerHTML = isVisible
        ? 'OCULTAR DETALLE <span>↑</span>'
        : 'DESCUBRIR DETALLE <span>↗</span>';
});


// ==========================================
// 5. CONTADOR DESDE EL 18/01/2026
// ==========================================

function updateCounter() {
    const startDate = new Date(2026, 0, 18, 0, 0, 0);
    const now = new Date();

    const difference = now.getTime() - startDate.getTime();

    if (difference < 0) return;

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCounter();

setInterval(updateCounter, 1000);


// ==========================================
// 6. REPRODUCTOR DE MÚSICA
// ==========================================

const music = document.getElementById("backgroundMusic");
const musicSource = document.getElementById("musicSource");
const musicButton = document.getElementById("musicButton");
const songSelect = document.getElementById("songSelect");
const musicDisc = document.getElementById("musicDisc");
const songName = document.getElementById("songName");
const musicStatus = document.getElementById("musicStatus");

const songs = {
    accidentally: {
        name: "Accidentally in Love",
        file: "assets/accidentally-in-love.mp3"
    },

    wonderwall: {
        name: "Wonderwall",
        file: "assets/wonderwall.mp3"
    }
};

function updateMusicInterface(playing) {
    musicButton.textContent = playing ? "Ⅱ" : "▶";

    musicDisc.classList.toggle("playing", playing);

    musicStatus.textContent = playing
        ? "Reproduciendo..."
        : "Música para nosotros";
}

musicButton.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();

            updateMusicInterface(true);

        } catch (error) {
            musicStatus.textContent = "No se pudo reproducir";

            alert(
                "Revisa que el archivo MP3 esté dentro de la carpeta assets."
            );
        }

    } else {
        music.pause();

        updateMusicInterface(false);
    }
});

songSelect.addEventListener("change", async () => {
    const selected = songs[songSelect.value];

    if (!selected) return;

    const wasPlaying = !music.paused;

    music.pause();

    musicSource.src = selected.file;

    music.load();

    songName.textContent = selected.name;

    updateMusicInterface(false);

    if (wasPlaying) {
        try {
            await music.play();

            updateMusicInterface(true);

        } catch (error) {
            musicStatus.textContent = "Pulsa reproducir";
        }
    }
});

music.addEventListener("ended", () => {
    updateMusicInterface(false);
});

music.addEventListener("pause", () => {
    updateMusicInterface(false);
});

music.addEventListener("play", () => {
    updateMusicInterface(true);
});


// ==========================================
// 7. ABRIR LA CARTA
// ==========================================

const letterEnvelope = document.getElementById("letterEnvelope");
const openLetterButton = document.getElementById("openLetter");
const letterModal = document.getElementById("letterModal");
const closeLetterButton = document.getElementById("closeLetter");

openLetterButton.addEventListener("click", () => {
    letterEnvelope.classList.add("opened");

    setTimeout(() => {
        letterModal.classList.add("show");

        document.body.style.overflow = "hidden";
    }, 450);
});

function closeLetter() {
    letterModal.classList.remove("show");

    document.body.style.overflow = "";
}

closeLetterButton.addEventListener("click", closeLetter);

letterModal.addEventListener("click", (event) => {
    if (event.target === letterModal) {
        closeLetter();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLetter();
    }
});


// ==========================================
// 8. VOLVER A EMPEZAR
// ==========================================

document.getElementById("restartButton").addEventListener("click", () => {

    closeLetter();

    envelope.classList.remove("opened");

    envelopeHint.textContent =
        "PULSA EL SOBRE PARA DESCUBRIR TU SORPRESA";

    letterEnvelope.classList.remove("opened");

    chapterDetail.classList.remove("show");

    memoryExtra.classList.remove("show");

    memoryButton.innerHTML =
        'DESCUBRIR DETALLE <span>↗</span>';

    goToScreen("home");
});


// ==========================================
// 9. ESTRELLAS DECORATIVAS
// ==========================================

const starsContainer = document.getElementById("stars");

for (let i = 0; i < 45; i++) {

    const star = document.createElement("span");

    star.className = "star";

    star.textContent = Math.random() > 0.5 ? "✦" : "·";

    star.style.left = Math.random() * 100 + "%";

    star.style.top = Math.random() * 100 + "%";

    star.style.fontSize =
        (7 + Math.random() * 10) + "px";

    star.style.animationDelay =
        (Math.random() * 4) + "s";

    star.style.animationDuration =
        (2 + Math.random() * 4) + "s";

    starsContainer.appendChild(star);
}