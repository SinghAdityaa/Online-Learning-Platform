const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuBtn.onclick = () => {
  sidebar.classList.add("active");
  overlay.style.display = "block";
};

overlay.onclick = () => {
  sidebar.classList.remove("active");
  overlay.style.display = "none";
};