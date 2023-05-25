const removeDivDateHolders = async (id, parentHolder) => {
	let divRemove = document.querySelector("[id='" + id + "']");

	parentHolder.removeChild(divRemove);
};

export default removeDivDateHolders;
