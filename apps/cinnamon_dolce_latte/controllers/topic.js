// ==========================================================================
// Project:   CinnamonDolceLatte.topicController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
CinnamonDolceLatte.topicController = SC.ObjectController.create(
/** @scope CinnamonDolceLatte.topicController.prototype */ {
	
		contentBinding: SC.Binding.single('CinnamonDolceLatte.topicArrayController.selection'),
		
			observeContent: function() {
				var record = this.get("content");
				if (record) {
					var parentRecord = CinnamonDolceLatte.disciplineController.get('content') ;
					if (parentRecord) {
						return ;
					} else {
						var allDisc = CinnamonDolceLatte.disciplineArrayController.get('arrangedObjects');
						var childCount = allDisc.get('length');
						
						for(var childPos = 0; childPos < childCount; childPos++) {
							var curTopicCol = allDisc.objectAt(childPos).get('topics');
							
							if (curTopicCol) {
								var topicIdx = curTopicCol.indexOf(record);
								if (topicIdx != -1) {
									CinnamonDolceLatte.disciplineArrayController.selectObject(allDisc.objectAt(childPos));
									break;
								}
							}
						}
					}
				}
			}.observes("content")

}) ;
