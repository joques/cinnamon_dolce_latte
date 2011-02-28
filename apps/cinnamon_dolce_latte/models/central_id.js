// ==========================================================================
// Project:   CinnamonDolceLatte.CentralId
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CinnamonDolceLatte.CentralId = SC.Record.extend(
/** @scope CinnamonDolceLatte.CentralId.prototype */ {
	discipline_id: SC.Record.attr(Number, { isRequired: YES }),
	topic_id: SC.Record.attr(Number, { isRequired: YES }),
	post_id: SC.Record.attr(Number, { isRequired: YES }),
	comment_id: SC.Record.attr(Number, { isRequired: YES }),
	reference_id: SC.Record.attr(Number, { isRequired: YES }),
	author_id: SC.Record.attr(Number, { isRequired: YES })
}) ;
