// ==========================================================================
// Project:   CinnamonDolceLatte.postController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
CinnamonDolceLatte.postController = SC.ObjectController.create(
/** @scope CinnamonDolceLatte.postController.prototype */ {
	contentBinding: SC.Binding.single('CinnamonDolceLatte.postArrayController.selection'),
	canDeletePost: NO,
	canAddComment: NO,
	
	observeContent: function() {
		var postRecord = this.get('content');
		if(postRecord) {
			this.set('canDeletePost', YES);
			this.set('canAddComment', YES);
			var selComments = postRecord.get('comments');
			CinnamonDolceLatte.commentArrayController.set('content', selComments);			
		} else {
			CinnamonDolceLatte.commentArrayController.set('content', null);
			this.set('canDeletePost', NO);
			this.set('canAddComment', NO);
		}
				
	}.observes("content")
}) ;
