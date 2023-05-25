import eventListenerDateSlot from './eventListenerDateSlot.js';

const createBookingSlots = (date, timeSlotArray, parentDiv, bookedDates) => {
	timeSlotArray.map((timeSlotId) => {
		let slotDiv = document.createElement('div');
		slotDiv.innerText = bookedDates.includes(date + ' ' + timeSlotId) ? 'Closed' : 'Available';

		slotDiv.setAttribute('class', bookedDates.includes(date + ' ' + timeSlotId) ? 'closed' : 'available');

		slotDiv.setAttribute('id', date + ' ' + timeSlotId);
		slotDiv.addEventListener('click', eventListenerDateSlot);

		parentDiv.appendChild(slotDiv);
	});
};

export default createBookingSlots;
