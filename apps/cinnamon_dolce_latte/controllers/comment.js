// ==========================================================================
// Project:   CinnamonDolceLatte.commentController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
CinnamonDolceLatte.commentController = SC.ObjectController.create(
/** @scope CinnamonDolceLatte.commentController.prototype */ {
	
	contentBinding: SC.Binding.single('CinnamonDolceLatte.commentArrayController.selection'),
	canDeleteComment: NO,
	
	observeContent: function() {
		var commentRecord = this.get('content');
		if(commentRecord) {
			this.set('canDeleteComment', YES);
		} else {
			this.set('canDeleteComment', NO);
		}				
	}.observes("content")
	
	
}) ;
