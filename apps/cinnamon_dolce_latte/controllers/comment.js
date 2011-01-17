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
	updatedComment: null,
	contentIsChanged: NO,
	
	observeContent: function() {
		var commentRecord = this.get('content');
		if(commentRecord) {
			this.set('canDeleteComment', YES);
			this.set('updatedComment', commentRecord.get('comment'));
		} else {
			this.set('canDeleteComment', NO);
			this.set('updatedComment', null);
		}				
	}.observes("content"),
	
	updatedCommentDidChange: function() {
		var commentRecord = this.get('content');
		if(commentRecord) {
			if(this.get('updatedComment') != this.get('comment')) {
				this.set('contentIsChanged', YES);
			} else {
				this.set('contentIsChanged', NO);
			}
		} else {
			this.set('contentIsChanged', NO);
		}
	}.observes('updatedComment'),
	
	discard: function() {
		this.set('updatedComment', null);
	},
	
	save: function() {
		this.set('comment', this.get('updatedComment'));
		var allComments = CinnamonDolceLatte.commentArrayController.get('arrangedObjects');
		var curCommentIdx = allComments.indexOf(this.get('content'));
		
		if(curCommentIdx != -1) {
			CinnamonDolceLatte.commentArrayController.updateComments(curCommentIdx);
		}
	}
	
	
}) ;
