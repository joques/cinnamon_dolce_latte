// ==========================================================================
// Project:   CinnamonDolceLatte.DisciplineDataSource
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

sc_require('models/discipline');

// use this variable for remote queries

// CinnamonDolceLatte.DISCIPLINES_QUERY = SC.Query.remote(CinnamonDolceLatte.Discipline, {
// 	orderBy: 'name'
// }) ;


CinnamonDolceLatte.DISCIPLINES_QUERY = SC.Query.local(CinnamonDolceLatte.Discipline, {
	orderBy: 'name'
}) ;


/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
CinnamonDolceLatte.DisciplineDataSource = SC.DataSource.extend(
/** @scope CinnamonDolceLatte.DisciplineDataSource.prototype */ {
		

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
	  if (query === CinnamonDolceLatte.DISCIPLINES_QUERY) {
	    SC.Request.getUrl('/disciplines').header({'Accept': 'application/json'}).json()
	      .notify(this, 'didFetchDisciplines', store, query)
	      .send();
	    return YES;
	  }
    return NO ; // return YES if you handled the query
  },

	didFetchDisciplines: function(response, store, query) {
	  if (SC.ok(response)) {

			// In case you use local queries
	    store.loadRecords(CinnamonDolceLatte.Discipline, response.get('body'));
	    store.dataSourceDidFetchQuery(query);
	
			// Alternatively, this is how to handle the remote queries 
	   // var storeKeys = store.loadRecords(CinnamonDolceLatte.Discipline, response.get('body'));
     // store.loadQueryResults(query, storeKeys);
	  } else store.dataSourceDidErrorQuery(query, response);
	},

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.

	  if (SC.kindOf(store.recordTypeFor(storeKey), CinnamonDolceLatte.Discipline)) {

	    var url = '/disciplines/' + store.idFor(storeKey);
	    SC.Request.getUrl(url).header({
	                'Accept': 'application/json'
	            }).json()
	      .notify(this, 'didRetrieveDiscipline', store, storeKey)
	      .send();
	    return YES;

	  } else {
    	return NO ; // return YES if you handled the storeKey		
		}
  },

	didRetrieveDiscipline: function(response, store, storeKey) {
		if (SC.ok(response)) {
	    var dataHash = response.get('body');
	    store.dataSourceDidComplete(storeKey, dataHash);

	  } else store.dataSourceDidError(storeKey, response);
	},
  
  createRecord: function(store, storeKey) {
	  if (SC.kindOf(store.recordTypeFor(storeKey), CinnamonDolceLatte.Discipline)) {

	    SC.Request.postUrl('/disciplines').header({
	                'Accept': 'application/json'
	            }).json()
	      .notify(this, this.didCreateDiscipline, store, storeKey)
	      .send(store.readDataHash(storeKey));
	    return YES;
	  } else return NO;

  },

	didCreateDiscipline: function(response, store, storeKey) {
		if (SC.ok(response)) {
	    // Adapted from parseUri 1.2.2
	    // (c) Steven Levithan <stevenlevithan.com>
	    // MIT License
	    var parser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
	    var url = parser.exec(response.header('Location'))[8];
	    store.dataSourceDidComplete(storeKey, null, url); // update url

	  } else store.dataSourceDidError(storeKey, response);
	},
  
  updateRecord: function(store, storeKey) {
	  if (SC.kindOf(store.recordTypeFor(storeKey), CinnamonDolceLatte.Discipline)) {
	    SC.Request.putUrl('/disciplines/' + store.idFor(storeKey)).header({
	                'Accept': 'application/json'
	            }).json()
	      .notify(this, this.didUpdateDiscipline, store, storeKey)
	      .send(store.readDataHash(storeKey));
	    return YES;

	  } else return NO ;
  },

	didUpdateDiscipline: function(response, store, storeKey) {
	  if (SC.ok(response)) {
	    var data = response.get('body');
	    // if (data) data = data.content; // if hash is returned; use it.
	    store.dataSourceDidComplete(storeKey, data) ;

	  } else store.dataSourceDidError(storeKey); 
	},
  
  destroyRecord: function(store, storeKey) {
	  if (SC.kindOf(store.recordTypeFor(storeKey), CinnamonDolceLatte.Discipline)) {
	    SC.Request.deleteUrl('/disciplines/' + store.idFor(storeKey)).header({
	                'Accept': 'application/json'
	            }).json()
	      .notify(this, this.didDestroyDiscipline, store, storeKey)
	      .send();
	    return YES;
	  } else return NO;
  },

	didDestroyDiscipline: function(response, store, storeKey) {
	  if (SC.ok(response)) {
	    store.dataSourceDidDestroy(storeKey);
	  } else store.dataSourceDidError(response);
	}
}) ;
