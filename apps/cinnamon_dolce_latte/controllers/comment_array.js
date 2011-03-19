// ==========================================================================
// Project:   CinnamonDolceLatte.commentArrayController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
CinnamonDolceLatte.commentArrayController = SC.ArrayController.create(
/** @scope CinnamonDolceLatte.commentArrayController.prototype */ {
	
	addComment: function() {
		var curPost = CinnamonDolceLatte.postController.get('content');
		var commentCol = curPost.get('comments');
		
		var commentatorName = CinnamonDolceLatte.loginController.get('nameToDisplay');
		
		commentCol.pushObject({
			type: 'Comment',
			comment: 'Add your comment here here',
			commentator: commentatorName,
			date_created: SC.DateTime.create()
		});
		
		return YES;
	},
	
	deleteComment: function() {
		var commentCol = CinnamonDolceLatte.postController.get('content').get('comments');
		var selComment = CinnamonDolceLatte.commentController.get('content');
		commentCol.removeObject(selComment);
		
		// select a new post if possible
		var comLength = this.get('arrangedObjects').get('length');
		
		if(comLength > 0) {
			this.selectObject(this.get('arrangedObjects').objectAt(0));
		}
		
		return YES;		
	},
	
	updateComments: function(commentIdx) {
		this.enumerableContentDidChange(commentIdx, 1, 0);
	}

}) ;
