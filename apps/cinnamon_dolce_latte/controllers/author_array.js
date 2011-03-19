// ==========================================================================
// Project:   CinnamonDolceLatte.authorArrayController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
CinnamonDolceLatte.authorArrayController = SC.ArrayController.create(
/** @scope CinnamonDolceLatte.authorArrayController.prototype */ {

	addAuthor: function() {
		var curRef = CinnamonDolceLatte.citationController.get('content');
		var authorCol = curRef.get('authors');
		
		authorCol.pushObject({
			type: 'Author',
			first_name: 'FirstName',
			last_name: 'LastName',
			email: 'email@address'
		});
								
		return YES;		
	},
	
	deleteAuthor: function() {
		var authorCol = CinnamonDolceLatte.citationController.get('content').get('authors');
		var selAuthor = CinnamonDolceLatte.authorController.get('content');
		authorCol.removeObject(selAuthor);
		
		// select a new post if possible
		var authorLength = this.get('arrangedObjects').get('length');
		
		if(authorLength > 0) {
			this.selectObject(this.get('arrangedObjects').objectAt(0));
		}
		
		return YES;
	},
	
	updateAuthors: function(authorIdx) {
		this.enumerableContentDidChange(authorIdx, 1, 0);
	}

}) ;
