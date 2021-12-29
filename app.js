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

createGrid(32);

function drawHandler(event) {
	const div = event.target;
	div.classList.add('active');
}

function clearGrid() {
	const div = document.querySelectorAll('.grid');
	[...div].forEach((d) => d.classList.remove('active'));
}

function clickHandler() {
	const para = document.createElement('p');
	let newGrid = prompt('Enter grid size: ');
	if (!Number(newGrid) || (newGrid > 100 && newGrid > 0)) {
		para.textContent = 'Please enter a valid number.';
		container.appendChild(para);
		newGrid = prompt('Enter grid size: ');
	}
	clearGrid();
	createGrid(newGrid);
}
