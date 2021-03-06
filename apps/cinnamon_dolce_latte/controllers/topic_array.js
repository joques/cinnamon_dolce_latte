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
		var topic = CinnamonDolceLatte.store.createRecord(CinnamonDolceLatte.Topic, {
			description: 'New Topic',
			keywords: [],
			posts: []
		});
		
		topics.pushObject(topic);
				
		return YES;
	},
	
	deleteTopic: function(topic, topicCol) {
		topicCol.removeObject(topic);
		CinnamonDolceLatte.store.destroyRecord(CinnamonDolceLatte.Topic, topic.get('id')) ;
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
					CinnamonDolceLatte.statechart.gotoState('applicationMamager');
					return;
				}
			}	
		}
		
		this.set("searchKeyword", '');
		CinnamonDolceLatte.statechart.gotoState('applicationMamager');		
		SC.AlertPane.error("_KeywordSearch".loc(), "_KeywordNF".loc());	
	}
}) ;
