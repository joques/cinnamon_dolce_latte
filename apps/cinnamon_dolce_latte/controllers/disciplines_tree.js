// ==========================================================================
// Project:   CinnamonDolceLatte.disciplinesTreeController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.TreeController
*/
CinnamonDolceLatte.disciplinesTreeController = SC.TreeController.create(
/** @scope CinnamonDolceLatte.disciplinesTreeController.prototype */ {
	
	populateDisciplines: function() {
		var rootNode = SC.Object.create({
			treeItemIsExpanded: YES,
			name: "root",
			treeItemChildren: function(){
				var disciplineQuery = SC.Query.local(CinnamonDolceLatte.Discipline);
				var disciplines = CinnamonDolceLatte.store.find(disciplineQuery);				
				return disciplines;
			}.property()
		});
		this.set('content', rootNode);		
	}
}) ;