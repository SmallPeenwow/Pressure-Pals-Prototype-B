const checkBookingsButton = document.querySelector('#check-bookings-button');

checkBookingsButton.addEventListener('click', () => {
	window.open('./userDatesBooked.html', '_parent');
});
