import isEmptyOrWhitespace from '../isEmptyOrWhitespace.js';
import makeSnackbarVisible from '../snackbar.js';
import signUpCheck from './signUpCheck.js';

const signUpForm = document.querySelector('#sign-up');
const name = document.querySelector('#name');
const surname = document.querySelector('#surname');
const email = document.querySelector('#email');
const cellNumber = document.querySelector('#cell-number');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const address = document.querySelector('#address');
const suburb = document.querySelector('#suburb');
const snackBar = document.querySelector('#snack-bar');

signUpForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	let serverResponse = ''; // Used to see if user was added
	let responseType;

	responseType = await signUpCheck(name, email, cellNumber, password, confirmPassword, snackBar);

	if (responseType) {
		let serverResponse = await submitUserDetails();

		if (serverResponse === 'full') {
			makeSnackbarVisible('Server is at full capacity', snackBar);
		} else if (serverResponse === 'failed') {
			makeSnackbarVisible('Account failed to process', snackBar);
		} else {
			const userArray = [serverResponse, address.value, suburb.value];
			localStorage.setItem('pressure-pals-user', userArray);
			makeSnackbarVisible('Account was created successfully', snackBar);

			setTimeout(sendUserToPage, 7400);
		}
	}
});

const sendUserToPage = () => {
	window.open('./userHome.html', '_parent');
};

const submitUserDetails = async () => {
	const dataSubmit = new FormData();
	// Might need to change to create-name
	dataSubmit.append('name', name.value);
	dataSubmit.append('surname', valueDefault(surname.value));
	dataSubmit.append('email', email.value.toLowerCase());
	dataSubmit.append('cell-number', cellNumber.value);
	dataSubmit.append('password', password.value);
	dataSubmit.append('address', valueDefault(address.value));
	dataSubmit.append('suburb', valueDefault(suburb.value));

	return fetch('http://localhost:3000/server/index.php', {
		method: 'POST',
		body: dataSubmit,
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => console.log(error));
};

const valueDefault = (value) => {
	if (isEmptyOrWhitespace(value)) {
		return 'null';
	}

	return value;
};
