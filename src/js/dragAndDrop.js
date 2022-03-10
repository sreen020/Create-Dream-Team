function onDragStart(event) {
	event.dataTransfer.setData('text/plain', event.target.id);

	console.log('THIS', event.target.parentNode);
	const container = event.target.parentNode;

	if (container.querySelector('.position-name')) {
		container.querySelector('.position-name').classList.remove('hidden');
	}
}

function onDragOver(event) {
	event.preventDefault();
}

function onDrop(event) {
	console.log(event.target);
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

	event.dataTransfer.clearData();
}
