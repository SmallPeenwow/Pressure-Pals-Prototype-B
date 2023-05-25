const removeChildrenDivs = async (parent) => {
	while (parent.hasChildNodes()) {
		parent.removeChild(parent.firstChild);
	}
};

export default removeChildrenDivs;
