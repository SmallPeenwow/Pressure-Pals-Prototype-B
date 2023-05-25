const rightSideBookedDatesCard = async (name, surname, cellNumber, serviceType, actionStatus) => {
	let rightSideBookedDatesCardParent = document.createElement('div');
	rightSideBookedDatesCardParent.setAttribute('class', 'right-side-booked-dates-card');

	let userDetailsDisplaySide = document.createElement('div');
	userDetailsDisplaySide.setAttribute('class', 'user-details-display-side');

	let tabOne = await userTabOne();
	userDetailsDisplaySide.appendChild(tabOne);

	let tabTwo = await userTabTwo(name, surname, cellNumber, serviceType);
	userDetailsDisplaySide.appendChild(tabTwo);

	rightSideBookedDatesCardParent.appendChild(userDetailsDisplaySide);

	let progressContainer = document.createElement('div');
	progressContainer.setAttribute('class', 'progress-container');

	let progressStageH3 = document.createElement('h3');
	progressStageH3.innerText = actionStatus;

	progressContainer.appendChild(progressStageH3);
	rightSideBookedDatesCardParent.appendChild(progressContainer);

	return rightSideBookedDatesCardParent;
};

export default rightSideBookedDatesCard;

const userTabOne = async () => {
	let userDetailsTabOne = document.createElement('div');
	userDetailsTabOne.setAttribute('class', 'user-details-tab tab-one');

	let nameH4 = document.createElement('h4');
	nameH4.innerText = 'Name:';

	let surnameH4 = document.createElement('h4');
	surnameH4.innerText = 'Surname:';

	let cellNumberH4 = document.createElement('h4');
	cellNumberH4.innerText = 'Cell Number:';

	let serviceH4 = document.createElement('h4');
	serviceH4.innerText = 'Service:';

	userDetailsTabOne.appendChild(nameH4);
	userDetailsTabOne.appendChild(surnameH4);
	userDetailsTabOne.appendChild(cellNumberH4);
	userDetailsTabOne.appendChild(serviceH4);

	return userDetailsTabOne;
};

const userTabTwo = async (name, surname, cellNumber, serviceType) => {
	let userDetailsTabTwo = document.createElement('div');
	userDetailsTabTwo.setAttribute('class', 'user-details-tab tab-two');

	let nameP = document.createElement('p');
	nameP.innerText = name;

	let surnameP = document.createElement('p');
	surnameP.innerText = surname;

	let cellNumberP = document.createElement('p');
	cellNumberP.innerText = cellNumber;

	let serviceP = document.createElement('p');
	serviceP.innerText = serviceType;

	userDetailsTabTwo.appendChild(nameP);
	userDetailsTabTwo.appendChild(surnameP);
	userDetailsTabTwo.appendChild(cellNumberP);
	userDetailsTabTwo.appendChild(serviceP);

	return userDetailsTabTwo;
};
