// ==========================================================================
// Project:   CinnamonDolceLatte.Topic
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CinnamonDolceLatte.Topic = SC.Record.extend(
/** @scope CinnamonDolceLatte.Topic.prototype */ {
	nestedRecordNamespace: CinnamonDolceLatte,
		
	description: SC.Record.attr(String, {isRequired: YES}),
	keywords: SC.Record.attr(Array, {isRequired: YES}),
	posts: SC.Record.toMany('CinnamonDolceLatte.Post', { nested: YES, isEditable: YES }),
		
	treeItemIsExpanded: NO,	
	treeItemChildren: function(){
		return null;
	}.property(),
	
	name: function(){
		return this.get("description");
	}.property('description'),
	
	isTopic: function(){
		return YES;
	}
		
}) ;