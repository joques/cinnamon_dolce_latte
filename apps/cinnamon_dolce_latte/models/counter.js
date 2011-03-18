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
CinnamonDolceLatte.Counter = SC.Record.extend(
/** @scope CinnamonDolceLatte.Counter.prototype */ {
	discipline_counter: SC.Record.attr(Number, { isRequired: YES }),
	topic_counter: SC.Record.attr(Number, { isRequired: YES }),
	post_counter: SC.Record.attr(Number, { isRequired: YES }),
	comment_counter: SC.Record.attr(Number, { isRequired: YES }),
	reference_counter: SC.Record.attr(Number, { isRequired: YES }),
	author_counter: SC.Record.attr(Number, { isRequired: YES })
}) ;
