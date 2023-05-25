const makeSnackbarVisible = (text, snackbar) => {
	snackbar.innerText = text;
	snackbar.classList.add('show');

	setTimeout(makeInvisible, 7400);

	function makeInvisible() {
		snackbar.classList.replace('show', 'hide');
	}
};

export default makeSnackbarVisible;
