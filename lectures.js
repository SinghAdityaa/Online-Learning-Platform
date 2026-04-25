// Dropdown toggle
function toggleMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close dropdown
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

// 🎥 Update progress based on video time
videoPlayer.addEventListener("timeupdate", () => {
  if (videoPlayer.duration) {
    let percent = Math.round((videoPlayer.currentTime / videoPlayer.duration) * 100);
    progressText.innerText = `Progress: ${percent}%`;
  }
});

// 🔁 Change video when clicking lesson
lessons.forEach((lesson) => {
  lesson.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    lesson.classList.add("active");

    const videoSrc = lesson.getAttribute("data-video");
    videoPlayer.src = videoSrc;

    // Reset progress when new video loads
    progressText.innerText = "Progress: 0%";
  });
});

// ✅ Mark as complete → force 100%
completeBtn.addEventListener("click", () => {
  videoPlayer.currentTime = videoPlayer.duration; // jump to end
  progressText.innerText = "Progress: 100%";
});