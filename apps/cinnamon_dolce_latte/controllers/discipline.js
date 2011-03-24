// ==========================================================================
// Project:   CinnamonDolceLatte.disciplineController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
CinnamonDolceLatte.disciplineController = SC.ObjectController.create(
/** @scope CinnamonDolceLatte.disciplineController.prototype */ {
	contentBinding: SC.Binding.single('CinnamonDolceLatte.disciplineArrayController.selection')
}) ;
