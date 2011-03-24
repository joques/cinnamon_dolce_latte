// ==========================================================================
// Project:   CinnamonDolceLatte.disciplineArrayController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
CinnamonDolceLatte.disciplineArrayController = SC.ArrayController.create(
/** @scope CinnamonDolceLatte.disciplineArrayController.prototype */ {
	
	addDiscipline: function() {
		var discipline = CinnamonDolceLatte.store.createRecord(CinnamonDolceLatte.Discipline, {
			name: "New Discipline"
		});
		
		return YES;
	},
	
	deleteDiscipline: function(recordId) {
		CinnamonDolceLatte.store.destroyRecord(CinnamonDolceLatte.Discipline, recordId) ;
		return YES;
	}

}) ;
