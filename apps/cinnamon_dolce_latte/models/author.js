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
CinnamonDolceLatte.Author = SC.Record.extend(
/** @scope CinnamonDolceLatte.Author.prototype */ {
	first_name: SC.Record.attr(String, {isRequired: YES}),
	last_name: SC.Record.attr(String, {isRequired: YES}),
	email: SC.Record.attr(String, {isRequired: YES})
}) ;
