const createUserBookingDatesCard = async (date, time, actionLevel, parentDiv) => {
	let userBookingDates = document.createElement('div');
	userBookingDates.setAttribute('id', 'user-booking-dates');
	userBookingDates.setAttribute(
		'class',
		actionLevel === 'pending' ? 'pending' : actionLevel === 'accept' ? 'accepted' : 'declined'
	);

	let dateContainer = document.createElement('div');
	dateContainer.setAttribute('class', 'date-container');

	let userDateBookedP = document.createElement('p');
	userDateBookedP.innerText = date;
	dateContainer.appendChild(userDateBookedP);

	let userTimeBookedP = document.createElement('p');
	userTimeBookedP.innerText = time;
	dateContainer.appendChild(userTimeBookedP);

	userBookingDates.appendChild(dateContainer);

	let userStatusContainer = document.createElement('div');
	userStatusContainer.setAttribute('class', 'user-status-container');

	let userStatusBookedDateP = document.createElement('p');
	userStatusBookedDateP.innerText =
		actionLevel === 'pending' ? 'pending' : actionLevel === 'accept' ? 'accepted' : 'declined';
	userStatusContainer.appendChild(userStatusBookedDateP);

	userBookingDates.appendChild(userStatusContainer);

	parentDiv.appendChild(userBookingDates);
};

export default createUserBookingDatesCard;
