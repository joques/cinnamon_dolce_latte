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
	
	name: SC.Record.attr(String),
	topics: SC.Record.toMany('CinnamonDolceLatte.Topic', {nested: true})
}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('cinnamon_dolce_latte');