/**
 * This is the main file of the application statechart.
 *
 * @author joques
 * 
 */

CinnamonDolceLatte.loggedOutState = Ki.State.extend({
	initialSubstate: 'ready',
	
	enterState: function() {
		SC.routes.set('location', 'loginPage/loginPane');
	},
	
	ready: Ki.State.design({
		signin: function() {
			CinnamonDolceLatte.statechart.gotoState('authentication');
		}
	}),
	
	authentication: Ki.State.design({
		enterState: function() {
			CinnamonDolceLatte.loginController.beginLogging();
		},
		
		authenticationSucceeded: function() {
			CinnamonDolceLatte.statechart.gotoState('loggedIn');
		},
		
		authenticationFailed: function() {
			SC.AlertPane.error("Logging Error", "_AuthenticationError".loc());
			SC.Logger.info("Error in Logging " + "_AuthenticationError".loc());
			CinnamonDolceLatte.statechart.gotoState('loggedOut');
		},
		
		exitState: function() {
			CinnamonDolceLatte.getPath('loginPage.loginPane').remove();
		}
	})
});