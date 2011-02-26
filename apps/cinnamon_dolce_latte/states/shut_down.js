/**
 * This is the main file of the application statechart.
 *
 * @author joques
 * 
 */

CinnamonDolceLatte.shutDownState = Ki.State.extend({
	enterState: function() {
		SC.routes.set('location', 'logoutPage/logoutPane');
	}
});