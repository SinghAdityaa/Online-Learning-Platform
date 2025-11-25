const lessons = document.querySelectorAll("#lessonList li");
const videoPlayer = document.getElementById("videoPlayer");
const completeBtn = document.getElementById("completeBtn");
const progressText = document.getElementById("progressText");

let completed = new Set();

lessons.forEach((lesson) => {
  lesson.addEventListener("click", () => {
    lessons.forEach((l) => l.classList.remove("active"));
    lesson.classList.add("active");
    videoPlayer.src = lesson.getAttribute("data-video");
    videoPlayer.play();
  });
});

completeBtn.addEventListener("click", () => {
  const currentLesson = document.querySelector("#lessonList li.active");
  if (currentLesson) {
    completed.add(currentLesson.textContent);
    const progress = Math.round((completed.size / lessons.length) * 100);
    progressText.textContent = `Progress: ${progress}%`;
  }
});

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let d of dropdowns) {
      if (d.classList.contains('show')) {
        d.classList.remove('show');
      }
    }
  }
}

