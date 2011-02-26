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
				
				showPostReferences: function() {
					this.gotoState('showingPostReferences');
				},
				
				exitState: function() {
					CinnamonDolceLatte.mainPage.detailPostPane.set('detailIsVisible', NO);
				}
			}),
			
			showingPostReferences: Ki.State.design({
				initialSubstate: 'allReferences',
				
				enterState: function() {
					CinnamonDolceLatte.mainPage.detailPostPane.displayReferences();
				},
				
				allReferences: Ki.State.design({
					
					addReference: function() {
						CinnamonDolceLatte.referenceArrayController.addReference();
						this.gotoState('allReferences');
					},

					deleteReference: function() {
						CinnamonDolceLatte.referenceArrayController.deleteReference();
						this.gotoState('allReferences');
					},

					showReferenceEditor: function() {
						this.gotoState('showingReferenceEditor');
					},

					closeRefs: function() {
						this.gotoState('showingPosts');
					}
				}),
				
				showingReferenceEditor: Ki.State.design({
					initialSubstate: 'referenceEditor',
					
					enterState: function() {
						CinnamonDolceLatte.mainPage.detailReferencePane.showForUpdate();
					},
					
					referenceEditor: Ki.State.design({
						saveReference: function() {
							CinnamonDolceLatte.referenceController.save();
							CinnamonDolceLatte.mainPage.detailReferencePane.set('detailIsVisible', NO);
							this.gotoState('allReferences');
						},

						cancelReference: function() {
							CinnamonDolceLatte.referenceController.discard();
							CinnamonDolceLatte.mainPage.detailReferencePane.set('detailIsVisible', NO);
							this.gotoState('allReferences');
						},

						addAuthor: function() {
							CinnamonDolceLatte.authorArrayController.addAuthor();
							this.gotoState('showingReferenceEditor');
						},

						deleteAuthor: function() {
							CinnamonDolceLatte.authorArrayController.deleteAuthor();
							this.gotoState('showingReferenceEditor');
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
							this.gotoState('showingReferenceEditor');
					  },

					  cancelAuthorEdit: function() {
					      CinnamonDolceLatte.authorController.discard();
								this.gotoState('showingReferenceEditor');
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