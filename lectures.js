// Toggle dropdown
function toggleMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close dropdown outside click
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    document.getElementById("myDropdown").classList.remove("show");
  }
};

// Elements
const lessons = document.querySelectorAll("#lessonList li");
const videoPlayer = document.getElementById("videoPlayer");
const progressText = document.getElementById("progressText");
const completeBtn = document.getElementById("completeBtn");

// Track video progress
videoPlayer.addEventListener("timeupdate", () => {
  if (videoPlayer.duration) {
    let percent = Math.round((videoPlayer.currentTime / videoPlayer.duration) * 100);
    progressText.innerText = `Progress: ${percent}%`;
  }
});

// Reset progress on new video
videoPlayer.addEventListener("loadedmetadata", () => {
  progressText.innerText = "Progress: 0%";
});

// Change video
lessons.forEach((lesson) => {
  lesson.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    lesson.classList.add("active");

    videoPlayer.src = lesson.getAttribute("data-video");
  });
});

// Mark complete
completeBtn.addEventListener("click", () => {
  videoPlayer.currentTime = videoPlayer.duration;
  progressText.innerText = "Progress: 100%";
});