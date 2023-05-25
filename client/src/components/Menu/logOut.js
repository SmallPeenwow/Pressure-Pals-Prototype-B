import basicClearStorageAndSendHomePage from './basicClearStorageAndSendHomePage.js';

const logOut = document.querySelector('#log-out');

logOut.addEventListener('click', (e) => {
	e.preventDefault();
	let response = confirm('Do you want to Log Out?');

	if (response) {
		basicClearStorageAndSendHomePage();
	}
});
