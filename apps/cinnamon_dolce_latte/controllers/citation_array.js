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
		var refCol = curPost.get('post_refs');
		
		refCol.pushObject({
			type: 'Reference',
			resource_title: 'New citation',
			resource_type: 'Conference',
			date_of_publication: SC.DateTime.create(),
			authors: []
		});
								
		return YES;
	},
	
	deleteCitation: function() {
		var refCol = CinnamonDolceLatte.postController.get('content').get('post_refs');
		var selRef = CinnamonDolceLatte.citationController.get('content');
		refCol.removeObject(selRef);
		
		// select a new post if possible
		var refLength = this.get('arrangedObjects').get('length');
		
		if(refLength > 0) {
			this.selectObject(this.get('arrangedObjects').objectAt(0));
		}
		
		return YES;
	},
	
	updateCitations: function(refIdx) {
		this.enumerableContentDidChange(refIdx, 1, 0);
	}
	
}) ;
