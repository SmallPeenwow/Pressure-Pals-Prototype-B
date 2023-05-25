import isEmptyOrWhitespace from '../isEmptyOrWhitespace.js';
import passwordMatch from './passwordMatch.js';

const name = document.querySelector('#name');
const email = document.querySelector('#email');
const cellNumber = document.querySelector('#cell-number');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

name.addEventListener('change', (e) => {
	e.preventDefault();

	if (!isEmptyOrWhitespace(name.value)) {
		name.style.border = 'none';
	}
});

email.addEventListener('change', (e) => {
	e.preventDefault();

	if (!isEmptyOrWhitespace(email.value)) {
		email.style.border = 'none';
	}
});

cellNumber.addEventListener('change', (e) => {
	e.preventDefault();

	if (!isEmptyOrWhitespace(cellNumber.value)) {
		cellNumber.style.border = 'none';
	}
});

password.addEventListener('keyup', (e) => {
	e.preventDefault();

	if (!isEmptyOrWhitespace(password.value)) {
		password.style.border = 'none';
	}

	passwordMatch(password, confirmPassword);
});

confirmPassword.addEventListener('keyup', (e) => {
	e.preventDefault();

	if (!isEmptyOrWhitespace(password.value)) {
		confirmPassword.style.border = 'none';
	}

	passwordMatch(password, confirmPassword);
});
