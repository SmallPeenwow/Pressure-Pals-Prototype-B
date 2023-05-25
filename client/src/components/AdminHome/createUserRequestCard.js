import acceptRequestAction from './acceptRequestAction.js';
import declineRequestAction from './declineRequestAction.js';

const createUserRequestCardDiv = async (
	bookingId,
	date,
	time,
	serviceType,
	name,
	surname,
	cellNumber,
	address,
	parentDiv
) => {
	let userRequestCard = document.createElement('div');
	userRequestCard.setAttribute('class', 'user-request-card');

	let dateServiceDiv = await dateServiceContainerCreate(date, time, serviceType);
	userRequestCard.appendChild(dateServiceDiv);

	// Client Name
	let nameCardContainer = document.createElement('div');
	nameCardContainer.setAttribute('class', 'name-card-container default-container');

	let nameH4 = document.createElement('h4');
	nameH4.innerText = 'Name:';
	nameCardContainer.appendChild(nameH4);

	let nameP = document.createElement('p');
	nameP.innerText = name;
	nameCardContainer.appendChild(nameP);

	userRequestCard.appendChild(nameCardContainer);

	// Client Surname
	let surnameCardContainer = document.createElement('div');
	surnameCardContainer.setAttribute('class', 'surname-card-container default-container');

	let surnameH4 = document.createElement('h4');
	surnameH4.innerText = 'Surname:';
	surnameCardContainer.appendChild(surnameH4);

	let surnameP = document.createElement('p');
	surnameP.innerText = surname === 'null' ? '' : surname;
	surnameCardContainer.appendChild(surnameP);

	userRequestCard.appendChild(surnameCardContainer);

	// Client Cell Number
	let cellNumberCardContainer = document.createElement('div');
	cellNumberCardContainer.setAttribute('class', 'cell-number-card-container default-container');

	let cellNumberH4 = document.createElement('h4');
	cellNumberH4.innerText = 'Cell Number:';
	cellNumberCardContainer.appendChild(cellNumberH4);

	let cellNumberP = document.createElement('p');
	cellNumberP.innerText = cellNumber;
	cellNumberCardContainer.appendChild(cellNumberP);

	userRequestCard.appendChild(cellNumberCardContainer);

	// Client Address
	let addressCardContainer = document.createElement('div');
	addressCardContainer.setAttribute('class', 'address-card-container default-container');

	let addressH4 = document.createElement('h4');
	addressH4.innerText = 'Address:';
	addressCardContainer.appendChild(addressH4);

	let addressP = document.createElement('p');
	addressP.innerText = address;
	addressCardContainer.appendChild(addressP);

	userRequestCard.appendChild(addressCardContainer);

	// Button Div Container
	let buttonCardContainer = document.createElement('div');
	buttonCardContainer.setAttribute('class', 'button-card-container');

	let acceptButton = document.createElement('button');
	acceptButton.setAttribute('class', 'accept');
	acceptButton.setAttribute('id', 'accept-id:' + bookingId);
	acceptButton.innerText = 'Accept';
	acceptButton.addEventListener('click', acceptRequestAction);
	buttonCardContainer.appendChild(acceptButton);

	let declineButton = document.createElement('button');
	declineButton.setAttribute('class', 'decline');
	declineButton.setAttribute('id', 'decline-id:' + bookingId);
	declineButton.innerText = 'Decline';
	declineButton.addEventListener('click', declineRequestAction);
	buttonCardContainer.appendChild(declineButton);

	userRequestCard.appendChild(buttonCardContainer);

	parentDiv.appendChild(userRequestCard);
};

export default createUserRequestCardDiv;

const dateServiceContainerCreate = async (date, time, serviceType) => {
	let dateServiceContainer = document.createElement('div');
	dateServiceContainer.setAttribute('class', 'date-service-container');

	let dateCardContainer = document.createElement('div');
	dateCardContainer.setAttribute('class', 'date-card-container');

	let datePTag = document.createElement('p');
	datePTag.innerText = date;
	dateCardContainer.appendChild(datePTag);

	let timePTage = document.createElement('p');
	timePTage.innerText = time;
	dateCardContainer.appendChild(timePTage);

	dateServiceContainer.appendChild(dateCardContainer);

	let serviceTypeContainer = document.createElement('div');
	serviceTypeContainer.setAttribute('class', 'service-type-container');

	let serviceTypeH4 = document.createElement('h4');
	serviceTypeH4.innerText = 'Service Type:';
	serviceTypeContainer.appendChild(serviceTypeH4);

	let serviceTypeP = document.createElement('p');
	serviceTypeP.innerText = serviceType;
	serviceTypeContainer.appendChild(serviceTypeP);

	dateServiceContainer.appendChild(serviceTypeContainer);

	return dateServiceContainer;
};
