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
 *
 * @param {number} needle
 * @param {Array} haystack
 */
function getClosestNumber(needle, haystack) {
	return haystack.reduce((a, b) =>
		Math.abs(b - needle) < Math.abs(a - needle) ? b : a
	);
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

	console.log("Return", output);
	console.groupEnd();
	return output;
}

/**
 *
 * @param {object} previousMonth
 * @param {object} currentMonth
 * @param {object} nextMonth
 * @param {boolean} isLeap
 * @returns {Array} Absolute dates
 */
function getDatesArrayFromMonths(
	previousMonth,
	currentMonth,
	nextMonth,
	isLeap
) {
	console.group("getDatesArrayFromMonths()");
	let output = [];

	previousMonth.dates.forEach((date) => {
		output.push(-previousMonth.days + date);
	});
	console.log("Add previous month to output with offset:", output);

	output = [...output, ...currentMonth.dates];
	console.log("Add current month:", output);

	nextMonth.dates.forEach((date) => {
		output.push(currentMonth.days + date);
	});
	console.log("Add next month to output with offset:", output);

	console.groupEnd();
	return output;
}

/**
 * @param {number} index
 * @param {boolean} isLeap
 * @returns {object} Month
 */
function getMonth(index, isLeap) {
	const month = doomsdays[Object.keys(doomsdays)[index]];
	if (month.leap) {
		return isLeap ? month.leap : month.common;
	}
	return month;
}

/**
 * @param {object} date
 */
function getClosestDoomsday(date) {
	console.group("getClosestDoomsday()");
	const monthNumber = date.month - 1;
	console.log("monthNumber = (date.month - 1) = ", monthNumber);

	const currentMonth = getMonth(monthNumber, leapYear(date.year));
	const nextMonth = getMonth((monthNumber + 1) % 12, leapYear(date.year));
	const previousMonth = getMonth(
		monthNumber === 0 ? 11 : monthNumber - 1,
		leapYear(date.year)
	);
	console.group(
		"Get the doomsday data from 'previousMonth', 'currentMonth' and 'nextMonth' relative to the selected month"
	);
	console.log("Also keep in mind if the year is a leap year.");
	console.log("previousMonth", previousMonth);
	console.log("currentMonth", currentMonth);
	console.log("nextMonth", nextMonth);
	console.groupEnd();

	console.log(
		"Add all of the dates from those months into the same array, to easily look up the closest number."
	);
	const closestDate = getClosestNumber(
		date.day,
		getDatesArrayFromMonths(
			previousMonth,
			currentMonth,
			nextMonth,
			leapYear(date.year)
		)
	);
	console.log("Found the closest date in the given array:", closestDate);

	console.log("Now remove the offset given earlier, and return the result");

	if (closestDate - currentMonth.days > 0) {
		return closestDate - currentMonth.days;
	} else if (
		closestDate + previousMonth.days > 0 &&
		closestDate + previousMonth.days < currentMonth.days
	) {
		return closestDate + previousMonth.days;
	}
	return closestDate;
}

function dateOnChange(e) {
	const outputElem = document.getElementById("doomsday-text");
	if (e.value) {
		console.group("Bit Doomsday Calculator");
		console.group("Extract the date:");
		console.log("Raw:", e.value);
		const date = extractDate(e.value);

		console.log("Extracted:", date);
		console.groupEnd();

		const yearAnchor = getYearAnchorDate(date.year);
		const closestDoomsday = getClosestDoomsday(date);
		console.log("getClosestDoomsday() Result: ", closestDoomsday);
		const dayOfWeekNumber =
			(yearAnchor - (closestDoomsday - date.day) + 7) % 7;
		console.log(
			"Calculate the day number with the closestDoomsday ((yearAnchor - (closestDoomsday - date.day) + 7) % 7) =",
			dayOfWeekNumber
		);
		console.log(
			`The day ${dayOfWeekNumber} is equal to`,
			dayOfWeek[dayOfWeekNumber]
		);
		outputElem.innerText = dayOfWeek[dayOfWeekNumber];
		console.groupEnd();
	} else {
		outputElem.innerText = doomsdayPlaceholder;
	}
}
