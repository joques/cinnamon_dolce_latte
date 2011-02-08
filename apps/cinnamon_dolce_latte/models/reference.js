// ==========================================================================
// Project:   CinnamonDolceLatte.Reference
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CinnamonDolceLatte.Reference = SC.ChildRecord.extend(
/** @scope CinnamonDolceLatte.Reference.prototype */ {
	childRecordNamespace: CinnamonDolceLatte,
	
	resource_title: SC.Record.attr(String, {isRequired: YES}),
	resource_type: SC.Record.attr(String, {isRequired: YES}),
	date_of_publication: SC.Record.attr(SC.DateTime),
	authors: SC.Record.toMany('CinnamonDolceLatte.Author', { nested: YES, isEditable: YES }),
	
	authorsName: function() {
		var authorCol = this.get('authors');
		if(authorCol) {
			var authorCount = authorCol.get('length');
			if(authorCount === 0) {
				return '';
			} else {
				
				var firstAuthor = authorCol.objectAt(0);

				var firstNameInitial = firstAuthor.get('first_name').substr(0,1).toUpperCase();
				var lastName = firstAuthor.get('last_name');
				var lastNameCapitalize = lastName.charAt(0).toUpperCase() + lastName.slice(1);
				var authorName = firstNameInitial + '. ' + lastNameCapitalize;

				if(authorCount > 1) {
					authorName = authorName + ' et al';
				} 

				return authorName;
			}			
		} else {
			return '';
		}
	}.property('authors')
}) ;
