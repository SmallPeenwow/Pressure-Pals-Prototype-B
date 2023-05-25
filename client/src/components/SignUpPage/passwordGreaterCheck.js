import inputBorderColorChangeRed from '../inputBorderColorChangeRed.js';
import makeSnackbarVisible from '../snackbar.js';

const passwordGreaterCheck = async (password, confirmPassword, snackBar) => {
	if (password.value.length < 7 || confirmPassword.value.length < 7) {
		makeSnackbarVisible('Password must be 7 or more characters.', snackBar);
		inputBorderColorChangeRed(password);
		inputBorderColorChangeRed(confirmPassword);
	}
};

export default passwordGreaterCheck;
