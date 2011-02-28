/**
 * This file describes the state model of the application manager
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