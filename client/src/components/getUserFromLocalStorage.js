const getUserLocalStorage = () => {
	let id = localStorage.getItem('pressure-pals-user');

	try {
		let array = id.split(',');

		return array;
	} catch {
		return 'null';
	}
};

export default getUserLocalStorage;
