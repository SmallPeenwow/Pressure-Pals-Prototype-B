const checkBookingsButton = document.querySelector('#check-bookings-button');

checkBookingsButton.addEventListener('click', () => {
	window.open('./adminDatesBooked.html', '_parent');
});
