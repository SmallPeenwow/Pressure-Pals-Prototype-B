import getWeekendDates from './getDatesWeekend.js';
import createDateDiv from './populateDateHolder.js';
import removeDivDateHolders from './removeDivDateHolders.js';
import createBookingSlots from './createBookingSlots.js';
import removeChildrenDivs from '../removeChildrenDivs.js';
import fetchAndChangeDateString from './fetchAndChangeDateString.js';

const monthList = document.querySelector('#month-list');
const dateHolderParent = document.querySelector('#date-holders-parent');
const bookingSlotsContainer = document.querySelector('.booking-slots-container');

export const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const timeValues = [
	'08:00:00',
	'09:00:00',
	'10:00:00',
	'11:00:00',
	'12:00:00',
	'13:00:00',
	'14:00:00',
	'15:00:00',
	'16:00:00',
	'17:00:00',
	'18:00:00',
];

let weekendDays = [];
let previousMonth;

window.onload = async () => {
	await monthListUpdate();
	let currentMonth = monthList.value;
	previousMonth = monthList.value;

	weekendDays = await getWeekendDates(currentMonth, monthNames);
	let dateArrayBooked = await fetchAndChangeDateString();

	for (let i = 0; i < weekendDays.length; i++) {
		createDateDiv(weekendDays[i], i, dateHolderParent);
		createBookingSlots(weekendDays[i], timeValues, bookingSlotsContainer, dateArrayBooked);
	}
};

monthList.addEventListener('click', async (e) => {
	e.preventDefault();

	if (previousMonth !== monthList.options[monthList.selectedIndex].value) {
		previousMonth = monthList.options[monthList.selectedIndex].value;
		await removePreviousDays();

		weekendDays = await getWeekendDates(monthList.options[monthList.selectedIndex].value, monthNames);
		let dateArrayBooked = await fetchAndChangeDateString();
		await removeChildrenDivs(bookingSlotsContainer);

		for (let i = 0; i < weekendDays.length; i++) {
			createDateDiv(weekendDays[i], i, dateHolderParent);
			createBookingSlots(weekendDays[i], timeValues, bookingSlotsContainer, dateArrayBooked);
		}
	}
});

const monthListUpdate = async () => {
	for (let i = 0; i < monthNames.length; i++) {
		const option = document.createElement('option');
		option.innerText = monthNames[i];
		option.value = monthNames[i];
		monthList.appendChild(option);

		if (i === new Date().getMonth()) {
			option.selected = true;
		}
	}
};

const removePreviousDays = async () => {
	for (let i = 0; i < weekendDays.length; i++) {
		removeDivDateHolders(weekendDays[i] + '-' + i, dateHolderParent);
	}
};
