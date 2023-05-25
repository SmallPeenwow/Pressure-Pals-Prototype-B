const isEmptyOrWhitespace = (stringValue) => {
	return !stringValue || stringValue.trim().length === 0;
};

export default isEmptyOrWhitespace;
