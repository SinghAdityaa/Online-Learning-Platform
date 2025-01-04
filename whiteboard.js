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

// History for Undo/Redo
let history = [];
let historyIndex = -1;
let drawingHistory = []; // To track drawing actions

function resizeCanvas() {
  canvas.width = textArea.offsetWidth;
  canvas.height = textArea.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Drawing on canvas
canvas.addEventListener('mousedown', (e) => {
  if (e.target !== canvas) return; // Ensure drawing only on canvas
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  draw(e.offsetX, e.offsetY);
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  saveDrawingHistory(); // Save the drawing action on mouseup
});

canvas.addEventListener('mouseout', () => {
  isDrawing = false;
});

canvas.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Prevent scrolling on touch
  const rect = canvas.getBoundingClientRect();
  startDrawing(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Prevent scrolling on touch
  const rect = canvas.getBoundingClientRect();
  draw(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
});

canvas.addEventListener('touchend', () => {
  isDrawing = false;
  saveDrawingHistory(); // Save the drawing action on touchend
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

  // Store the drawing actions in drawingHistory
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

// Adding new text element
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
  newText.focus(); // Focus on the new text for editing
  saveHistory(); // Save the state after adding new text
}

// Dragging the text element
function startDrag(event) {
  event.stopPropagation(); // Prevent conflict with canvas drawing
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
  saveHistory(); // Save the state after dragging
}

// Enable drawing mode (deactivate eraser)
function toggleDrawingMode() {
  isEraser = false;
  canvas.style.pointerEvents = 'auto'; // Re-enable drawing
  clearTextSelection();
  saveHistory(); // Save state
}

// Activate eraser mode
function activateEraser() {
  isEraser = true;
}

// Clear text selection (remove focus from text elements)
function clearTextSelection() {
  document.querySelectorAll('.text-element').forEach((el) => {
    el.blur(); // Remove focus from all text elements
  });
}

// Handle dropdown toggle
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

// Save canvas and text history
function saveHistory() {
  const snapshot = {
    html: textArea.innerHTML,
    drawingHistory: [...drawingHistory], // Clone the drawing history
  };

  history = history.slice(0, historyIndex + 1); // Trim any forward history after a new action
  history.push(snapshot);
  historyIndex++;
}

// Restore previous state
function restoreHistory() {
  const snapshot = history[historyIndex];
  textArea.innerHTML = snapshot.html;

  // Reinitialize events for text elements
  document.querySelectorAll('.text-element').forEach((textElement) => {
    textElement.addEventListener('mousedown', startDrag);
  });

  // Restore canvas drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawingHistory = snapshot.drawingHistory; // Restore drawing history

  // Redraw all strokes
  drawingHistory.forEach((stroke) => {
    ctx.strokeStyle = stroke.strokeStyle;
    ctx.lineWidth = stroke.lineWidth;
    ctx.beginPath();
    ctx.moveTo(stroke.x1, stroke.y1);
    ctx.lineTo(stroke.x2, stroke.y2);
    ctx.stroke();
  });
}

// Undo action
function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    restoreHistory();
  }
}

// Redo action
function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    restoreHistory();
  }
}
