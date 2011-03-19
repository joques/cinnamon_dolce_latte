// ==========================================================================
// Project:   CinnamonDolceLatte.citationController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
CinnamonDolceLatte.citationController = SC.ObjectController.create(
/** @scope CinnamonDolceLatte.citationController.prototype */ {
		contentBinding: SC.Binding.single('CinnamonDolceLatte.citationArrayController.selection'),
		canDeleteCitation: NO,
		contentIsChanged: NO,
		updatedTitle: null,
		updatedType: null,
		updatedDOP: null,
		canAddAuthor: NO,
		
		observeContent: function() {
			var refRecord = this.get('content');
			if(refRecord) {
				this.set('canDeleteCitation', YES);
				var authors = refRecord.get('authors');
				CinnamonDolceLatte.authorArrayController.set('content', authors);
				this.set('canAddAuthor', YES);
				this.set('updatedTitle', refRecord.get('resource_title'));
				this.set('updatedDOP', refRecord.get('date_of_publication'));
				this.set('updatedType', refRecord.get('resource_type'));
			} else {
				CinnamonDolceLatte.authorArrayController.set('content', null);
				this.set('canDeleteCitation', NO);
				this.set('canAddAuthor', NO);
				this.set('updatedTitle', null);
				this.set('updatedDOP', null);
				this.set('updatedType', null);
			}
		}.observes("content"),
		
		updatedReferenceDidChange: function() {
			var refRecord = this.get('content');
			if(refRecord) {
				if((this.get('updatedTitle') != this.get('resource_title')) || (this.get('updatedType') != this.get('resource_type')) || (this.get('updatedDOP') != this.get('date_of_publication'))) {
					this.set('contentIsChanged', YES);
				} else {
					this.set('contentIsChanged', NO);
				}				
			} else {
				this.set('contentIsChanged', NO);
			}
		}.observes('updatedTitle','updatedType', 'updatedDOP'),
		
		save: function() {
			this.set('resource_title', this.get('updatedTitle'));
			this.set('resource_type', this.get('updatedType'));
			this.set('date_of_publication', this.get('updatedDOP'));

			var allRefs = CinnamonDolceLatte.citationArrayController.get('arrangedObjects');
			var curRefIdx = allRefs.indexOf(this.get('content'));

			if(curRefIdx != -1) {
				CinnamonDolceLatte.citationArrayController.updateCitations(curRefIdx);
			}
		},
		
		discard: function() {
			this.set('updatedTitle', null);
			this.set('updatedType', null);
			this.set('updatedDOP', null);
		}
		
}) ;
