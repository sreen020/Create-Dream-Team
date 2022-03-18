// Show the drag and drop functionalities only if javascript is enabled and remove selects
const loadPage = () => {
	const selects = document.querySelectorAll('.player-select');
	const dnds = document.querySelectorAll('.position-name');
	selects.forEach((select) => {
		select.classList.add('hidden');
	});

	dnds.forEach((dnd) => {
		dnd.classList.remove('hidden');
	});
};

loadPage();

// when user drags show dropHereIndicator (timeout is nessesary otherwise drag isn't possible)
const onDragStart = (event) => {
	event.dataTransfer.setData('text/plain', event.target.id);

	const dropHereIndicator = document.getElementById('drop-here');
	setTimeout(() => {
		dropHereIndicator.classList.remove('hidden');
	}, 200);
	const container = event.target.parentNode;

	if (container.querySelector('.position-name')) {
		container.querySelector('.position-name').classList.remove('hidden');
	}
};

const onDragOver = (event) => {
	event.preventDefault();
};

// append the dragged object to the dropzone
// checks the drop element. If its a p element drop it on the parent
const onDrop = (event) => {
	const id = event.dataTransfer.getData('text');

	const draggableElement = document.getElementById(id);

	let dropzone;
	if (event.target.tagName.toLowerCase() === 'p') {
		dropzone = event.target.parentNode;
	} else {
		dropzone = event.target;
	}

	if (dropzone.querySelector('.position-name')) {
		dropzone.querySelector('.position-name').classList.add('hidden');
	}

	dropzone.appendChild(draggableElement);

	const dropHereIndicator = document.getElementById('drop-here');
	dropHereIndicator.classList.add('hidden');

	event.dataTransfer.clearData();
};
