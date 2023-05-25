const getWeekendDates = async (month, monthNames) => {
	let monthNumber = monthNames.indexOf(month);
	let days = [];

	let dates = new Date(2023, monthNumber, 1);

	while (dates.getMonth() === monthNumber) {
		if ([0, 6].includes(dates.getDay())) {
			days.push(
				dates.getDate() +
					' ' +
					dates.toLocaleString('en-US', {
						weekday: 'long',
					})
			);
		}
		dates.setDate(dates.getDate() + 1);
	}

	return days;
};

export default getWeekendDates;
