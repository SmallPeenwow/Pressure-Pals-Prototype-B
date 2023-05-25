const appointmentStatusCheck = async (dateCompareValue) => {
	let dateNow = new Date();

	if (
		dateCompareValue.getHours() === dateNow.getHours() &&
		dateCompareValue.getDate() === dateNow.getDate() &&
		dateCompareValue.getMonth() === dateNow.getMonth()
	) {
		return 'In Progress...';
	} else if (dateCompareValue > dateNow) {
		return 'Not Completed';
	} else if (dateCompareValue < dateNow) {
		return 'Completed';
	}
};

export default appointmentStatusCheck;
