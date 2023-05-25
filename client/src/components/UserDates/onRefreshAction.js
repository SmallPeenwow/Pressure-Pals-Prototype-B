import getUserLocalStorage from '../getUserFromLocalStorage.js';
import createBookingValuesForCard from './createBookingValuesForCard.js';
import getUserBookings from './onloadFetchUserBookings.js';
import refreshButtonDisableTimer from '../refreshButtonDisableTimer.js';
import removeChildrenDivs from '../removeChildrenDivs.js';

const refreshButton = document.querySelector('#refresh-button');
const innerTableContainerUserBookedDates = document.querySelector('.inner-table-container-user-booking-dates');
const snackBar = document.querySelector('#snack-bar');

refreshButton.addEventListener('click', async () => {
	refreshButtonDisableTimer(refreshButton, snackBar);

	let userId = getUserLocalStorage()[0];

	let values = await getUserBookings(userId);
	await removeChildrenDivs(innerTableContainerUserBookedDates);
	await createBookingValuesForCard(values, innerTableContainerUserBookedDates);
});
