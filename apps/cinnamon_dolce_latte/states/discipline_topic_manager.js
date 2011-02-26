/**
 * This is the discipline and topic state manager.
 *
 * @author joques
 * 
 */

CinnamonDolceLatte.disciplineTopicManagerState = Ki.State.extend({
	substatesAreConcurrent: YES,
	
	showingDisciplinesAndTopics: Ki.State.design({
		addNode: function() {
			CinnamonDolceLatte.treeNodeController.addNode();
		},
		
		deleteNode: function() {
			CinnamonDolceLatte.treeNodeController.deleteNode();
		}
	}),
	
	postManager: Ki.State.plugin('CinnamonDolceLatte.postManagerState')
});