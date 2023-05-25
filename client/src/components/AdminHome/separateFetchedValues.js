import createUserRequestCardDiv from './createUserRequestCard.js';

const separateFetchedValues = async (array, parentDiv) => {
	array.map(async (value) => {
		let dateSeparate = value[2].split(' ');
		let day =
			new Date(dateSeparate[0]).getDate() +
			' ' +
			new Date(dateSeparate[0]).toLocaleString('en-us', { weekday: 'long' }) +
			' ' +
			new Date(dateSeparate[0]).toLocaleString('en-us', { month: 'long' });
		let time = dateSeparate[1].split(':')[0];
		let timeString = time > 11 ? time + ':00 PM' : time + ':00 AM';

		await createUserRequestCardDiv(
			value[0],
			day,
			timeString,
			value[1],
			value[6],
			value[7],
			value[8],
			value[3] + ' ' + value[4],
			parentDiv
		);
	});
};

export default separateFetchedValues;
