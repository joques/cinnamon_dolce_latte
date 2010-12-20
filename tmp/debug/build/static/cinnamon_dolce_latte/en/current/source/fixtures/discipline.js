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
		{type: 'Topic', title: 'Formal Methods'},
		{type: 'Topic', title: 'Agile methodologies'},
		{type: 'Topic', title: 'Test and Behavior Driven Methodologies'}
	]},
	
	{type: 'Discipline'
	name: 'Artificial Intelligence',
	topics: [
		{type: 'Topic', title: 'Multi-agent Systems'},
		{type: 'Topic', title: 'Distributed Artificial Intelligence'},
		{type: 'Topic', title: 'Distributed Planning'}
	]},
	
	{type: 'Discipline',
	name: 'Networking',
	topics: [
		{type: 'Topic', title: 'Policy-based Network management'},
		{}
	]},
	
	{type: 'Discipline',
	name: 'Information Technology',
	topics:[]}
	
];
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('cinnamon_dolce_latte');