/**
 * This is the main file of the application statechart.
 *
 * @author joques
 * 
 */

sc_require('states/logged_in.js');
sc_require('states/logged_out.js');
sc_require('states/shut_down.js');


CinnamonDolceLatte.statechart = Ki.Statechart.create({
	rootState: Ki.State.design({
		initialSubstate: 'loggedOut',

		// this is the state where the user has not logged in yet
		loggedOut: Ki.State.plugin('CinnamonDolceLatte.loggedOutState'),
		
		// once the user authentication is successful, the application moves into this state
		loggedIn: Ki.State.plugin('CinnamonDolceLatte.loggedInState'),
		
		// this state manages the application termination
		shutDown: Ki.State.plugin('CinnamonDolceLatte.shutDownState')	
	})
});