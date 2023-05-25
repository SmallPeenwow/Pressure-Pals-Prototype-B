import refreshButtonDisableTimer from '../refreshButtonDisableTimer.js';
import getAdminBookings from './onloadFetchAcceptedBookings.js';
import createBookingDatesCard from './createBookingDatesCard.js';
import removeChildrenDivs from '../removeChildrenDivs.js';

const refreshButton = document.querySelector('#refresh-action');
const innerTableContainerBookedDates = document.querySelector('.inner-table-container-booked-dates');
const snackbar = document.querySelector('#snack-bar');

refreshButton.addEventListener('click', async () => {
	refreshButtonDisableTimer(refreshButton, snackbar);

	let values = await getAdminBookings();

	await removeChildrenDivs(innerTableContainerBookedDates);
	await createBookingDatesCard(values, innerTableContainerBookedDates);
});
