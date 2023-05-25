import makeSnackbarVisible from '../snackbar.js';
import isEmptyOrWhitespace from '../isEmptyOrWhitespace.js';
import inputBorderColorChangeRed from '../inputBorderColorChangeRed.js';
import getUserLocalStorage from '../getUserFromLocalStorage.js';

const snackbar = document.querySelector('#snack-bar');
const signInForm = document.querySelector('#signInForm');
const emailValue = document.querySelector('#email');
const passwordValue = document.querySelector('#password');

window.onload = async () => {
	let userDetails = getUserLocalStorage();

	if (userDetails !== 'null') {
		let response = await userPreviousLogin(userDetails[0]);

		userAccessLevel(response.access_level);
	}
};

signInForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	let access_level = '';

	if (isEmptyOrWhitespace(emailValue.value)) {
		makeSnackbarVisible('Please enter in your Email.', snackbar);
		inputBorderColorChangeRed(emailValue);
		return;
	} else if (isEmptyOrWhitespace(passwordValue.value)) {
		makeSnackbarVisible('Please enter in your Password.', snackbar);
		inputBorderColorChangeRed(passwordValue);
	} else {
		let userDetails = await getServerResponse();

		await addUserDetailsToLocalStorage(userDetails[1], userDetails[2], userDetails[3]);

		access_level = userDetails[0];
		userAccessLevel(access_level);
	}
});

const userAccessLevel = (access_level) => {
	if (access_level === 'admin') {
		window.open('./adminHome.html', '_parent');
	} else if (access_level === 'client') {
		window.open('./userHome.html', '_parent');
	} else if (access_level === 'no user') {
		makeSnackbarVisible('Check that your Email and Password is correctly', snackbar);
	}
};

const addUserDetailsToLocalStorage = async (id, address, suburb) => {
	const userArray = [id, address, suburb];
	localStorage.setItem('pressure-pals-user', userArray);
};

const getServerResponse = async () => {
	const dataSubmit = new FormData();
	dataSubmit.append('login-email', emailValue.value.toLowerCase());
	dataSubmit.append('login-password', passwordValue.value);

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

const userPreviousLogin = async (id) => {
	const dataSubmit = new FormData();
	dataSubmit.append('onload-login-id', id);

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

emailValue.addEventListener('change', (e) => {
	e.preventDefault();

	if (!isEmptyOrWhitespace(emailValue.value)) {
		emailValue.style.border = 'none';
	}
});

passwordValue.addEventListener('change', (e) => {
	e.preventDefault();

	if (!isEmptyOrWhitespace(passwordValue.value)) {
		passwordValue.style.border = 'none';
	}
});
