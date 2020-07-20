export default updateObject = (oldState, updateProperty) => {
	return {
		...oldState,
		...updateProperty
	};
};