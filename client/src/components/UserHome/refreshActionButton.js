import getWeekendDates from './getDatesWeekend.js';
import createDateDiv from './populateDateHolder.js';
import createBookingSlots from './createBookingSlots.js';
import removeChildrenDivs from '../removeChildrenDivs.js';
import refreshButtonDisableTimer from '../refreshButtonDisableTimer.js';
import removeDivDateHolders from './removeDivDateHolders.js';
import fetchAndChangeDateString from './fetchAndChangeDateString.js';
import { monthNames } from './index.js';
import { timeValues } from './index.js';

const monthList = document.querySelector('#month-list');
const refreshButton = document.querySelector('#refresh');
const dateHolderParent = document.querySelector('#date-holders-parent');
const bookingSlotsContainer = document.querySelector('.booking-slots-container');
const snackBar = document.querySelector('#snack-bar');

let weekendDays = [];

refreshButton.addEventListener('click', async () => {
	refreshButtonDisableTimer(refreshButton, snackBar);

	weekendDays = await getWeekendDates(monthList.options[monthList.selectedIndex].value, monthNames);
	let dateArrayBooked = await fetchAndChangeDateString();
	await removeChildrenDivs(bookingSlotsContainer);
	await removePreviousDays();

	for (let i = 0; i < weekendDays.length; i++) {
		createDateDiv(weekendDays[i], i, dateHolderParent);
		createBookingSlots(weekendDays[i], timeValues, bookingSlotsContainer, dateArrayBooked);
	}
});

const removePreviousDays = async () => {
	for (let i = 0; i < weekendDays.length; i++) {
		removeDivDateHolders(weekendDays[i] + '-' + i, dateHolderParent);
	}
};
