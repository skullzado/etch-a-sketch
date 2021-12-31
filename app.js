const container = document.getElementById('container');
const gridContainer = document.createElement('div');
const clearBtn = document.createElement('button');

const GRID_CONTAINER_SIZE = 512;

container.appendChild(clearBtn);
container.appendChild(gridContainer);

gridContainer.classList.add('grid-container');
clearBtn.textContent = 'Clear';
clearBtn.classList.add('btn');
clearBtn.addEventListener('click', clickHandler);

function createGrid(grid = 16) {
	const GRID_SIZE = GRID_CONTAINER_SIZE / grid;
	const DIV_NUMBER = grid ** 2;

	const div = document.querySelectorAll('.grid');

	if (div.length) {
		Array.from(div).forEach((d) => gridContainer.removeChild(d));
		clearGrid();
	}

	for (let i = 0; i < DIV_NUMBER; i++) {
		const div = document.createElement('div');
		div.classList.add('grid');
		div.style.width = `${GRID_SIZE}px`;
		div.style.height = `${GRID_SIZE}px`;
		div.addEventListener('mouseenter', drawHandler);
		gridContainer.appendChild(div);
	}
}

function drawHandler(event) {
	const div = event.target;
	const bgColor = div.style.backgroundColor.match(/\d+/g);
	if (!bgColor) {
		div.style.backgroundColor = `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
	} else {
		div.style.backgroundColor = `rgb(${incrementColor(
			bgColor[0]
		)},${incrementColor(bgColor[1])},${incrementColor(bgColor[2])})`;
	}
	div.classList.add('active');
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

function clearGrid() {
	const div = document.querySelectorAll('.grid');
	[...div].forEach((d) => d.classList.remove('active'));
}

function clickHandler() {
	let newGrid = parseInt(prompt('Enter grid size: '));
	if (!Number(newGrid) || (newGrid > 100 && newGrid < 0)) {
		para.textContent = 'Please enter a valid number.';
		container.appendChild(para);
		newGrid = prompt('Enter grid size: ');
	}

	createGrid(newGrid);
}

createGrid();

function randomNumber() {
	return Math.floor(Math.random() * 255);
}

function randomColorGenerator(element) {
	element.style.backgroundColor = `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`;
}
