/**
 * This is the main file of the application statechart.
 *
 * @author joques
 * 
 */

CinnamonDolceLatte.loggedInState = Ki.State.extend({
	
	substatesAreConcurrent: YES,
	
	enterState: function() {
		var curReturnRoute = CinnamonDolceLatte.loginController.get('returnRoute');
		
		if (curReturnRoute != undefined && curReturnRoute != null && curReturnRoute != '') {
			SC.routes.set('location', curReturnRoute);
		} else {
			SC.routes.set('location', 'mainPage/mainPane');
		}
	},
	
	applicationMamager:  Ki.State.plugin('CinnamonDolceLatte.applicationManagerState'),	
	disciplineTopicManager:  Ki.State.plugin('CinnamonDolceLatte.disciplineTopicManagerState')
});