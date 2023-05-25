const basicClearStorageAndSendHomePage = async () => {
	localStorage.clear('pressure-pals-user');
	window.open('/client/index.html', '_parent');
};

export default basicClearStorageAndSendHomePage;
