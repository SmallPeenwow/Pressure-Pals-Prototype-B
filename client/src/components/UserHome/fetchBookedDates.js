const fetchBookedDates = async () => {
	const dataSubmit = new FormData();
	dataSubmit.append('fetch-booked-dates-status', 'check');

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

export default fetchBookedDates;
