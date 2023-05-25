import separateDateTimeDate from './separateDateTimeData.js';
import leftSideBookedDatesCard from './Card/leftSideBookedDatesCard.js';
import rightSideBookedDatesCard from './Card/rightSideBookedDatesCard.js';
import appointmentStatusCheck from './appointmentStatusCheck.js';
import cellNumberSpacing from '../cellNumberSpacing.js';

const createBookingDatesCard = async (dataBundle, parentDiv) => {
	dataBundle.map(async (array, index) => {
		let appointmentStatus = await appointmentStatusCheck(new Date(array[0]));

		let bookedDatesCardClassValue =
			appointmentStatus === 'Completed'
				? 'completed'
				: appointmentStatus === 'Not Completed'
				? 'not-completed'
				: 'in-progress';

		const bookedDatesCard = document.createElement('div');
		bookedDatesCard.setAttribute('id', 'booked-dates-card');
		bookedDatesCard.setAttribute('class', bookedDatesCardClassValue);

		let dateArray = await separateDateTimeDate(array[0]);
		let leftSideDetails = await leftSideBookedDatesCard(dateArray[0], dateArray[1], array[1], array[2]);

		bookedDatesCard.appendChild(leftSideDetails);

		let cellNumber = cellNumberSpacing(array[6]);

		// TODO: cell phone custom spacing
		let rightSideDetails = await rightSideBookedDatesCard(
			array[4],
			array[5] === 'null' ? 'No Surname' : array[5],
			cellNumber,
			array[3],
			appointmentStatus
		);

		bookedDatesCard.appendChild(rightSideDetails);

		if (appointmentStatus !== 'In Progress...') {
			parentDiv.appendChild(bookedDatesCard);
		} else {
			parentDiv.prepend(bookedDatesCard);
		}
	});
};

export default createBookingDatesCard;
