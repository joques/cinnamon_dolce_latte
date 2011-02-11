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
		contentIsChanged: NO,
		updatedFirstName: null,
		updatedLastName: null,
		updatedEmail: null,
		
		observeContent: function() {
			var authorRecord = this.get('content');
			if(authorRecord) {
				this.set('canDeleteAuthor', YES);
				this.set('updatedFirstName', authorRecord.get('first_name'));
				this.set('updatedLastName', authorRecord.get('last_name'));
				this.set('updatedEmail', authorRecord.get('email'));				
			} else {
				this.set('canDeleteAuthor', NO);
				this.set('updatedFirstName', null);
				this.set('updatedLastName', null);
				this.set('updatedEmail', null);
			}				
		}.observes("content"),
		
		updatedAuthorDidChange: function() {
			var authorRecord = this.get('content');
			if(authorRecord) {
				if((this.get('updatedFirstName') != this.get('first_name')) || (this.get('updatedLastName') != this.get('last_name')) || (this.get('updatedEmail') != this.get('email'))) {
						this.set('contentIsChanged', YES);
				} else {
						this.set('contentIsChanged', NO);
				}
			} else {
				this.set('contentIsChanged', NO);
			}
		}.observes('updatedFirstName','updatedLastName','updatedEmail'),
		
		discard: function() {
			this.set('updatedFirstName', null);
			this.set('updatedLastName', null);
			this.set('updatedEmail', null);
		},

		save: function() {
			this.set('first_name', this.get('updatedFirstName'));
			this.set('last_name', this.get('updatedLastName'));
			this.set('email', this.get('updatedEmail'));
			var allAuthors = CinnamonDolceLatte.authorArrayController.get('arrangedObjects');
			var curAuthorIdx = allAuthors.indexOf(this.get('content'));
			
			if(curAuthorIdx != -1) {
				CinnamonDolceLatte.authorArrayController.updateAuthors(curAuthorIdx);
			}
			
			var allRefs = CinnamonDolceLatte.referenceArrayController.get('arrangedObjects');
			var curRefIdx = allRefs.indexOf(CinnamonDolceLatte.referenceController.get('content'));

			if(curRefIdx != -1) {
				CinnamonDolceLatte.referenceArrayController.updateReferences(curRefIdx);
			}
		}
}) ;
