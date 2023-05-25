import getUserLocalStorage from '../getUserFromLocalStorage.js';
import basicClearStorageAndSendHomePage from './basicClearStorageAndSendHomePage.js';

const deleteAccount = document.querySelector('#delete-account');

deleteAccount.addEventListener('click', async (e) => {
	e.preventDefault();
	let response = confirm('Are you sure you want to delete your Account?');

	if (response) {
		let userDetails = getUserLocalStorage();
		await deleteAccountServer(userDetails[0]);

		await basicClearStorageAndSendHomePage();
	}
});

const deleteAccountServer = async (id) => {
	const dataSubmit = new FormData();
	dataSubmit.append('delete-account-user-id', id);

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
