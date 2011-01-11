// ==========================================================================
// Project:   CinnamonDolceLatte.Discipline
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CinnamonDolceLatte.Discipline = SC.Record.extend(
/** @scope CinnamonDolceLatte.Discipline.prototype */ {
	
	childRecordNamespace: CinnamonDolceLatte,
	
	name: SC.Record.attr(String, {isRequired: YES}),
	topics: SC.Record.toMany('CinnamonDolceLatte.Topic', {nested: true}),
	
	treeItemIsExpanded: NO,	
	treeItemChildren: function(){
		return this.get("topics");
	}.property(),
	
	isDiscipline: function(){
		return YES;
	}
	
}) ;
