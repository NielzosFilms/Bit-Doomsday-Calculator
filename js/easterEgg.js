function onChange(e) {
	const dateNow = new Date();
	const selectedDate = new Date(e.target.value);

	const bodyElement = document.body;

	if (dateNow.setHours(0, 0, 0, 0) == selectedDate.setHours(0, 0, 0, 0)) {
		bodyElement.classList.add("easterEgg");
	} else {
		bodyElement.classList.remove("easterEgg");
	}
}

window.onload = () => {
	const dateElem = document.getElementById("date");
	dateElem.addEventListener("change", onChange);
};
