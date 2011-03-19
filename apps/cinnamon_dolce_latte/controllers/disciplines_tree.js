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
				var disciplines = CinnamonDolceLatte.store.find(CinnamonDolceLatte.DISCIPLINES_QUERY);
				CinnamonDolceLatte.disciplineArrayController.set('content', disciplines);			
				return disciplines;
			}.property()
		});
		
		this.set('content', rootNode);

	}	
}) ;