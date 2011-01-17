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
CinnamonDolceLatte.Topic = SC.ChildRecord.extend(
/** @scope CinnamonDolceLatte.Topic.prototype */ {
	childRecordNamespace: CinnamonDolceLatte,
	
	description: SC.Record.attr(String, {isRequired: YES}),
	posts: SC.Record.toMany('CinnamonDolceLatte.Post', { nested: true }),
		
	treeItemIsExpanded: NO,	
	treeItemChildren: function(){
		return null;
	}.property().cacheable(),
	
	name: function(){
		return this.get("description");
	}.property('description').cacheable(),
	
	isTopic: function(){
		return YES;
	}
		
}) ;