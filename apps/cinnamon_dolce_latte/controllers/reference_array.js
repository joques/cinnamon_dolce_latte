// ==========================================================================
// Project:   CinnamonDolceLatte.referenceArrayController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
CinnamonDolceLatte.referenceArrayController = SC.ArrayController.create(
/** @scope CinnamonDolceLatte.referenceArrayController.prototype */ {
	
	addReference: function() {
		var curPost = CinnamonDolceLatte.postController.get('content');
		var refCol = curPost.get('post_refs');
		
		// generate the id 
		var refId = CinnamonDolceLatte.centralIdController.nextReferenceId();		
		var guid_val = "ref" + refId;
				
		refCol.pushObject({
			type: 'Reference',
			guid: guid_val,
			resource_title: 'New reference',
			resource_type: 'Conference',
			date_of_publication: SC.DateTime.create(),
			authors: []
		});
								
		return YES;
	},
	
	deleteReference: function() {
		var refCol = CinnamonDolceLatte.postController.get('content').get('post_refs');
		var selRef = CinnamonDolceLatte.referenceController.get('content');
		refCol.removeObject(selRef);
		
		// select a new post if possible
		var refLength = this.get('arrangedObjects').get('length');
		
		if(refLength > 0) {
			this.selectObject(this.get('arrangedObjects').objectAt(0));
		}
		
		return YES;
	},
	
	updateReferences: function(refIdx) {
		this.enumerableContentDidChange(refIdx, 1, 0);
	}
	
}) ;
