// ==========================================================================
// Project:   CinnamonDolceLatte.referenceController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
CinnamonDolceLatte.referenceController = SC.ObjectController.create(
/** @scope CinnamonDolceLatte.referenceController.prototype */ {
		contentBinding: SC.Binding.single('CinnamonDolceLatte.referenceArrayController.selection'),
		canDeleteReference: NO,
		contentIsChanged: NO,
		
		observeContent: function() {
			var refRecord = this.get('content');
			if(refRecord) {
				this.set('canDeleteReference', YES);
			} else {
				this.set('canDeleteReference', NO);
			}
		}.observes("content"),
		
		save: function() {
			return ;
		},
		
		discard: function() {
			return ;
		}
		
}) ;
