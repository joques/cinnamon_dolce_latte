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
	topicCol: null,
		
	observeContent: function() {
		var record = this.get("content");
		
		if(record) {			
			this.set('canDeleteNode', YES);
			if(record.isTopic) {
				this.set('canAddPost', YES);
				
				// Add topic Array controller and select the current one
				var allDisc = CinnamonDolceLatte.disciplinesTreeController.get('arrangedObjects');
				if (allDisc) {
					var discSize = allDisc.get('length');

					var discCount;
					for(discCount=0; discCount<discSize; discCount++) {
						var curTopicCol = allDisc.objectAt(discCount).get('topics');

						if (curTopicCol) {
							var topIdx = curTopicCol.indexOf(record);

							if(topIdx != -1) {
								this.set('topicCol', curTopicCol);
								break;
							}
						}
					}

					CinnamonDolceLatte.topicArrayController.set('content', this.get('topicCol'));
					CinnamonDolceLatte.topicArrayController.selectObject(record);

					// set the content of the postArrayController
					var selectedPosts = record.get("posts");
					CinnamonDolceLatte.postArrayController.set('content', selectedPosts);
				}
			} else if(record.isDiscipline) {
				this.set('canAddPost', NO);
				CinnamonDolceLatte.disciplineArrayController.selectObject(record);
				
				var selTopics = record.get("topics");
				this.set('topicCol', selTopics);
				CinnamonDolceLatte.topicArrayController.set('content', this.get('topicCol'));
				
				CinnamonDolceLatte.postArrayController.set('content', null);
			}
			
			CinnamonDolceLatte.topicArrayController.set('content', this.get('topicCol'));
			
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
					CinnamonDolceLatte.topicArrayController.deleteTopic(curSel, this.get('topicCol'));
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
	},
	
	updateNodeName: function(finalValue) {
		var record = this.get('content');
		if(record) {
			if(record.isTopic) {
				record.set('description', finalValue);
			} else if(record.isDiscipline) {
				record.set('name', finalValue);
			}
		}		
	}
		
}) ;
