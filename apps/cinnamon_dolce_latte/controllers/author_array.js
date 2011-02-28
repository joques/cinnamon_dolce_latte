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
		var curRef = CinnamonDolceLatte.referenceController.get('content');
		var authorCol = curRef.get('authors');
		
		// generate the id 
		var authorId = CinnamonDolceLatte.centralIdController.nextAuthorId();
		var guid_val = "author" + authorId;
				
		authorCol.pushObject({
			type: 'Author',
			guid: guid_val,
			first_name: 'FirstName',
			last_name: 'LastName',
			email: 'email@address'
		});
								
		return YES;		
	},
	
	deleteAuthor: function() {
		var authorCol = CinnamonDolceLatte.referenceController.get('content').get('authors');
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
