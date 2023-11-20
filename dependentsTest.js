const {
	getLatesDependantByDateAdded,
	getLatesAdultDependantByDateAdded,
	generateReport,
} = require('./dependents');

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

it('should return one dependand when there is one max date added for dependant', () => {
	const patientA = {
		name: 'John Smith',
		age: 37,
		dependents: [
			{ name: 'Jane Smith', age: 36, added: new Date('2019-01-16') },
			{ name: 'Joe Smith', age: 12, added: new Date('2019-01-16') },
			{ name: 'Sally Smith', age: 10, added: new Date('2020-10-12') },
		],
	};
	const latesDependantByDateAdded = getLatesDependantByDateAdded(patientA);
	assert.equal(latesDependantByDateAdded[0], patientA.dependents[2]);
});

it('should return two dependand when same date add for difftent dependant', () => {
	const patientA = {
		name: 'John Smith',
		age: 37,
		dependents: [
			{ name: 'Jane Smith', age: 36, added: new Date('2019-01-16') },
			{ name: 'Joe Smith', age: 12, added: new Date('2019-01-16') },
			{ name: 'Sally Smith', age: 10, added: new Date('2020-10-12') },
			{ name: 'Adrian Gosling', age: 58, added: new Date('2020-10-12') },
		],
	};
	const expectedDependand = [patientA.dependents[2], patientA.dependents[3]];
	const latesDependantByDateAdded = getLatesDependantByDateAdded(patientA);
	expect(latesDependantByDateAdded).to.eql(expectedDependand);
});

it('should return latest adult added dependant for patient', () => {
	const patientA = {
		name: 'John Smith',
		age: 37,
		dependents: [
			{ name: 'Jane Smith', age: 28, added: new Date('2019-01-16') },
			{ name: 'Joe Smith', age: 12, added: new Date('2019-01-16') },
			{ name: 'Sally Smith', age: 10, added: new Date('2020-10-12') },
		],
	};
	const latesAdultDependantByDateAdded =
		getLatesAdultDependantByDateAdded(patientA);
	expect(latesAdultDependantByDateAdded).to.eql([patientA.dependents[0]]);
});

it('should return message about no adult dependant for patient without dependents', () => {
	const patientA = {
		name: 'John Smith',
		age: 37,
		dependents: [
			{ name: 'Jane Smith', age: 1, added: new Date('2019-01-16') },
			{ name: 'Joe Smith', age: 12, added: new Date('2019-01-16') },
			{ name: 'Sally Smith', age: 10, added: new Date('2020-10-12') },
		],
	};

	const dependant = getLatesAdultDependantByDateAdded(patientA);
	assert.equal(dependant, 'John Smith patient has no any aduld dependand');
});

it('should generate report if patient has no any dependents ', () => {
	const patientA = {
		name: 'John Smith',
		age: 37,
		dependents: [],
	};
	const raportTest = generateReport(patientA);
	assert.equal(raportTest, 'Smith, John has no any depennds');
});

it('should generate report if patient has no any dependents ', () => {
	const patientA = {
		name: 'John Smith',
		age: 37,
		dependents: [
			{ name: 'Jane Smith', age: 58, added: new Date('2019-01-16') },
			{ name: 'Joe Smith', age: 12, added: new Date('2019-01-16') },
			{ name: 'Sally Smith', age: 100, added: new Date('2020-10-12') },
			{ name: 'Adrian Gosling', age: 58, added: new Date('2020-10-12') },
		],
	};

	const patientB = {
		name: 'Jan Smith',
		age: 37,
		dependents: [
			{ name: 'Jane Smith', age: 3, added: new Date('2019-01-16') },
			{ name: 'Joe Smith', age: 12, added: new Date('2019-01-16') },
			{ name: 'Sally Smith', age: 10, added: new Date('2020-10-12') },
			{ name: 'Adrian Gosling', age: 6, added: new Date('2020-10-12') },
		],
	};
	const raportTest = generateReport(patientA, patientB);
	assert.equal(
		raportTest,
		'Smith, John - Joe(12)Smith, Jan - Jane(3),Joe(12),Sally(10),Adrian(6)'
	);
});
