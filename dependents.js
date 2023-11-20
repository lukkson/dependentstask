function getLatesDependantByDateAdded(patient) {
	const allDependents = [...patient.dependents];
	const latestAddedDate = getLatestAddedDate(allDependents);
	return allDependents.filter(
		(el) => el.added.getDate() == latestAddedDate.getDate()
	);
}

function getLatesAdultDependantByDateAdded(patient) {
	const adultDependents = patient.dependents.filter((ol) => ol.age > 18);
	if (adultDependents.length == 0) {
		return `${patient.name} patient has no any aduld dependand`;
	} else {
		const latestAdultAddedDate = getLatestAddedDate(adultDependents);
		return getDependentsByDateAdded(adultDependents, latestAdultAddedDate);
	}
}

function getDependentsByDateAdded(allDependents, dateAdded) {
	return allDependents.filter(
		(el) => el.added.getDate() == dateAdded.getDate()
	);
}

function getLatestAddedDate(dependandAdded) {
	const [...addedList] = dependandAdded.map((el) => el.added);
	return addedList.reduce((prev, current) => {
		return new Date(prev) > new Date(current) ? prev : current;
	});
}

function generateReport(...patient) {
	let raportText = '';
	patient.forEach((el) => {
		const [surname, name] = el.name.split(' ').reverse();
		console.log(surname + ', ' + name);
		console.log(el.dependents.legnth);
		if (el.dependents.length == 0) {
			raportText = `${surname}, ${name} has no any depennds`;
		} else {
			age = el.dependents
				.filter((ol) => ol.age < 18)
				.map((el) => el.name.split(' ').shift() + `(${el.age})`);
			patientLine = `${surname}, ${name} - ${age}`;
			raportText = raportText + patientLine;
		}
	});
	return raportText;
}
module.exports.getLatesDependantByDateAdded = getLatesDependantByDateAdded;
module.exports.getLatesAdultDependantByDateAdded =
	getLatesAdultDependantByDateAdded;
module.exports.generateReport = generateReport;
