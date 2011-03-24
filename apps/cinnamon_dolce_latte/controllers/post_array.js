// ==========================================================================
// Project:   CinnamonDolceLatte.postArrayController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
CinnamonDolceLatte.postArrayController = SC.ArrayController.create(
/** @scope CinnamonDolceLatte.postArrayController.prototype */ {
	
	addPost: function() {
		var curTopic = CinnamonDolceLatte.topicController.get('content');
		var postCol = curTopic.get('posts');
		var creatorName = CinnamonDolceLatte.loginController.get('nameToDisplay');
		
		var post = CinnamonDolceLatte.store.createRecord(CinnamonDolceLatte.Post, {
			title: 'New Post',
			article: 'Post the article here',
			creator: creatorName,
			date_created: SC.DateTime.create(),
			comments: [],
			posts: []		
		});
		
		postCol.pushObject(post);
		
		return YES;		
	},
	
	deletePost: function() {
		var postCol = CinnamonDolceLatte.topicController.get('content').get('posts');
		var selPost = CinnamonDolceLatte.postController.get('content');
		postCol.removeObject(selPost);
		CinnamonDolceLatte.store.destroyRecord(CinnamonDolceLatte.Post, selPost.get('id')) ;
		
		// select a new post if possible
		var postLength = this.get('arrangedObjects').get('length');		
		if (postLength > 0) {
			this.selectObject(this.get('arrangedObjects').objectAt(0));
		}
		
		return YES;
	},
	
	updatePosts: function(postIdx) {
		this.enumerableContentDidChange(postIdx, 1, 0);
	}
	
}) ;
