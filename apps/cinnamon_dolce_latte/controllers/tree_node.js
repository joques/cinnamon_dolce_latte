// ==========================================================================
// Project:   CinnamonDolceLatte.treeNodeController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
CinnamonDolceLatte.treeNodeController = SC.ObjectController.create(
/** @scope CinnamonDolceLatte.treeNodeController.prototype */ {
	
	contentBinding: SC.Binding.single('CinnamonDolceLatte.disciplinesTreeController.selection'),
	canDeleteNode: NO,
	canAddPost: NO,
	
	observeContent: function() {
		var record = this.get("content");
		
		if(record) {
			this.set('canDeleteNode', YES);
			this.set('canAddPost', YES);
			if(record.isTopic) {
				var selectedPosts = record.get("posts");
				CinnamonDolceLatte.postArrayController.set('content', selectedPosts);
			} else if(record.isDiscipline) {
				CinnamonDolceLatte.disciplineArrayController.selectObject(record);
				
				var selTopics = record.get("topics");
				CinnamonDolceLatte.topicArrayController.set('content', selTopics);
				
				CinnamonDolceLatte.postArrayController.set('content', null);
			}
		} else {
			this.set('canDeleteNode', NO);
			this.set('canAddPost', NO);	
		}		
	}.observes("content"),
	
	deleteNode: function() {
		var allTreeNodes = CinnamonDolceLatte.disciplinesTreeController.get('arrangedObjects');
		var firstNode = null;
		var treeNodeCount = allTreeNodes.get('length');
		if(treeNodeCount > 0) {
			firstNode = allTreeNodes.objectAt(0);
		}		
		
		// delete the current node
		var curSel = this.get('content');
		if(curSel) {
			if(curSel.isDiscipline) {
				CinnamonDolceLatte.disciplineArrayController.deleteDiscipline(curSel.get('id'));
			} else if(curSel.isTopic) {
				
				if(treeNodeCount > 0) {
					var topics;
					var i;
										
					for(i=0; i<treeNodeCount; i++) {
						var curTopics = allTreeNodes.objectAt(i).get('topics');
						var topicIdx = curTopics.indexOf(curSel);
						
						if(topicIdx != -1) {
							topics = curTopics;
							break;
						}
					}
					
					CinnamonDolceLatte.topicArrayController.deleteTopic(curSel, topics);
				}
			}
		}
		
		// then select the first one in collection		
		
		if(firstNode) {
			CinnamonDolceLatte.disciplinesTreeController.selectObject(firstNode);
		}
		
		return YES;
	},
	
	addNode: function() {
		var ndRecord = this.get('content');
		if(ndRecord) {
			if(ndRecord.isDiscipline) {
				var topics = ndRecord.get("topics");
				return CinnamonDolceLatte.topicArrayController.addTopic(topics);
			} else {return YES;}
		} else {
			return CinnamonDolceLatte.disciplineArrayController.addDiscipline();
		}
	}
		
}) ;
