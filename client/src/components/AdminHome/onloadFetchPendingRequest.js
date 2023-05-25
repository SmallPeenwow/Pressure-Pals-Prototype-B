import separateFetchedValues from './separateFetchedValues.js';

const innerTableContainerRequestCards = document.querySelector('.inner-table-container-request-cards');

window.onload = async () => {
	let values = await getPendingRequests();

	await separateFetchedValues(values, innerTableContainerRequestCards);
};

const getPendingRequests = async () => {
	const dataSubmit = new FormData();
	dataSubmit.append('admin-pending-requests', 'request-action');

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

export default getPendingRequests;
