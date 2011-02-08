// ==========================================================================
// Project:   CinnamonDolceLatte.Comment
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CinnamonDolceLatte.Comment = SC.ChildRecord.extend(
/** @scope CinnamonDolceLatte.Comment.prototype */ {
	
		childRecordNamespace: CinnamonDolceLatte,
		comment: SC.Record.attr(String, {isRequired: YES}),
		commentator: SC.Record.attr(String, {isRequired: YES}),
		date_created: SC.Record.attr(SC.DateTime),
		
		shortComment: function() {
			var com_len = this.get('comment').length;

			if(com_len < 80) {
				return this.get('comment');
			} else {
				return [this.get('comment').substring(0,80), "..."].join("");
			}
		}.property('comment').cacheable()
		
		
}) ;
