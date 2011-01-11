// ==========================================================================
// Project:   CinnamonDolceLatte.Discipline Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

sc_require('models/discipline');

CinnamonDolceLatte.Discipline.FIXTURES = [

	{
		type: 'Discipline',
		guid: 'disc1',
		name: 'Software Engineering',
		topics: [
			{
				type: 'Topic', 
				guid: 'topic1',
				description: 'Formal Methods',
				posts: [
					{
						type: 'Post',
						guid: 'post1',
						title: 'Algebraic Specifications and verifications',
						article: 'say something about the content of the article',
						date_created: SC.DateTime.create({year: 2010, month: 10, day: 23}),
						comments: [
							{
								type: 'Comment',
								guid: 'comment1',
								comment: 'How can we compare the verification tools in this article to others',
								date_created: SC.DateTime.create({year: 2010, month: 10, day: 25})
							},
							{
								type: 'Comment',
								guid: 'comment2',
								comment: 'Would like to see a comparison to behavioral appraaches',
								date_created: SC.DateTime.create({year: 2010, month: 10, day: 27})
							}
						]
					},
					
					{
						type: 'Post',
						guid: 'post2',
						title: 'Specifying and Verifying Mobile Applications with Pi-Calculus',
						article: 'Write the content of the article',
						date_created: SC.DateTime.create({year: 2010, month: 11, day: 02})
					}
				]
			},
			
			{
				type: 'Topic',
				guid: 'topic2',
				description: 'Agile methodologies'
			},
			
			{
				type: 'Topic',
				guid: 'topic3',
				description: 'Test and Behavior Driven Methodologies'
			}
		]
	},
	
	{
		type: 'Discipline',
		guid: 'disc2',
		name: 'Artificial Intelligence',
		topics: [
			{
				type: 'Topic',
				guid: 'topic4',
				description: 'Multi agent Systems'
			},
			
			{
				type: 'Topic',
				guid: 'topic5',
				description: 'Distributed Artificial Intelligence'
			},
			
			{
				type: 'Topic',
				guid: 'topic6',
				description: 'Distributed Planning'
			}
		]
	},
		
	{
		type: 'Discipline',
		guid: 'disc3',
		name: 'Networking',
		topics: [
			{
				type: 'Topic',
				guid: 'topic7',
				description: 'Policy-based Network management'
			},
			
			{
				type: 'Topic',
				guid: 'topic8',
				description: 'Protocol Stack for Communication Systems'
			}
		]
	},
	
	{
		type: 'Discipline',
		guid: 'disc4',
		name: 'Information Technology',
		topics:[
			{
				type: 'Topic',
				guid: 'topic9',
				description: 'Policy Information system'
			}
		]
	}
];
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('cinnamon_dolce_latte');