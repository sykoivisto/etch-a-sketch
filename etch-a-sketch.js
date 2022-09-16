const colorPicker = document.getElementById('color-picker-button');
const colorModeButton = document.getElementById('color-mode-button');
const blackModeButton = document.getElementById('black-mode-button');
const eraserModeButton = document.getElementById('eraser-mode-button');
const clearButton = document.getElementById('clear-button');
const canvas = document.getElementById('canvas');

colorPicker.oninput = (e) => setColor(e.target.value);
colorModeButton.onclick = () => setMode('color', colorModeButton);
blackModeButton.onclick = () => setMode('black', blackModeButton);
eraserModeButton.onclick = () => setMode('eraser', eraserModeButton);
clearButton.onclick = () => resetCanvas();

let color = colorPicker.value;
let mode = {
    mode: 'color',
    button: colorModeButton
};

function setColor(newColor) {
    color = newColor;
}

function setMode(newMode, newActiveButton) {
    activateButton(newActiveButton);

    mode.mode = newMode;
    mode.button = newActiveButton;
}

// see if user is currently trying to draw. mouse must be down to draw
let drawing = false;
document.body.onmousedown = () => (drawing = true);
document.body.onmouseup = () => (drawing = false);

function createCanvas() {
    for (let i = 0; i < 625; i++) {
        const pixel = document.createElement('div');
        pixel.addEventListener('mouseover', draw);
        canvas.appendChild(pixel);
    }
}

function resetCanvas() {
    canvas.innerHTML = '';
    createCanvas();
}

function draw(e) {
    if (e.type === 'mouseover' && !drawing) return
    switch (mode.mode) {
        case 'color':
            e.target.style.backgroundColor = color;
            break;
        case 'black':
            e.target.style.backgroundColor = '#000000';
            break;
        case 'eraser':
            e.target.style.backgroundColor = '#fff';
            break;
    }
}

function activateButton(newActiveButton) {
    mode.button.classList.remove('active');
    newActiveButton.classList.add('active');
}

window.onload = () => {
    createCanvas();
    activateButton(mode.button)
}