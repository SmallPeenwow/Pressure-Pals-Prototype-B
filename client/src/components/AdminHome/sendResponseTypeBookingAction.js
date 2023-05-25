const sendResponseTypeBookingAction = async (id, responseType) => {
	const dataSubmit = new FormData();
	dataSubmit.append('admin-action-response-requests-id', id);
	dataSubmit.append('admin-action-response-requests-type', responseType);

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

export default sendResponseTypeBookingAction;
