// ==========================================================================
// Project:   CinnamonDolceLatte.DisciplineDataSource
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

sc_require('models/discipline');

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
	    // store.loadRecords(CinnamonDolceLatte.Discipline, response.get('body').content);
	    store.loadRecords(CinnamonDolceLatte.Discipline, response.get('body'));
	    store.dataSourceDidFetchQuery(query);
	  } else store.dataSourceDidErrorQuery(query, response);
	},

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;
