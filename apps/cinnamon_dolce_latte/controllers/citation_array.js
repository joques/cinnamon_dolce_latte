// ==========================================================================
// Project:   CinnamonDolceLatte.citationArrayController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
CinnamonDolceLatte.citationArrayController = SC.ArrayController.create(
/** @scope CinnamonDolceLatte.citationArrayController.prototype */ {
	
	addCitation: function() {
		var curPost = CinnamonDolceLatte.postController.get('content');
		var postCitations = curPost.get('citations');
		var citation = CinnamonDolceLatte.store.createRecord(CinnamonDolceLatte.Citation, {
			resource_title: 'New citation',
			resource_type: 'Conference',
			date_of_publication: SC.DateTime.create(),
			authors: []			
		});
		
		postCitations.pushObject(citation);
								
		return YES;
	},
	
	deleteCitation: function() {
		var postCitations = CinnamonDolceLatte.postController.get('content').get('citations');
		var selCitation = CinnamonDolceLatte.citationController.get('content');
		postCitations.removeObject(selCitation);
		CinnamonDolceLatte.store.destroyRecord(CinnamonDolceLatte.Citation, selCitation.get('id')) ;
		
		// select a new post if possible
		var citationLength = this.get('arrangedObjects').get('length');
		
		if(citationLength > 0) {
			this.selectObject(this.get('arrangedObjects').objectAt(0));
		}
		
		return YES;
	},
	
	updateCitations: function(refIdx) {
		this.enumerableContentDidChange(refIdx, 1, 0);
	}
	
}) ;
