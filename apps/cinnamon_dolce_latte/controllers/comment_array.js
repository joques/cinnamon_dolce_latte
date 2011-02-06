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

		// generate the id 
		var com_lenght = this.get('content').get('length');
		com_lenght++;
		var guid_val = "comment" + com_lenght;
				
		var myNewComment = CinnamonDolceLatte.store.createRecord(CinnamonDolceLatte.Comment, {
			guid: guid_val,
			comment: 'Add your comment here here',
			commentator: commentatorName,
			date_created: SC.DateTime.create()
		});
		
		commentCol.pushObject(myNewComment);				
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
