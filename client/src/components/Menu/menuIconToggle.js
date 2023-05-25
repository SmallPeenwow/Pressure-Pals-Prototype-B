const menu = document.querySelector('#menu');
const menuItems = document.querySelector('#menu-items');

menu.addEventListener('click', (e) => {
	e.preventDefault();

	if (menuItems.className === 'hidden') {
		menuItems.classList.remove('hidden');
		menuItems.classList.add('show');
		menuItems.style.display = 'flex';
	} else {
		hideDropDown();
	}
});

document.addEventListener('click', (e) => {
	let isClickedInside = menu.contains(e.target);

	if (!isClickedInside && menuItems.className === 'show') {
		hideDropDown();
	}
});

const hideDropDown = () => {
	menuItems.classList.remove('show');
	menuItems.classList.add('hidden');
	menuItems.style.display = 'none';
};
