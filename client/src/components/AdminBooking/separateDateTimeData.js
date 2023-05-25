const separateDateTimeDate = async (dateIndex) => {
	let dateSeparate = dateIndex.split(' ');
	let day =
		new Date(dateSeparate[0]).getDate() +
		' ' +
		new Date(dateSeparate[0]).toLocaleString('en-us', { weekday: 'long' }) +
		' ' +
		new Date(dateSeparate[0]).toLocaleString('en-us', { month: 'long' });
	let time = dateSeparate[1].split(':')[0];
	let timeString = time > 11 ? time + ':00 PM' : time + ':00 AM';

	return [day, timeString];
};

export default separateDateTimeDate;
