import fetchBookedDates from './fetchBookedDates.js';

const fetchAndChangeDateString = async () => {
	let dateArrayBooked = await fetchBookedDates();
	let arrayReturn = [];

	dateArrayBooked.map((date) => {
		let splitDate = date.split(' ');
		let day = new Date(splitDate[0]).getDate();
		let dayName = new Date(splitDate[0]).toLocaleString('en-us', { weekday: 'long' });

		arrayReturn.push(day + ' ' + dayName + ' ' + splitDate[1]);
	});

	return arrayReturn;
};

export default fetchAndChangeDateString;
