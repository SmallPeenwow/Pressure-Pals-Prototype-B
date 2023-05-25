import createUserBookingDatesCard from './createUserBookingDatesCard.js';

const createBookingValuesForCard = async (array, parentDiv) => {
	array.map(async (value) => {
		let dateSeparate = value[0].split(' ');
		let day =
			new Date(dateSeparate[0]).getDate() +
			' ' +
			new Date(dateSeparate[0]).toLocaleString('en-us', { weekday: 'long' }) +
			' ' +
			new Date(dateSeparate[0]).toLocaleString('en-us', { month: 'long' });
		let time = dateSeparate[1].split(':')[0];
		let timeString = time > 11 ? time + ':00 PM' : time + ':00 AM';
		let actionLevel = value[1];

		await createUserBookingDatesCard(day, timeString, actionLevel, parentDiv);
	});
};

export default createBookingValuesForCard;
