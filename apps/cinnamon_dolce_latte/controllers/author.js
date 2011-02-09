// ==========================================================================
// Project:   CinnamonDolceLatte.authorController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
CinnamonDolceLatte.authorController = SC.ObjectController.create(
/** @scope CinnamonDolceLatte.authorController.prototype */ {
		contentBinding: SC.Binding.single('CinnamonDolceLatte.authorArrayController.selection'),
		canDeleteAuthor: NO,
		
		observeContent: function() {
			var authorRecord = this.get('content');
			if(authorRecord) {
				this.set('canDeleteAuthor', YES);
				// this.set('updatedComment', commentRecord.get('comment'));
			} else {
				this.set('canDeleteAuthor', NO);
				// this.set('updatedComment', null);
			}				
		}.observes("content")
}) ;
