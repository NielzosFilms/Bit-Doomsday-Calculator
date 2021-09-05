const doomsdayPlaceholder = "NO DATE SELECTED";

const dayOfWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const doomsdays = {
	January: {
		common: {
			dates: [3, 10, 17, 24, 31],
			days: 31,
		},
		leap: {
			dates: [4, 11, 18, 25],
			days: 31,
		},
	},
	February: {
		common: {
			dates: [7, 14, 21, 28],
			days: 28,
		},
		leap: {
			dates: [1, 8, 15, 22, 29],
			days: 29,
		},
	},
	March: {
		dates: [7, 14, 21, 28],
		days: 31,
	},
	April: {
		dates: [4, 11, 18, 25],
		days: 30,
	},
	May: {
		dates: [2, 9, 16, 23, 30],
		days: 31,
	},
	June: {
		dates: [6, 13, 20, 27],
		days: 30,
	},
	July: {
		dates: [4, 11, 18, 25],
		days: 31,
	},
	August: {
		dates: [1, 8, 15, 22, 29],
		days: 31,
	},
	September: {
		dates: [5, 12, 19, 26],
		days: 30,
	},
	October: {
		dates: [3, 10, 17, 24, 31],
		days: 31,
	},
	November: {
		dates: [7, 14, 21, 28],
		days: 30,
	},
	December: {
		dates: [5, 12, 19, 26],
		days: 31,
	},
};

function leapYear(year) {
	return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

function isEven(number) {
	return number % 2 === 0;
}

/**
 * @param {string} date
 * @returns {object}
 */
function extractDate(date) {
	const splitDate = date.split("-");
	return {
		day: Number(splitDate[2]),
		month: Number(splitDate[1]),
		year: Number(splitDate[0]),
	};
}

/**
 * @param {number} year
 * @return the centuries anchor date
 */
function getCenturyAnchorDate(year) {
	console.group("getCenturyAnchorDate()");

	const anchorDays = ["Tuesday", "Sunday", "Friday", "Wednesday"];

	let century = Number(year.toString().substr(0, 2) + "00");
	console.log("Century:", century);

	const anchDay = (century / 100) % 4;
	console.log("CenturyAnchorDate ((century / 100) % 4) =", anchDay);

	console.log(`Day ${anchDay} in the anchor dates == ${anchorDays[anchDay]}`);
	const output = dayOfWeek.indexOf(anchorDays[anchDay]);
	console.log(`Actual number of that day = ${output} = ${dayOfWeek[output]}`);
	console.log("Return", output);
	console.groupEnd();
	return output;
}

/**
 * @param {number} year
 * @return the year's anchor day
 */
function getYearAnchorDate(year) {
	console.group("getYearAnchorDate()");

	let last2digits = Number(year.toString().substr(-2));
	const centuryAnchorDate = getCenturyAnchorDate(year);

	console.log("last2digits:", last2digits);

	if (!isEven(last2digits)) {
		last2digits += 11;
		console.log("add 11 because uneven =", last2digits);
	}

	last2digits = last2digits / 2;

	console.log("devide by 2 =", last2digits);

	if (!isEven(last2digits)) {
		last2digits += 11;
		console.log("add 11 because uneven =", last2digits);
	}

	const mod7 = last2digits % 7;
	console.log("modulo 7 =", mod7);

	const sub7 = 7 - mod7;
	console.log("subtract from 7 =", sub7);

	const output = (sub7 + centuryAnchorDate) % 7;
	console.log(
		`Count forward ${sub7} days from the centuries anchor day(${centuryAnchorDate}) =`,
		output
	);
	console.log(`Day ${output} == ${dayOfWeek[output]}`);

	console.log("Return", dayOfWeek[output]);
	console.groupEnd();
	return output;
}

function dateOnChange(e) {
	const outputElem = document.getElementById("doomsday-text");
	if (e.value) {
		console.group("Extract the date:");
		console.log("Raw:", e.value);
		const date = extractDate(e.value);

		outputElem.innerText = e.value;

		console.log("Extracted:", date);
		console.groupEnd();

		const yearAnchor = getYearAnchorDate(date.year);
	} else {
		outputElem.innerText = doomsdayPlaceholder;
	}
}
