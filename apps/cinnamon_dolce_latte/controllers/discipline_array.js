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
		// Normally, I should make sure that the guid is unique
		var discipline;
		
		discipline = CinnamonDolceLatte.store.createRecord(CinnamonDolceLatte.Discipline, {
			name: "New Discipline",
			topics: []
		});
		
		return YES;
	},
	
	deleteDiscipline: function(recordId) {
		CinnamonDolceLatte.store.destroyRecord(CinnamonDolceLatte.Discipline, recordId) ;
		return YES;
	}

}) ;
