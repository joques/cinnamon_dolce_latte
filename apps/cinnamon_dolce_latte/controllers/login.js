// ==========================================================================
// Project:   CinnamonDolceLatte.loginController
// Copyright: ©2011 iTrinity, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
CinnamonDolceLatte.loginController = SC.ObjectController.create(
/** @scope CinnamonDolceLatte.loginController.prototype */ {
	userName: '',
	nameToDisplay: '',
	passWord: '',
	isLoggingIn: NO,
	returnRoute: '',
	
	
	observeUserName: function() {
		myUserName = this.get("userName");
		this.set("nameToDisplay", myUserName + " " + myUserName);
	}.observes("userName"),
	
	beginLogging: function() {
		try {
			var myUserName = this.get('userName');						
			if ((myUserName == null) || (myUserName == '')) {
				throw SC.Error.desc("User name required...");
			}
			
			var myPassWd = this.get('passWord');
			if ((myPassWd == null) || (myPassWd == '')) {
				throw SC.Error.desc("Password required...");
			}
			
			this.set('isLoggingIn', YES);
			
			var url = '/cinnamon_dolce_latte/index.html';
			if ((myUserName != 'cinnamon') || (myPassWd != 'cinnamon')) {
				url = '/cinnamon_dolce_latte/bad_url.js';
			}
			
			SC.Request.getUrl(url).notify(this, 'endLogging').send();
						
			return YES;
		} catch(err) {
			SC.AlertPane.error("Logging Error", err.message);
			this.set('isLoggingIn', NO);
			return NO;			
		}
	},
	
	endLogging: function(response) {
		try {
			this.set('isLoggingIn', NO);
			SC.Logger.info("HTTP Status code " + response.status);
			
			if (!SC.ok(response)) {
				throw SC.Error.desc("Invalid credentials. Please try again");
			}
			
			var authCookie = SC.Cookie.find('CinnamonDolceLatteCookie');
			if (authCookie != null) {
				authCookie.destroy();
			}
			
			authCookie = SC.Cookie.create();
			authCookie.name = 'CinnamonDolceLatteCookie';
			authCookie.value = 'response token';
			authCookie.expires = null;
			authCookie.write();
			
			var curReturnRoute = CinnamonDolceLatte.loginController.get('returnRoute');
			
			if (curReturnRoute != undefined && curReturnRoute != null && curReturnRoute != '') {
				SC.routes.set('location', curReturnRoute);
			} else {
				SC.routes.set('location', 'mainPage/mainPane');
			}
			
		} catch(err) {
			SC.AlertPane.error("Logging Error", err.message);
			SC.Logger.info("Error in Logging " + err.message);
		}
	}
	
}) ;
