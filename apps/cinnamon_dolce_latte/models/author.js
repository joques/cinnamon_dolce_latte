// ==========================================================================
// Project:   CinnamonDolceLatte.Author
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CinnamonDolceLatte.Author = SC.ChildRecord.extend(
/** @scope CinnamonDolceLatte.Author.prototype */ {
	childRecordNamespace: CinnamonDolceLatte,
	
	first_name: SC.Record.attr(String, {isRequired: YES}),
	last_name: SC.Record.attr(String, {isRequired: YES}),
	email: SC.Record.attr(String, {isRequired: YES})
}) ;
