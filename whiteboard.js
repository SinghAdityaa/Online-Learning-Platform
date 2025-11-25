let textArea = document.getElementById('textArea');
let canvas = document.getElementById('drawingCanvas');
let ctx = canvas.getContext('2d');
let isDrawing = false;
let isEraser = false;
let lastX = 0;
let lastY = 0;
let currentElement = null;
let offsetX = 0;
let offsetY = 0;

let history = [];
let historyIndex = -1;
let drawingHistory = []; 

function resizeCanvas() {
  canvas.width = textArea.offsetWidth;
  canvas.height = textArea.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

canvas.addEventListener('mousedown', (e) => {
  if (e.target !== canvas) return; 
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  draw(e.offsetX, e.offsetY);
});

<<<<<<< HEAD
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  saveDrawingHistory(); 
=======
<<<<<<< HEAD
canvas.addEventListener('mouseup', () => 
  isDrawing = false;
  drawingHistory(); 
=======
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  saveDrawingHistory(); 
>>>>>>> 821f09efead0527444d9b861ef198c9391862896
>>>>>>> 394a439 (Initial commit)
});

canvas.addEventListener('mouseout', () => {
  isDrawing = false;
});

canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); 
  const rect = canvas.getBoundingClientRect();
<<<<<<< HEAD
  startDrawing(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
=======
<<<<<<< HEAD
  startDrag(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
=======
  startDrawing(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
>>>>>>> 821f09efead0527444d9b861ef198c9391862896
>>>>>>> 394a439 (Initial commit)
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault(); 
  const rect = canvas.getBoundingClientRect();
  draw(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
});

canvas.addEventListener('touchend', () => {
  isDrawing = false;
<<<<<<< HEAD
  saveDrawingHistory(); 
=======
<<<<<<< HEAD
  drawingHistory(); 
=======
  saveDrawingHistory(); 
>>>>>>> 821f09efead0527444d9b861ef198c9391862896
>>>>>>> 394a439 (Initial commit)
});

function draw(x, y) {
  ctx.strokeStyle = isEraser ? 'white' : 'black';
  ctx.lineWidth = isEraser ? 10 : 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

 
  drawingHistory.push({
    x1: lastX,
    y1: lastY,
    x2: x,
    y2: y,
    strokeStyle: ctx.strokeStyle,
    lineWidth: ctx.lineWidth,
  });

  [lastX, lastY] = [x, y];
}

function addText() {
  let newText = document.createElement('div');
  newText.classList.add('text-element');
  newText.setAttribute('contenteditable', 'true');
  newText.style.position = 'absolute';
  newText.style.left = '10px';
  newText.style.top = '10px';
  newText.textContent = 'New Text';
  newText.addEventListener('mousedown', startDrag);
  textArea.appendChild(newText);
  newText.focus(); 
  saveHistory(); 
}

function startDrag(event) {
  event.stopPropagation(); 
  currentElement = event.target;
  offsetX = event.clientX - currentElement.getBoundingClientRect().left;
  offsetY = event.clientY - currentElement.getBoundingClientRect().top;
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}

function drag(event) {
  if (currentElement) {
    let x = event.clientX - offsetX;
    let y = event.clientY - offsetY;
    let maxX = textArea.clientWidth - currentElement.offsetWidth;
    let maxY = textArea.clientHeight - currentElement.offsetHeight;
    currentElement.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
    currentElement.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
  }
}

function stopDrag() {
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
  currentElement = null;
  saveHistory(); 
}

function toggleDrawingMode() {
  isEraser = false;
  canvas.style.pointerEvents = 'auto'; 
  clearTextSelection();
  saveHistory(); 
}

function activateEraser() {
  isEraser = true;
}

function clearTextSelection() {
  document.querySelectorAll('.text-element').forEach((el) => {
    el.blur(); 
  });
}

function myFunction() {
  const dropdown = document.getElementById('myDropdown');
  dropdown.classList.toggle('show');
}

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

function saveHistory() {
  const snapshot = {
    html: textArea.innerHTML,
    drawingHistory: [...drawingHistory],
  };

  history = history.slice(0, historyIndex + 1); 
  history.push(snapshot);
  historyIndex++;
}

function restoreHistory() {
  const snapshot = history[historyIndex];
  textArea.innerHTML = snapshot.html;

  document.querySelectorAll('.text-element').forEach((textElement) => {
    textElement.addEventListener('mousedown', startDrag);
  });

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawingHistory = snapshot.drawingHistory;

  drawingHistory.forEach((stroke) => {
    ctx.strokeStyle = stroke.strokeStyle;
    ctx.lineWidth = stroke.lineWidth;
    ctx.beginPath();
    ctx.moveTo(stroke.x1, stroke.y1);
    ctx.lineTo(stroke.x2, stroke.y2);
<<<<<<< HEAD
    ctx.stroke();
=======
<<<<<<< HEAD
    ctx.stroke(); w
=======
    ctx.stroke();
>>>>>>> 821f09efead0527444d9b861ef198c9391862896
>>>>>>> 394a439 (Initial commit)
  });
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
