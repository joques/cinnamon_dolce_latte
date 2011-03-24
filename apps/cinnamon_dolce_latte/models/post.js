// ==========================================================================
// Project:   CinnamonDolceLatte.Post
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CinnamonDolceLatte.Post = SC.Record.extend(
/** @scope CinnamonDolceLatte.Post.prototype */ {
	nestedRecordNamespace: CinnamonDolceLatte,
	
	title: SC.Record.attr(String, {isRequired: YES}),
	article: SC.Record.attr(String, {isRequired: YES}),
	creator: SC.Record.attr(String),
	date_created: SC.Record.attr(SC.DateTime),
	citations: SC.Record.toMany('CinnamonDolceLatte.Citation', { nested: YES, isEditable: YES }),
	comments: SC.Record.toMany('CinnamonDolceLatte.Comment', { nested: YES, isEditable: YES }),
	
	shortArticle: function() {
		var art_len = this.get('article').length;
		
		if(art_len < 80) {
			return this.get('article');
		} else {
			return [this.get('article').substring(0,80), "..."].join("");
		}
	}.property('article').cacheable()	
}) ;
