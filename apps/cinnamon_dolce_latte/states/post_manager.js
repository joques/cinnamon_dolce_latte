/**
 * This is the discipline and topic state manager.
 *
 * @author joques
 * 
 */

CinnamonDolceLatte.postManagerState = Ki.State.extend({
	substatesAreConcurrent: YES,
	
	showingPosts: Ki.State.design({
		
		initialSubstate: 'showingSelectedPosts',
		
		showingSelectedPosts: Ki.State.design({
			addPost: function() {
				CinnamonDolceLatte.postArrayController.addPost();
			},
			
			deletePost: function() {
				CinnamonDolceLatte.postArrayController.deletePost();
			},
			
			showPostEditor: function() {
				this.gotoState('showingPostEditor');
			}	
		}),
		
		showingPostEditor: Ki.State.design({
			initialSubstate: 'showingSelectedPostEditor',
			
			enterState: function() {
				CinnamonDolceLatte.mainPage.detailPostPane.showForUpdate();
			},
			
			showingSelectedPostEditor: Ki.State.design({
				savePost: function() {
					CinnamonDolceLatte.postController.save();
					this.gotoState('showingSelectedPosts');
				},
				
				cancelPost: function() {
					CinnamonDolceLatte.postController.discard();
					this.gotoState('showingSelectedPosts');
				}, 
				
				showPostCitations: function() {
					this.gotoState('showingPostCitations');
				},
				
				exitState: function() {
					CinnamonDolceLatte.mainPage.detailPostPane.set('detailIsVisible', NO);
				}
			}),
			
			showingPostCitations: Ki.State.design({
				initialSubstate: 'allCitations',
				
				enterState: function() {
					CinnamonDolceLatte.mainPage.detailPostPane.displayCitations();
				},
				
				allCitations: Ki.State.design({
					
					addCitation: function() {
						CinnamonDolceLatte.citationArrayController.addCitation();
						this.gotoState('allCitations');
					},

					deletecitation: function() {
						CinnamonDolceLatte.citationArrayController.deleteCitation();
						this.gotoState('allCitations');
					},

					showCitationEditor: function() {
						this.gotoState('showingCitationEditor');
					},

					closeRefs: function() {
						this.gotoState('showingPosts');
					}
				}),
				
				showingCitationEditor: Ki.State.design({
					initialSubstate: 'citationEditor',
					
					enterState: function() {
						CinnamonDolceLatte.mainPage.detailCitationPane.showForUpdate();
					},
					
					citationEditor: Ki.State.design({
						saveCitation: function() {
							CinnamonDolceLatte.citationController.save();
							CinnamonDolceLatte.mainPage.detailCitationPane.set('detailIsVisible', NO);
							this.gotoState('allCitations');
						},

						cancelCitation: function() {
							CinnamonDolceLatte.citationController.discard();
							CinnamonDolceLatte.mainPage.detailCitationPane.set('detailIsVisible', NO);
							this.gotoState('allCitations');
						},

						addAuthor: function() {
							CinnamonDolceLatte.authorArrayController.addAuthor();
							this.gotoState('showingCitationEditor');
						},

						deleteAuthor: function() {
							CinnamonDolceLatte.authorArrayController.deleteAuthor();
							this.gotoState('showingCitationEditor');
						},

						showAuthorEditor: function() {
							this.gotoState('showingAuthorEditor');
						}
					}),
					
					showingAuthorEditor: Ki.State.design({
						enterState: function() {
							CinnamonDolceLatte.mainPage.detailAuthorPane.showForUpdate();
						},
						saveAuthorEdit: function() {
					    CinnamonDolceLatte.authorController.save();
							this.gotoState('showingCitationEditor');
					  },

					  cancelAuthorEdit: function() {
					      CinnamonDolceLatte.authorController.discard();
								this.gotoState('showingCitationEditor');
					  },
					
					exitState: function() {
						CinnamonDolceLatte.mainPage.detailAuthorPane.set('detailIsVisible', NO);
					}							
				})
				})				
			})
		})
	}),
	
	commentManager: Ki.State.plugin('CinnamonDolceLatte.commentManagerState')
});