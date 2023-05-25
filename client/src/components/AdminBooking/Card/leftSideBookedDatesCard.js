const leftSideBookedDatesCard = async (date, time, address, suburb) => {
	let leftSideBookedDatesCardParent = document.createElement('div');
	leftSideBookedDatesCardParent.setAttribute('class', 'left-side-booked-dates-card');

	let dateDisplaySide = document.createElement('div');
	dateDisplaySide.setAttribute('class', 'date-display-side');

	let dateP = document.createElement('p');
	dateP.innerText = date;
	dateDisplaySide.appendChild(dateP);

	let timeP = document.createElement('p');
	timeP.innerText = time;
	dateDisplaySide.appendChild(timeP);

	leftSideBookedDatesCardParent.appendChild(dateDisplaySide);

	let addressDisplaySide = document.createElement('div');
	addressDisplaySide.setAttribute('class', 'address-display-side');

	let addressH4 = document.createElement('h4');
	addressH4.innerText = 'Address:';
	addressDisplaySide.appendChild(addressH4);

	let addressContainer = document.createElement('div');
	addressContainer.setAttribute('class', 'address-container');

	let addressP = document.createElement('p');
	addressP.innerText = address;
	addressContainer.appendChild(addressP);

	let suburbP = document.createElement('p');
	suburbP.innerText = suburb;
	addressContainer.appendChild(suburbP);

	addressDisplaySide.appendChild(addressContainer);

	leftSideBookedDatesCardParent.appendChild(addressDisplaySide);

	return leftSideBookedDatesCardParent;
};

export default leftSideBookedDatesCard;
