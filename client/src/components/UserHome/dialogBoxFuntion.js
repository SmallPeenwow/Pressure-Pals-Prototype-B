import isEmptyOrWhitespace from '../isEmptyOrWhitespace.js';
import makeSnackbarVisible from '../snackbar.js';
import getUserLocalStorage from '../getUserFromLocalStorage.js';
import { monthNames } from './index.js';

const dialogBox = document.querySelector('.dialog-box');
const dialogButtonCancel = document.querySelector('#dialog-box-button-cancel');
const dialogButtonAccept = document.querySelector('#dialog-box-button-accept');
const dialogBoxAddress = document.querySelector('#dialog-box-address');
const dialogBoxSuburb = document.querySelector('#dialog-box-suburb');
const storageId = document.querySelector('#storage-id');
const snackBar = document.querySelector('#snack-bar');
const monthList = document.querySelector('#month-list');
const serviceType = document.querySelector('#service-type');

dialogButtonCancel.addEventListener('click', (e) => {
	e.preventDefault();

	changeDisplayAndSelect();
});

document.addEventListener('click', (e) => {
	if (e.target.className === dialogBox.className) {
		changeDisplayAndSelect();
	}
});

dialogButtonAccept.addEventListener('click', async (e) => {
	e.preventDefault();

	if (isEmptyOrWhitespace(dialogBoxAddress.value) || isEmptyOrWhitespace(dialogBoxSuburb.value)) {
		makeSnackbarVisible('Fill in Address and Suburb', snackBar);
		return;
	}

	if (confirm('Do you want to book this Date and Time?')) {
		let userId = getUserLocalStorage()[0];

		let storageArray = storageId.textContent.split(' ');

		let date = dateString(2023, monthNames.indexOf(monthList.value) + 1, storageArray[0], storageArray[2]);

		let response = await submitUserDate(userId, date, dialogBoxAddress.value, dialogBoxSuburb.value, serviceType.value);

		if (response === 'Not Available') {
			makeSnackbarVisible('This Slot is already booked.', snackBar);
		} else {
			makeSnackbarVisible('Slot was Booked successfully', snackBar);
			changeDisplayAndSelect();

			let slot = document.querySelector("[id='" + storageId.textContent + "']");
			slot.innerText = 'Closed';

			slot.setAttribute('class', 'closed');
		}
	}
});

const submitUserDate = async (id, date, address, suburb, service) => {
	const dataSubmit = new FormData();
	dataSubmit.append('book-date-user-id', id);
	dataSubmit.append('book-date-date', date);
	dataSubmit.append('book-date-address', address);
	dataSubmit.append('book-date-suburb', suburb);
	dataSubmit.append('book-date-service', service);
	dataSubmit.append('book-date-action-level', 'pending');

	return fetch('http://localhost:3000/server/index.php', {
		method: 'POST',
		body: dataSubmit,
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			return data;
		})
		.catch((error) => console.log(error));
};

const changeDisplayAndSelect = () => {
	dialogBox.style.display = 'none';
	serviceType.selectedIndex = serviceType[0];
};

const dateString = (year, month, day, time) => {
	let date = year + '-' + String(month).padStart(2, '0') + '-' + day + ' ' + time;

	return date;
};
