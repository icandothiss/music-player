const musicContainer = document.querySelector(".music-container");
const playBTN = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Song titles
const songs = ["hey", "summer", "ukulele"];

// keey track of songs
let songIndex = 2;

// Initially load song info DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBTN.querySelector("i.fas").classList.remove("fa-play");
  playBTN.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  playBTN.querySelector("i.fas").classList.add("fa-play");
  playBTN.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  let percentage = (e.srcElement.currentTime / e.srcElement.duration) * 100;
  progress.style.width = `${percentage}%`;
}

function songEnd() {
  nextSong();
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  let percentage = clickX / width;
  audio.currentTime = audio.duration * percentage;
}

// Event listeners
playBTN.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", songEnd);

progressContainer.addEventListener("click", setProgress);
