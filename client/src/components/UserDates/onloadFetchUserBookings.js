import getUserLocalStorage from '../getUserFromLocalStorage.js';
import createBookingValuesForCard from './createBookingValuesForCard.js';

const innerTableContainerUserBookedDates = document.querySelector('.inner-table-container-user-booking-dates');

window.onload = async () => {
	let userId = getUserLocalStorage()[0];

	let values = await getUserBookings(userId);
	await createBookingValuesForCard(values, innerTableContainerUserBookedDates);
};

const getUserBookings = async (id) => {
	const dataSubmit = new FormData();
	dataSubmit.append('user-id-bookings-requests', id);

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

export default getUserBookings;
