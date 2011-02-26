/**
 * This is the main file of the application statechart.
 *
 * @author joques
 * 
 */

CinnamonDolceLatte.applicationManagerState = Ki.State.extend({
	initialSubstate: 'readyForAppActions',
	
	readyForAppActions: Ki.State.design({
		logOut: function() {
			CinnamonDolceLatte.statechart.gotoState('shutDown');
		},
		
		localSearch: function() {
			CinnamonDolceLatte.topicArrayController.localSearch();
		}
	})
});