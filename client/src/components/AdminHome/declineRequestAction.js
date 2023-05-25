import sendResponseTypeBookingAction from './sendResponseTypeBookingAction.js';
import makeSnackbarVisible from '../snackbar.js';
import removeCard from './removeCard.js';

const snackbar = document.querySelector('#snack-bar');

const declineRequestAction = async (e) => {
	e.preventDefault();
	let id = e.target.id.split(':')[1];
	let responseValue = e.target.id.split('-')[0];

	if (confirm('Do you want to Decline Booking?')) {
		let responseMessage = await sendResponseTypeBookingAction(id, responseValue);

		makeSnackbarVisible(responseMessage, snackbar);
		removeCard(e.target);
	}
};

export default declineRequestAction;
