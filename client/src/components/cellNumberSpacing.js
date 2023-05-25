const cellNumberSpacing = (number) => {
	let charArray = number.split(' ').join('');
	let result = '';
	let count = 0;
	let spacingMax = 0;

	for (let i = 0; i < charArray.length; i++) {
		result += charArray[i];
		count++;

		if (count === 3 && spacingMax < 2) {
			result += ' ';
			count = 0;
			spacingMax++;
		}
	}

	return result;
};

export default cellNumberSpacing;
