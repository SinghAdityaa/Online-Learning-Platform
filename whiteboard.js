let textArea = document.getElementById('textArea');
let canvas = document.getElementById('drawingCanvas');
let ctx = canvas.getContext('2d');
let isDrawing = false;
let isEraser = false;
let lastX = 0;
let lastY = 0;
let history = [];
let historyIndex = -1;
let currentElement = null;
let offsetX = 0;
let offsetY = 0;

function resizeCanvas() {
  canvas.width = textArea.offsetWidth;
  canvas.height = textArea.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  saveHistory();
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = isEraser ? 'white' : 'black';
  ctx.lineWidth = isEraser ? 10 : 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function activateEraser() {
  isEraser = true;
}

function toggleDrawingMode() {
  let drawingMode = canvas.style.pointerEvents === 'none';
  canvas.style.pointerEvents = drawingMode ? 'auto' : 'none';
  isEraser = false; // Reset eraser mode when toggling drawing
}

function addText() {
  let newText = document.createElement('div');
  newText.classList.add('text-element');
  newText.setAttribute('contenteditable', 'true');
  newText.style.left = '10px';
  newText.style.top = '10px';
  newText.textContent = 'New Text';
  newText.addEventListener('mousedown', startDrag);
  newText.addEventListener('click', () => {
    currentElement = newText;
  });
  textArea.appendChild(newText);
  currentElement = newText;
  saveHistory();
}

function startDrag(event) {
  if (event.target.classList.contains('text-element')) {
    currentElement = event.target;
    offsetX = event.clientX - currentElement.getBoundingClientRect().left;
    offsetY = event.clientY - currentElement.getBoundingClientRect().top;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  }
}

function drag(event) {
  if (currentElement) {
    let x = event.clientX - offsetX;
    let y = event.clientY - offsetY;
    let maxX = textArea.clientWidth - currentElement.offsetWidth;
    let maxY = textArea.clientHeight - currentElement.offsetHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    currentElement.style.left = `${x}px`;
    currentElement.style.top = `${y}px`;
  }
}

function stopDrag() {
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
  saveHistory();
}

function changeFont() {
  let font = document.getElementById('fontSelect').value;
  if (currentElement) {
    currentElement.style.fontFamily = font;
    saveHistory();
  }
}

function changeFontSize() {
  let size = document.getElementById('fontSize').value + 'px';
  if (currentElement) {
    currentElement.style.fontSize = size;
    saveHistory();
  }
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    restoreHistory();
  }
}

function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    restoreHistory();
  }
}

function saveHistory() {
  const snapshot = {
    html: textArea.innerHTML,
    canvas: canvas.toDataURL(),
  };
  history = history.slice(0, historyIndex + 1);
  history.push(snapshot);
  historyIndex++;
}

function restoreHistory() {
  const snapshot = history[historyIndex];
  textArea.innerHTML = snapshot.html;
  const img = new Image();
  img.src = snapshot.canvas;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
 
}

document.addEventListener("DOMContentLoaded", function() {
  function myFunction() {
    const dropdown = document.getElementById('myDropdown');
    dropdown.classList.toggle('show');
  }

  const menuButton = document.querySelector('.dropbtn');
  menuButton.addEventListener('click', myFunction);
});
