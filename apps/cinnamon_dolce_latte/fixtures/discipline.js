// ==========================================================================
// Project:   CinnamonDolceLatte.Discipline Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

sc_require('models/discipline');

CinnamonDolceLatte.Discipline.FIXTURES = [

	{type: 'Discipline',
	name: 'Software Engineering',
	topics: [
		{type: 'Topic', description: 'Formal Methods'},
		{type: 'Topic', description: 'Agile methodologies'},
		{type: 'Topic', description: 'Test and Behavior Driven Methodologies'}
	]},
	
	{type: 'Discipline'
	name: 'Artificial Intelligence',
	topics: [
		{type: 'Topic', description: 'Multi-agent Systems'},
		{type: 'Topic', description: 'Distributed Artificial Intelligence'},
		{type: 'Topic', description: 'Distributed Planning'}
	]},
	
	{type: 'Discipline',
	name: 'Networking',
	topics: [
		{type: 'Topic', description: 'Policy-based Network management'},
		{type: 'Topic', description: 'Protocol Stack for Communication Systems'}
	]},
	
	{type: 'Discipline',
	name: 'Information Technology',
	topics:[
		{type: 'Topic', description: 'Policy Information system'}
	]}
];
