// ==========================================================================
// Project:   CinnamonDolceLatte.centralIdController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
CinnamonDolceLatte.centralIdController = SC.ObjectController.create(
/** @scope CinnamonDolceLatte.centralIdController.prototype */ {

storeIds: function() {
	var iDQuery = SC.Query.local(CinnamonDolceLatte.CentralId);
	var idSet = CinnamonDolceLatte.store.find(iDQuery);
	
	var uniqSet = idSet.objectAt(0);		
	
	this.set('content', uniqSet);
},

nextDisciplineId: function() {
	var discId = this.get('discipline_id');
	discId = discId +1;
	this.set('discipline_id', discId);
	return discId;
},

nextTopicId: function() {
	var topicId = this.get('topic_id');
	topicId = topicId +1;
	this.set('topic_id', topicId);
	return topicId;
},

nextPostId: function() {
	var postId = this.get('post_id');
	postId = postId +1;
	this.set('post_id', postId);
	return postId;
},

nextCommentId: function() {
	var commentId = this.get('comment_id');
	commentId = commentId +1;
	this.set('comment_id', commentId);
	return commentId;	
},

nextReferenceId: function() {
	var refId = this.get('reference_id');
	refId = refId +1;
	this.set('reference_id', refId);
	return refId;
},

nextAuthorId: function() {
	var authorId = this.get('author_id');
	authorId = authorId +1;
	this.set('author_id', authorId);
	return authorId;
}

}) ;
