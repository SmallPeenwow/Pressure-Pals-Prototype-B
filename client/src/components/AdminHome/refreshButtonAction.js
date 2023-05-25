import getPendingRequests from './onloadFetchPendingRequest.js';
import separateFetchedValues from './separateFetchedValues.js';
import refreshButtonDisableTimer from '../refreshButtonDisableTimer.js';
import removeChildrenDivs from '../removeChildrenDivs.js';

const innerTableContainerRequestCards = document.querySelector('.inner-table-container-request-cards');
const snackbar = document.querySelector('#snack-bar');

const refreshAction = document.querySelector('#refresh-action');

refreshAction.addEventListener('click', async () => {
	refreshButtonDisableTimer(refreshAction, snackbar);

	let value = await getPendingRequests();

	await removeChildrenDivs(innerTableContainerRequestCards);
	await separateFetchedValues(value, innerTableContainerRequestCards);
});
