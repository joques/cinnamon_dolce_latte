/**
 * This is the discipline and topic state manager.
 *
 * @author joques
 * 
 */

CinnamonDolceLatte.commentManagerState = Ki.State.extend({
	initialSubstate: 'showingComments',
		
	showingComments: Ki.State.design({
		addComment: function() {
			CinnamonDolceLatte.commentArrayController.addComment();
		},
		
		deleteComment: function() {
			CinnamonDolceLatte.commentArrayController.deleteComment();
		},
		
		showCommentEditor: function() {
			this.gotoState('showingCommentEditor');
		}
	}),
	
	showingCommentEditor: Ki.State.design({
		enterState: function() {
			CinnamonDolceLatte.mainPage.detailCommentPane.showForUpdate();
		},
		
		saveComment:function() {
			CinnamonDolceLatte.commentController.save();
			this.gotoState('showingComments');
		},
		
		cancelComment: function() {
			CinnamonDolceLatte.commentController.discard();
			this.gotoState('showingComments');
		},
		
		exitState: function() {
			CinnamonDolceLatte.mainPage.detailCommentPane.set('detailIsVisible', NO);
		}
	})
});