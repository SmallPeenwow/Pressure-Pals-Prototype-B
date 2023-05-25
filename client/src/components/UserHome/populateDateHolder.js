const createDateDiv = (date, index, parentDiv) => {
	let dateDiv = document.createElement('div');

	dateDiv.setAttribute('id', date + '-' + index);
	dateDiv.innerText = date;
	parentDiv.appendChild(dateDiv);
};

export default createDateDiv;
