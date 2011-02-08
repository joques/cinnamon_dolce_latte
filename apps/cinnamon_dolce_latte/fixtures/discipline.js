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
				keywords: ['key1','key2','key3'],
				posts: [
					{
						type: 'Post',
						guid: 'post1',
						title: 'Algebraic Specifications and verifications',
						article: 'say something about the content of the article',
						creator: 'Pierre Libasky',
						date_created: SC.DateTime.create({year: 2010, month: 10, day: 23}),
						post_refs: [
							{
								type: 'Reference',
								guid: 'ref1',
								resource_title: 'A Taxonomy of Process Calculi for Distribution and Mobility',
								resource_type: 'Conference',
								date_of_publication: SC.DateTime.create({year: 2010, month: 07, day: 15}),
								authors: [{
									type: 'Author',
									guid: 'author1',
									first_name: 'Daniele',
									last_name: 'Gorla',
									email: 'Daniele.Gorla@uniroma.it'
								}]
							},
							{
								type: 'Reference',
								guid: 'ref2',
								resource_title: 'Social Networks and Multi-agent Organizational Performance',
								resource_type: 'Conference',
								date_of_publication: SC.DateTime.create({year: 2009, month: 11, day: 12}),
								authors: [{
									type: 'Author',
									guid: 'author2',
									first_name: 'Mattew',
									last_name: 'Gaston',
									email: 'mgastol@cs.umbc.edu'
								},
								{
									type: 'Author',
									guid: 'author3',
									first_name: 'Marie',
									last_name: 'desJardins',
									email: 'mariedjl@cs.umbc.edu'
								}]
							}
						],
						comments: [
							{
								type: 'Comment',
								guid: 'comment1',
								comment: 'How can we compare the verification tools in this article to others',
								commentator: 'Luis Angelo',
								date_created: SC.DateTime.create({year: 2010, month: 10, day: 25})
							},
							{
								type: 'Comment',
								guid: 'comment2',
								comment: 'Would like to see a comparison to behavioral appraaches',
								commentator: 'Viktor Onopko',
								date_created: SC.DateTime.create({year: 2010, month: 10, day: 27})
							}
						]
					},
					
					{
						type: 'Post',
						guid: 'post2',
						title: 'Specifying and Verifying Mobile Applications with Pi-Calculus',
						article: 'Write the content of the article',
						creator: 'Andrew Sean',
						date_created: SC.DateTime.create({year: 2010, month: 11, day: 02})
					}
				]
			},
			
			{
				type: 'Topic',
				guid: 'topic2',
				description: 'Agile methodologies',
				keywords: ['key4','key5','key6']
			},
			
			{
				type: 'Topic',
				guid: 'topic3',
				description: 'Test and Behavior Driven Methodologies',
				keywords: ['key7','key8','key9']
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
				description: 'Multi agent Systems',
				keywords: ['key10','key11']
			},
			
			{
				type: 'Topic',
				guid: 'topic5',
				description: 'Distributed Artificial Intelligence',
				keywords: ['key12','key13']
			},
			
			{
				type: 'Topic',
				guid: 'topic6',
				description: 'Distributed Planning',
				keywords: ['key14','key15']
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
				description: 'Policy-based Network management',
				keywords: ['key16','key17','key18']
			},
			
			{
				type: 'Topic',
				guid: 'topic8',
				description: 'Protocol Stack for Communication Systems',
				keywords: ['key19','key20','key21']
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
				description: 'Policy Information system',
				keywords: ['key22']
			}
		]
	}
];
