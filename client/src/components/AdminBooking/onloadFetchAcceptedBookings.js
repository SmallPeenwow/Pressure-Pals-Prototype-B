import createBookingDatesCard from './createBookingDatesCard.js';

const innerTableContainerBookedDates = document.querySelector('.inner-table-container-booked-dates');

window.onload = async () => {
	let values = await getAdminBookings();

	await createBookingDatesCard(values, innerTableContainerBookedDates);
};

const getAdminBookings = async () => {
	const dataSubmit = new FormData();
	dataSubmit.append('admin-booking-request', 'fetch-bookings');

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

export default getAdminBookings;
