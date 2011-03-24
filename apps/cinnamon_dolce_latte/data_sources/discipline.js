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
	    SC.Request.getUrl('/CDL/disciplines/').header({'Accept': 'application/json'}).json()
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
	    
	  if (SC.kindOf(store.recordTypeFor(storeKey), CinnamonDolceLatte.Discipline)) {

	    var url = '/CDL/disciplines/' + store.idFor(storeKey);
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
		var curRecordType = store.recordTypeFor(storeKey) ;
		var createRequestUrl = null;
		
		if (SC.kindOf(curRecordType, CinnamonDolceLatte.Discipline)) {
			createRequestUrl = "/CDL/disciplines";
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Topic)) {
			
			// the url should be /CDL/disciplines/disciplineid/topics
			var disciplineID = CinnamonDolceLatte.disciplineController.get('content').get('id');
			createRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics";
			
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Post)) {
			
			var topicID = CinnamonDolceLatte.topicController.get('content').get('id');
			var disciplineID = CinnamonDolceLatte.disciplineController.get('content').get('id');
			createRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID + "/posts";
			
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Comment)) {
			

			var postID = CinnamonDolceLatte.postController.get('content').get('id');
			var topicID = CinnamonDolceLatte.topicController.get('content').get('id');
			var disciplineID = CinnamonDolceLatte.disciplineController.get('content').get('id');
			createRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID + "/posts/" + postID + "/comments";
			
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Citation)) {
			
			var postID = CinnamonDolceLatte.postController.get('content').get('id');
			var topicID = CinnamonDolceLatte.topicController.get('content').get('id');
			var disciplineID = CinnamonDolceLatte.disciplineController.get('content').get('id');
			createRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID + "/posts/" + postID + "/citations";
			
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Author)) {
			
			var citationID = CinnamonDolceLatte.citationController.get('content').get('id');
			var postID = CinnamonDolceLatte.postController.get('content').get('id');
			var topicID = CinnamonDolceLatte.topicController.get('content').get('id');
			var disciplineID = CinnamonDolceLatte.disciplineController.get('content').get('id');			
			createRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID + "/posts/" + postID + "/citations/" + citationID + "/authors";		
		}
		
		if (createRequestUrl != null) {
			SC.Request.postUrl(createRequestUrl).header({
	                'Accept': 'application/json'
	            }).json()
	      .notify(this, this.didCreateObject, store, storeKey)
	      .send(store.readDataHash(storeKey));
	    return YES;			
		} else {
			return NO;
		}		
  },

	didCreateObject: function(response, store, storeKey) {
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
		var curRecordType = store.recordTypeFor(storeKey) ;
		var updateRequestUrl = null;
		
		if (SC.kindOf(curRecordType, CinnamonDolceLatte.Discipline)) {
			
			var disciplineID = this.extractID(store.idFor(storeKey));
			
			updateRequestUrl = "/CDL/disciplines/" + disciplineID;
			console.log("case discipline url = " + updateRequestUrl);			
			
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Topic)) {
			
			// the url should be /CDL/disciplines/disciplineid/topics
			var topicID = this.extractID(store.idFor(storeKey));
			
			var disciplineStoreKey = store.parentStoreKeyExists(storeKey);			
			var disciplineID = this.extractID(store.idFor(disciplineStoreKey));
			
			updateRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID;
			console.log("case Topic url = " + updateRequestUrl);
			
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Post)) {
			
			var postID = this.extractID(store.idFor(storeKey));
			var topicStoreKey = store.parentStoreKeyExists(storeKey);
			
			var topicID = this.extractID(store.idFor(topicStoreKey));
			var disciplineStoreKey = store.parentStoreKeyExists(topicStoreKey);
			
			var disciplineID = this.extractID(store.idFor(disciplineStoreKey));
			updateRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID + "/posts/" + postID;
			console.log("case Post url = " + updateRequestUrl);			
			
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Comment)) {
			
			var commentID = this.extractID(store.idFor(storeKey));
			
			var postStoreKey = store.parentStoreKeyExists(storeKey);			
			var postID = this.extractID(store.idFor(postStoreKey));
			
			var topicStoreKey = store.parentStoreKeyExists(postStoreKey);			
			var topicID = this.extractID(store.idFor(topicStoreKey));
			
			var disciplineStoreKey = store.parentStoreKeyExists(topicStoreKey);
			var disciplineID = this.extractID(store.idFor(disciplineStoreKey));
			
			updateRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID + "/posts/" + postID + "/comments/" + commentID;
			console.log("case Comment url = " + updateRequestUrl);
						
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Citation)) {
			
			var citationID = this.extractID(store.idFor(storeKey));
			
			var postStoreKey = store.parentStoreKeyExists(storeKey);
			var postID = this.extractID(store.idFor(postStoreKey));
			
			var topicStoreKey = store.parentStoreKeyExists(postStoreKey);
			var topicID = this.extractID(store.idFor(topicStoreKey));
			
			var disciplineStoreKey = store.parentStoreKeyExists(topicStoreKey);
			var disciplineID = this.extractID(store.idFor(disciplineStoreKey));
			
			updateRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID + "/posts/" + postID + "/citations/" + citationID;			
			console.log("case Citation url = " + updateRequestUrl);
						
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Author)) {
			
			var authorID = this.extractID(store.idFor(storeKey));
			
			var citationStoreKey = store.parentStoreKeyExists(storeKey);
			var citationID = this.extractID(store.idFor(citationStoreKey));
			
			var postStoreKey = store.parentStoreKeyExists(citationStoreKey);
			var postID = this.extractID(store.idFor(postStoreKey));
			
			var topicStoreKey = store.parentStoreKeyExists(postStoreKey);
			var topicID = this.extractID(store.idFor(topicStoreKey));
			
			var disciplineStoreKey = store.parentStoreKeyExists(topicStoreKey);
			var disciplineID = this.extractID(store.idFor(disciplineStoreKey));
			
			updateRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID + "/posts/" + postID + "/citations/" + citationID + "/authors/" + authorID;		
			console.log("case Author url = " + updateRequestUrl);			
		}
		
		
		if (updateRequestUrl != null) {
			console.log("final url = " + updateRequestUrl);
			SC.Request.putUrl(updateRequestUrl).header({
	                'Accept': 'application/json'
	            }).json()
	      .notify(this, this.didUpdateObject, store, storeKey)
	      .send(store.readDataHash(storeKey));
	    return YES;			
		} else {
			return NO;
		}		
	},
  
	didUpdateObject: function(response, store, storeKey) {
	  if (SC.ok(response)) {
	    var data = response.get('body');
	    // if (data) data = data.content; // if hash is returned; use it.
	    store.dataSourceDidComplete(storeKey, data) ;

	  } else store.dataSourceDidError(storeKey); 
	},
  
  destroyRecord: function(store, storeKey) {
		var curRecordType = store.recordTypeFor(storeKey);
		var destroyRequestUrl = null;
		
		if (SC.kindOf(curRecordType, CinnamonDolceLatte.Discipline)) {
			
			var disciplineID = this.extractID(store.idFor(storeKey));
			destroyRequestUrl = "/CDL/disciplines/" + disciplineID;
			
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Topic)) {
			
			// the url should be /CDL/disciplines/disciplineid/topics
			var topicID = this.extractID(store.idFor(storeKey));
			
			var disciplineStoreKey = store.parentStoreKeyExists(storeKey);
			var disciplineID = this.extractID(store.idFor(disciplineStoreKey));
			
			destroyRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID;
			
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Post)) {
			
			var postID = this.extractID(store.idFor(storeKey));
			
			var topicStoreKey = store.parentStoreKeyExists(storeKey);
			var topicID = this.extractID(store.idFor(topicStoreKey));
			
			var disciplineStoreKey = store.parentStoreKeyExists(topicStoreKey);
			var disciplineID = this.extractID(store.idFor(disciplineStoreKey));
			
			destroyRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID + "/posts/" + postID;
			
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Comment)) {
			
			var commentID = this.extractID(store.idFor(storeKey));
			
			var postStoreKey = store.parentStoreKeyExists(storeKey);
			var postID = this.extractID(store.idFor(postStoreKey));
			
			var topicStoreKey = store.parentStoreKeyExists(postStoreKey);
			var topicID = this.extractID(store.idFor(topicStoreKey));
			
			var disciplineStoreKey = store.parentStoreKeyExists(topicStoreKey);
			var disciplineID = this.extractID(store.idFor(disciplineStoreKey));
			
			destroyRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID + "/posts/" + postID + "/comments/" + commentID;
			
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Citation)) {
			
			var citationID = this.extractID(store.idFor(storeKey));
			
			var postStoreKey = store.parentStoreKeyExists(storeKey);
			var postID = this.extractID(store.idFor(postStoreKey));
			
			var topicStoreKey = store.parentStoreKeyExists(postStoreKey);
			var topicID = this.extractID(store.idFor(topicStoreKey));
			
			var disciplineStoreKey = store.parentStoreKeyExists(topicStoreKey);
			var disciplineID = this.extractID(store.idFor(disciplineStoreKey));
			
			destroyRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID + "/posts/" + postID + "/citations/" + citationID;
						
		} else if (SC.kindOf(curRecordType, CinnamonDolceLatte.Author)) {
			
			var authorID = this.extractID(store.idFor(storeKey));
			
			var citationStoreKey = store.parentStoreKeyExists(storeKey);
			var citationID = this.extractID(store.idFor(citationStoreKey));
			
			var postStoreKey = store.parentStoreKeyExists(citationStoreKey);
			var postID = this.extractID(store.idFor(postStoreKey));
			
			var topicStoreKey = store.parentStoreKeyExists(postStoreKey);
			var topicID = this.extractID(store.idFor(topicStoreKey));
			
			var disciplineStoreKey = store.parentStoreKeyExists(topicStoreKey);
			var disciplineID = this.extractID(store.idFor(disciplineStoreKey));
			
			destroyRequestUrl = "/CDL/disciplines/" + disciplineID + "/topics/" + topicID + "/posts/" + postID + "/citations/" + citationID + "/authors/" + authorID;			
		}
		
		if (destroyRequestUrl != null) {
			SC.Request.deleteUrl(destroyRequestUrl).header({
	                'Accept': 'application/json'
	            }).json()
	      .notify(this, this.didDestroyObject, store, storeKey)
	      .send(store.readDataHash(storeKey));
	    return YES;			
		} else {
			return NO;
		}
  },

	didDestroyObject: function(response, store, storeKey) {
	  if (SC.ok(response)) {
	    store.dataSourceDidDestroy(storeKey);
	  } else store.dataSourceDidError(response);
	},
	
	extractID: function(initialID) {
		var finalID = null;
		
		var iDIndex = initialID.lastIndexOf('/');			
		if (iDIndex === -1) {
			finalID = initialID.toString();
		} else {
			finalID = initialID.substring(iDIndex);
		}
		
		return finalID;
	}
}) ;
