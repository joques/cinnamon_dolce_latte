// ==========================================================================
// Project:   CinnamonDolceLatte.topicController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
CinnamonDolceLatte.topicController = SC.ObjectController.create(
/** @scope CinnamonDolceLatte.topicController.prototype */ {
	
		contentBinding: SC.Binding.single('CinnamonDolceLatte.topicArrayController.selection')

}) ;
