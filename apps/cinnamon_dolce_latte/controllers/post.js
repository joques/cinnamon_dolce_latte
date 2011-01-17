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
	updatedTitle: null,
	updatedArticle: null,
	contentIsChanged: NO,
	
	observeContent: function() {
		var postRecord = this.get('content');
		if(postRecord) {
			this.set('canDeletePost', YES);
			this.set('canAddComment', YES);
			
			this.set('updatedTitle', postRecord.get('title'));
			this.set('updatedArticle', postRecord.get('article'));
			
			var selComments = postRecord.get('comments');
			CinnamonDolceLatte.commentArrayController.set('content', selComments);			
		} else {
			CinnamonDolceLatte.commentArrayController.set('content', null);
			this.set('canDeletePost', NO);
			this.set('canAddComment', NO);
			
			this.set('updatedTitle', null);
			this.set('updatedArticle', null);
		}
				
	}.observes("content"),
	
	
	updatedCommentDidChange: function() {
		var commentRecord = this.get('content');
		if(commentRecord) {
			if((this.get('updatedTitle') != this.get('title')) || (this.get('updatedArticle') != this.get('article'))) {
				this.set('contentIsChanged', YES);
			} else {
				this.set('contentIsChanged', NO);
			}
		} else {
			this.set('contentIsChanged', NO);
		}
	}.observes('updatedTitle','updatedArticle'),
	
	discard: function() {
		this.set('updatedTitle', null);
		this.set('updatedArticle', null);
	},
	
	save: function() {
		this.set('title', this.get('updatedTitle'));
		this.set('article', this.get('updatedArticle'));
		
		var allPosts = CinnamonDolceLatte.postArrayController.get('arrangedObjects');
		var curPostIdx = allPosts.indexOf(this.get('content'));
		
		if(curPostIdx != -1) {
			CinnamonDolceLatte.postArrayController.updatePosts(curPostIdx);
		}	
	}
}) ;
