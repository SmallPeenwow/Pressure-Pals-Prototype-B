import makeSnackbarVisible from './snackbar.js';

let snackBarMessage = 'Refresh Disabled for 10s.';

const refreshButtonDisableTimer = (button, snackBar) => {
	disableRefreshButton(button);
	makeSnackbarVisible(snackBarMessage, snackBar);

	setTimeout(() => {
		button.disabled = false;
	}, 10000);
};

const disableRefreshButton = (button) => {
	button.disabled = true;
};

export default refreshButtonDisableTimer;
