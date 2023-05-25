import getUserLocalStorage from '../getUserFromLocalStorage.js';

const dialogBox = document.querySelector('.dialog-box');
const headerDate = document.querySelector('#header-date');
const dialogBoxAddress = document.querySelector('#dialog-box-address');
const dialogBoxSuburb = document.querySelector('#dialog-box-suburb');
const storageId = document.querySelector('#storage-id');

const eventListenerDateSlot = (e) => {
	dialogBox.style.display = 'flex';

	let date = e.target.id.split(' ');
	let headerDateTitle = timeNumber(date[2]);

	headerDate.innerText = date[0] + ' ' + date[1] + ' ' + headerDateTitle;

	let userAddressArray = getUserLocalStorage();

	dialogBoxAddress.value = userAddressArray[1];
	dialogBoxSuburb.value = userAddressArray[2];
	storageId.innerText = e.target.id;
};

export default eventListenerDateSlot;

const timeNumber = (dateValue) => {
	let time = dateValue.split(':')[0];
	return time > 11 ? time + ':00 PM' : time + ':00 AM';
};
