// ==========================================================================
// Project:   CinnamonDolceLatte.topicArrayController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
CinnamonDolceLatte.topicArrayController = SC.ArrayController.create(
/** @scope CinnamonDolceLatte.topicArrayController.prototype */ {
	
	addTopic: function(topics) {
		var topic;
		var top_len = this.get('content').get('length');
		top_len++;
		
		// Need a smarter approach to guid generation. Maybe, I could use a central controller 
		var guid_val = "topic" + top_len;
		
		topics.pushObject({
			type: 'Topic',
			guid: guid_val,
			description: 'New Topic',
			posts: []
		});
				
		return YES;
	},
	
	deleteTopic: function(topic, topicCol) {
		topicCol.removeObject(topic);
	}
}) ;
