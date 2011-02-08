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
	
	searchKeyword: '',
	canSearch: NO,
	
	observeSearchKeyword: function() {
		var mySearchKeyword = this.get("searchKeyword");
		if ((mySearchKeyword === undefined) || (mySearchKeyword === null) || (mySearchKeyword === '')) {
			this.set("canSearch", NO);	
		} else {
			this.set("canSearch", YES);
		}
	}.observes("searchKeyword"),
	
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
			keywords: [],
			posts: []
		});				

		return YES;
	},
	
	deleteTopic: function(topic, topicCol) {
		topicCol.removeObject(topic);
	},
	
	localSearch: function() {
		var allTopics = this.get("content");
		if(allTopics) {
			var topicCount = allTopics.get("length");
			var i;
			for (i=0; i<topicCount; i++) {
				var curTopic = allTopics.objectAt(i);
				var curKeywords = curTopic.get("keywords");
				var curKeywordIdx = curKeywords.indexOf(this.get("searchKeyword"));
				
				if (curKeywordIdx != -1) {
					CinnamonDolceLatte.disciplinesTreeController.selectObject(curTopic);
					this.set("searchKeyword", '');
					return;
				}
			}	
		}
		
		this.set("searchKeyword", '');		
		SC.AlertPane.error("Keyword search", "Keyword not found!");	
	}
}) ;
