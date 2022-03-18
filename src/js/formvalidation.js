const form = document.querySelector('.form');

// List of field id's
const fields = [
	'firstname',
	'lastname',
	'email',
	'zipcode',
	'house_number',
	'city',
	'street_name',
	'password',
	'password_confirmation',
	'position',
	'footed',
	'experience',
	'matchday',
	'rating',
];

// On submit check the fields and run the validateFields function for each field
const validateOnSubmit = () => {
	form.addEventListener('submit', (e) => {
		// e.preventDefault();
		fields.forEach((field, index) => {
			const input = form.querySelector(`#${fields[index]}`);
			validateFields(input);
		});

		// TODO: submit form when no error is shown
	});
};

// Validate field when user is typing
const validateOnEntry = () => {
	fields.forEach((field, index) => {
		const input = form.querySelector(`#${fields[index]}`);
		input.addEventListener('input', (event) => {
			validateFields(input);
		});
	});
};

// Show error when field is empty (all fields)
// email - Check if the pattern is right and show error if not
// password confirmation - check if value and if value is the same as password value
// rating - Check if number is right amount if not show error
const validateFields = (field) => {
	if (field.value.trim() === '') {
		setStatus(
			field,
			`${field.previousElementSibling.innerText} Mag niet leeg zijn`,
			'error'
		);
	} else {
		setStatus(field, null, 'succes');
	}

	if (field.type === 'email') {
		// https://stackoverflow.com/questions/35788383/regex-validation-in-javascript-email
		const regix = /\S+@\S+\.\S+/;

		regix.test(field.value)
			? setStatus(field, null, 'succes')
			: setStatus(field, 'Onjuiste email ingevuld', 'error');
	}

	if (field.id === 'password_confirmation') {
		const passwordField = form.querySelector('#password');

		if (field.value.trim() === '') {
			setStatus(field, 'Password confermation is required', 'error');
		} else if (field.value !== passwordField.value) {
			setStatus(field, 'Wachtwoorden matchen niet!', 'error');
		} else {
			setStatus(field, null, 'succes');
		}
	}

	if (field.id === 'rating') {
		const passwordField = form.querySelector('#rating');

		if (field.value.trim() === '') {
			setStatus(field, 'Waarde mag niet leeg zijn', 'error');
		} else if (field.value < 1 || field.value > 100) {
			setStatus(field, 'Waarde moet tussen de 1 en de 100 zijn!', 'error');
		} else {
			setStatus(field, null, 'succes');
		}
	}
};

// This function is invoked by each input this function shows the succes or error status
// depending on the status a icon will show up to inform the user
// if error the field gets a red border class and error will be shown
const setStatus = (field, message, status) => {
	const succesIcon = field.parentElement.querySelector('.icon-success');
	const errorIcon = field.parentElement.querySelector('.icon-error');
	const errorMessage = field.parentElement.querySelector('.error-message');

	if (status === 'succes') {
		if (errorIcon) {
			errorIcon.classList.add('hidden');
		}
		if (errorMessage) {
			errorMessage.innerText = '';
		}
		if (succesIcon) {
			succesIcon.classList.remove('hidden');
		}

		field.classList.remove('input-error');
	}

	if (status === 'error') {
		if (succesIcon) {
			succesIcon.classList.add('hidden');
		}
		if (errorMessage) {
			errorMessage.innerText = message;
		}
		if (errorIcon) {
			errorIcon.classList.remove('hidden');
		}

		field.classList.add('input-error');
	}
};

if (document.getElementById('add-person-section')) {
	validateOnSubmit();
	validateOnEntry();
}

// TODO: Disable button until all is green
