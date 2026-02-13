const panels = document.querySelectorAll(".panel");

function switchPanel(from, to) {
    from.classList.remove("active");
    setTimeout(() => {
        to.classList.add("active");
    }, 400);
}

/* MAIN BUTTONS */
const mainPanel = document.getElementById("mainPanel");
const noPanel = document.getElementById("noPanel");
const yesPanel = document.getElementById("yesPanel");

document.getElementById("yesBtn").onclick = () => switchPanel(mainPanel, yesPanel);

document.getElementById("noBtn").onclick = () => {
    switchPanel(mainPanel, noPanel);
    setTimeout(() => switchPanel(noPanel, mainPanel), 4500);
};

/* GIFTS */
const gift1 = document.getElementById("gift1");
const gift2 = document.getElementById("gift2");
const gift3 = document.getElementById("gift3");

const songPanel = document.getElementById("songPanel");
const gift2Panel = document.getElementById("gift2Panel");
const gift3Panel = document.getElementById("gift3Panel");

gift1.onclick = () => switchPanel(yesPanel, songPanel);
gift2.onclick = () => {
    switchPanel(yesPanel, gift2Panel);
    startHearts();
};
gift3.onclick = () => switchPanel(yesPanel, gift3Panel);

/* BACK BUTTONS */
document.getElementById("backFromSong").onclick = () => {
    audio.pause();
    audio.currentTime = 0;
    playBtn.textContent = "▶";
    switchPanel(songPanel, yesPanel);
};

document.getElementById("backFromGift2").onclick = () => {
    stopHearts();
    switchPanel(gift2Panel, yesPanel);
};

document.getElementById("backFromGift3").onclick = () => switchPanel(gift3Panel, yesPanel);

/* MUSIC PLAYER */
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");

playBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
};

audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    }
});

progressBar.oninput = () => {
    if (!isNaN(audio.duration)) {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    }
};

/* HEARTS FIXED */
let heartInterval;
const heartsContainer = document.getElementById("heartsContainer");

function startHearts() {
    clearInterval(heartInterval);

    heartInterval = setInterval(() => {
        const heart = document.createElement("img");
        heart.src = "img/heart.png";
        heart.classList.add("heart-img");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "0px";
        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 4000);
    }, 500);
}

function stopHearts() {
    clearInterval(heartInterval);
}
