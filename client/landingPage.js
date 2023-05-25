import SendToSignInPage from './src/components/buttonSendToSignInPage.js';
import SendToSignUpPage from './src/components/buttonSendToSignUpPage.js';

const SignIn = document.querySelector('#sign-in');
const SignUp = document.querySelector('#sign-up');

SignIn.addEventListener('click', () => {
	SendToSignInPage();
});

SignUp.addEventListener('click', () => {
	SendToSignUpPage();
});
