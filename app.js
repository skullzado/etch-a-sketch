const container = document.getElementById('container');
const btnContainer = document.createElement('div');
const gridPanelContainer = document.createElement('div');
const gridContainer = document.createElement('div');
const clearBtn = document.createElement('button');
const originalBtn = document.createElement('button');
const eraseBtn = document.createElement('button');
const randomColorBtn = document.createElement('button');
const gradientBtn = document.createElement('button');
const randomGradientBtn = document.createElement('button');
const sliderContainer = document.createElement('div');
const slider = document.createElement('input');
const sliderValue = document.createElement('p');

const GRID_CONTAINER_SIZE = 512;

const ORIGINAL_MODE = 'Black&White';
const RANDOMIZE_MODE = 'RandomizeColor';
const GRADIENT_MODE = 'GradientColor';
const RANDOMIZE_GRADIENT_MODE = 'RandomizeGradientColor';
const ERASE_MODE = 'Erase';

let drawMode = ORIGINAL_MODE;

container.appendChild(btnContainer);
container.appendChild(gridPanelContainer);
btnContainer.appendChild(clearBtn);
btnContainer.appendChild(originalBtn);
btnContainer.appendChild(eraseBtn);
btnContainer.appendChild(randomColorBtn);
btnContainer.appendChild(gradientBtn);
btnContainer.appendChild(randomGradientBtn);
gridPanelContainer.appendChild(sliderContainer);
gridPanelContainer.appendChild(gridContainer);
sliderContainer.appendChild(slider);
sliderContainer.appendChild(sliderValue);

gridContainer.classList.add('grid-container');
btnContainer.classList.add('btn-container');
gridPanelContainer.classList.add('grid-panel-container');

originalBtn.classList.add('btn');
eraseBtn.classList.add('btn');
clearBtn.classList.add('btn');
randomColorBtn.classList.add('btn');
gradientBtn.classList.add('btn');
randomGradientBtn.classList.add('btn');

sliderContainer.classList.add('slider-container');
slider.classList.add('slider');
sliderValue.classList.add('slider-value');

slider.type = 'range';
slider.min = 1;
slider.max = 100;
slider.value = 16;
slider.step = 1;

sliderValue.textContent = `${slider.value} x ${slider.value}`;

clearBtn.textContent = 'Clear';
originalBtn.textContent = 'Normal';
eraseBtn.textContent = 'Eraser';
randomColorBtn.textContent = 'Randomize';
gradientBtn.textContent = 'Gray Gradient';
randomGradientBtn.textContent = 'Random Gradient';

clearBtn.addEventListener('click', clearGrid);
originalBtn.addEventListener('click', () => drawModeHandler(ORIGINAL_MODE));
eraseBtn.addEventListener('click', () => drawModeHandler(ERASE_MODE));
randomColorBtn.addEventListener('click', () => drawModeHandler(RANDOMIZE_MODE));
gradientBtn.addEventListener('click', () => drawModeHandler(GRADIENT_MODE));
randomGradientBtn.addEventListener('click', () =>
	drawModeHandler(RANDOMIZE_GRADIENT_MODE)
);
slider.addEventListener('change', (event) => resetGrid(event.target.value));
slider.addEventListener('mousemove', (event) =>
	updateSliderValueText(event.target.value)
);

function createGrid(grid = 16) {
	const gridSize = GRID_CONTAINER_SIZE / grid;
	const divNumber = grid ** 2;

	const div = document.querySelectorAll('.grid');

	if (div.length) {
		Array.from(div).forEach((d) => gridContainer.removeChild(d));
		clearGrid();
	}

	for (let i = 0; i < divNumber; i++) {
		const div = document.createElement('div');
		div.classList.add('grid');
		div.style.width = `${gridSize}px`;
		div.style.height = `${gridSize}px`;
		div.addEventListener('mouseenter', drawHandler);
		gridContainer.appendChild(div);
	}
}

function drawModeHandler(mode) {
	drawMode = mode;
	console.log(drawMode);
}

function drawHandler(event) {
	const div = event.target;

	switch (drawMode) {
		case ORIGINAL_MODE:
			blackAndWhiteHandler(div, 'black');
			break;
		case ERASE_MODE:
			blackAndWhiteHandler(div, 'white');
			break;
		case RANDOMIZE_MODE:
			randomizeColorHandler(div);
			break;
		case GRADIENT_MODE:
			gradientColorHandler(div);
			break;
		case RANDOMIZE_GRADIENT_MODE:
			randomGradientColorHandler(div);
			break;
		default:
			return;
	}
}

function blackAndWhiteHandler(element, color) {
	element.style.backgroundColor = color;
	if (color === 'white') {
		element.classList.remove('active');
	} else {
		element.classList.add('active');
	}
}

function clearGrid() {
	const div = document.querySelectorAll('.grid');
	[...div].forEach((d) => {
		d.style.backgroundColor = 'white';
		d.classList.remove('active');
	});
}

function resetGrid(value) {
	drawMode = ORIGINAL_MODE;
	createGrid(value);
}

function updateSliderValueText(value) {
	sliderValue.textContent = `${value} x ${value}`;
}

function randomizeColorHandler(element) {
	element.style.backgroundColor = `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
	element.classList.add('active');
}

function gradientColorHandler(element) {
	const bgColor = element.style.backgroundColor.match(/\d+/g);

	if (!bgColor) {
		element.style.backgroundColor = `rgb(225,225,225)`;
	} else {
		element.style.backgroundColor = `rgb(${incrementColor(
			bgColor[0]
		)},${incrementColor(bgColor[1])},${incrementColor(bgColor[2])})`;
	}
	element.classList.add('active');
}

function randomGradientColorHandler(element) {
	const bgColor = element.style.backgroundColor.match(/\d+/g);

	if (!bgColor) {
		element.style.backgroundColor = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
	} else {
		element.style.backgroundColor = `rgb(${incrementColor(
			bgColor[0]
		)},${incrementColor(bgColor[1])},${incrementColor(bgColor[2])})`;
	}
	element.classList.add('active');
}

// Helper functions
function randomNumber() {
	return Math.floor(Math.random() * 255);
}

function incrementColor(color) {
	let parsedColor = parseInt(color);
	let newColor;

	if (parsedColor <= 25) {
		newColor = 0;
	} else if (parsedColor <= 255 || parsedColor >= 25) {
		newColor = parsedColor - 25;
	}

	return newColor.toString();
}

createGrid();
