// ==========================================================================
// Project:   CinnamonDolceLatte - mainPage
// Copyright: ©2010 iTrinity Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

// This page describes the main user interface for your application.  
CinnamonDolceLatte.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'middleView topView bottomView'.w(),
		classNames: ['main'],

	topView: SC.ToolbarView.design({
		layout: { top: 0, left: 0, right: 0, height: 36 },
		childViews: 'appLabelView bannerLabelView searchView logOutButton'.w(),
		anchorLocation: SC.ANCHOR_TOP,
		
		appLabelView: SC.LabelView.design({
			layout: { centerY: 0, height: 24, left: 8, width: 200 },
	        controlSize: SC.SMALL_CONTROL_SIZE,
	        value:   'Virtual Reading Group'
		}),
		
		bannerLabelView: SC.LabelView.design({
			layout: { centerY: 0, centerX: 0, height: 24, width: 250 },
	        controlSize: SC.LARGE_CONTROL_SIZE,
	        value:   'Sharing Great Insight ...',
			anchorLocation: SC.ANCHOR_CENTER		
		}),
		
		searchView: SC.View.design({
			layout: { centerY: 0, height: 24, right: 125, width: 225},
			childViews: 'searchArea searchButton'.w(),
			
			searchArea: SC.TextFieldView.design({
				layout: {left: 0, height: 22, width: 140},
				hint: "_Search".loc(),
				valueBinding: "CinnamonDolceLatte.topicArrayController.searchKeyword"
			}),
						
			searchButton: SC.ButtonView.design({
				layout: {height: 22, right: 0, width: 80},
				theme: "capsule",
				title: '_SearchButton'.loc(),
				isEnabledBinding: SC.Binding.from("CinnamonDolceLatte.topicArrayController.canSearch"),
				target: 'CinnamonDolceLatte.topicArrayController',
				action: 'localSearch'
			})
		}),
		
		logOutButton: SC.ButtonView.design({
			layout: {height: 22, right: 0, width: 80, centerY: 0},
			theme: "capsule",
			title: '_Logout'.loc(),
			action: 'logOut'		
		})
	}),
	
	middleView: SC.SplitView.design({
		layout: { left: 0, top: 36, right: 0, bottom: 36 },
		
		layoutDirection: SC.LAYOUT_HORIZONTAL,
        autoresizeBehavior: SC.RESIZE_TOP_LEFT,
        defaultThickness: 0.8,

		topLeftView: SC.View.design({
			childViews: 'topicHeaderView topicContentView topicButtonViews'.w(),
			
			topicHeaderView: SC.ToolbarView.design({
				layout: { top: 36, left: 0, right: 0, height: 30 },
				childViews: 'topicLabelView'.w(),
				anchorLocation: SC.ANCHOR_TOP,
				
				topicLabelView: SC.LabelView.design({
					layout: { centerY: 0, centerX: 0, height: 20, width: 50 },
					controlSize: SC.SMALL_CONTROL_SIZE,
					value: 'Topics'
				})				
			}),
													
			topicContentView: SC.ScrollView.design({
				hasHorizontalScroller: NO,
				layout: { top: 40, bottom:36, left: 0, right: 0 },
				
				contentView: SC.ListView.design({
					layout: {top: 10, bottom: 10, left: 10, right:10},
					
					canEditContent: YES,
					
					contentValueKey: "name",
					contentBinding: "CinnamonDolceLatte.disciplinesTreeController.arrangedObjects",
					selectionBinding: "CinnamonDolceLatte.disciplinesTreeController.selection",
					
					exampleView: SC.ListItemView.extend({						
						inlineEditorShouldBeginEditing: function() {
							return this.contentIsEditable();
						},
						
						inlineEditorDidEndEditing: function(inLineEditor, finalValue) {
							CinnamonDolceLatte.treeNodeController.updateNodeName(finalValue);
						}				
					})					
				})
			}),
						
			topicButtonViews: SC.View.design({
				layout: { bottom: 10, centerX:0, height: 24, width: 170 },
				childViews: 'addTopicButton deleteTopicButton'.w(),
				
				addTopicButton: SC.ButtonView.design({
					layout: {height: 24, width: 80, left: 5},
					theme: "capsule",
					title: '+',
					target: 'CinnamonDolceLatte.treeNodeController',
					action: 'addNode'
				}),
				
				deleteTopicButton: SC.ButtonView.design({
					layout: {height: 24, width: 80, right: 5},
					theme: "capsule",
					title: '-',
					target: 'CinnamonDolceLatte.treeNodeController',
					action: 'deleteNode',
					isEnabledBinding: 'CinnamonDolceLatte.treeNodeController.canDeleteNode'								
				})
				
			})
		}),
		
		topLeftMinThickness: 200,
        topLeftMaxThickness: 250,
		
		dividerView: SC.SplitDividerView.design({
		   layout: {}
		}),
		
		
		bottomRightView: SC.SplitView.design({
			layout: {left: 0, top: 36, right: 0, bottom: 36},
			layoutDirection: SC.LAYOUT_VERTICAL,
	        autoresizeBehavior: SC.RESIZE_TOP_LEFT,

			
			topLeftView: SC.View.design({
				childViews: 'postHeaderView postContentView postButtonViews'.w(),
				
				postHeaderView: SC.ToolbarView.design({
					layout: {top: 36, left: 0, right: 0, height: 30},
					childViews: 'postLabelView'.w(),
					anchorLocation: SC.ANCHOR_TOP,
					
					postLabelView: SC.LabelView.design({
						layout: { centerY: 0, centerX: 0, height: 20, width: 50 },
						controlSize: SC.SMALL_CONTROL_SIZE,
						value: 'Articles'					
					})
				}),
				
				postContentView: SC.ScrollView.design({
					hasHorizontalScroller: NO,
					layout: { top: 40, bottom: 36, left: 0, right: 0 },

					contentView: SC.TableView.design({
						layout: {top: 10, bottom:10, left: 10, right:10},
						
						columns:[
														
							SC.TableColumn.create({
								key: 'title',
								label: 'Title',
								width: 400
							}),
							SC.TableColumn.create({
								key: 'shortArticle',
								label: 'Article',
								width: 800
							}),
							SC.TableColumn.create({
								key: 'creator',
								label: 'Author',
								width: 140
							}),							
							SC.TableColumn.create({
								key: 'date_created',
								label: 'Created on',
								width: 35
							})
						],
						
						contentBinding: "CinnamonDolceLatte.postArrayController.arrangedObjects",
						selectionBinding: "CinnamonDolceLatte.postArrayController.selection",
						canReorderContent: YES,
						
					    sortedColumnBinding: 'CinnamonDolceLatte.postArrayController.sortedColumn',
					    selectOnMouseDown: YES,
					    exampleView: SC.TableRowView,
					    recordType: CinnamonDolceLatte.Post,
					
						target: "CinnamonDolceLatte.mainPage.detailPostPane",
						action: "showForUpdate"
					})				
				}),
				
				postButtonViews: SC.View.design({
					layout: { bottom: 10, centerX:0, height: 24, width: 170 },
					childViews: 'addPostButton deletePostButton'.w(),

					addPostButton: SC.ButtonView.design({
						layout: {height: 24, width: 80, left: 5},
						theme: "capsule",
						title: '+',
						target: 'CinnamonDolceLatte.postArrayController',
						action: 'addPost',
						isEnabledBinding: 'CinnamonDolceLatte.treeNodeController.canAddPost'								
					}),

					deletePostButton: SC.ButtonView.design({
						layout: {height: 24, width: 80, right: 5},
						theme: "capsule",
						title: '-',
						target: 'CinnamonDolceLatte.postArrayController',
						action: 'deletePost',
						isEnabledBinding: 'CinnamonDolceLatte.postController.canDeletePost'								
					})

				})
			}),
			
			topLeftMinThickness: 200,
	        topLeftMaxThickness: 250,

			dividerView: SC.SplitDividerView.design({
			   layout: {}
			}),
			
			
			bottomRightView: SC.View.design({
				childViews: 'commentHeaderView commentContentView commentButtonViews'.w(),
				
				commentHeaderView: SC.ToolbarView.design({
					layout: {top: 36, left: 0, right: 0, height: 30},
					childViews: 'commentLabelView'.w(),
					anchorLocation: SC.ANCHOR_TYPE,
					
					commentLabelView: SC.LabelView.design({
						layout: { centerY: 0, centerX: 0, height: 20, width: 150 },
						controlSize: SC.SMALL_CONTROL_SIZE,
						value: 'Visitors\' Comments'					
					})										
					
				}),
				
				commentContentView: SC.ScrollView.design({
					hasHorizontalScroller: NO,
					layout: { top: 40, left: 0, right: 0 },
					// backgroundColor: 'white',
					
					
					contentView: SC.TableView.design({
						layout: {top: 45, bottom:34, left: 10, right:10},
						
						columns:[
							SC.TableColumn.create({
								key: 'shortComment',
								label: 'Comment',
								width: 1200
							}),
							SC.TableColumn.create({
								key: 'commentator',
								label: 'Author',
								width: 140
							}),
							SC.TableColumn.create({
								key: 'date_created',
								label: 'Created on',
								width: 35
							})
						],
						
						contentBinding: "CinnamonDolceLatte.commentArrayController.arrangedObjects",
						selectionBinding: "CinnamonDolceLatte.commentArrayController.selection",
						canReorderContent: YES, 
						
					    sortedColumnBinding: 'CinnamonDolceLatte.commentArrayController.sortedColumn',
					    selectOnMouseDown: YES,
					    exampleView: SC.TableRowView,
					    recordType: CinnamonDolceLatte.Comment,
					
						target: "CinnamonDolceLatte.mainPage.detailCommentPane",
						action: "showForUpdate"
					})
					
				}),
				
				commentButtonViews: SC.View.design({
					layout: { bottom: 10, centerX:0, height: 24, width: 170 },
					childViews: 'addCommentButton deleteCommentButton'.w(),

					addCommentButton: SC.ButtonView.design({
						layout: {height: 24, width: 80, left: 5},
						theme: "capsule",
						title: '+',
						target: 'CinnamonDolceLatte.commentArrayController',
						action: 'addComment',
						isEnabledBinding: 'CinnamonDolceLatte.postController.canAddComment'								
					}),

					deleteCommentButton: SC.ButtonView.design({
						layout: {height: 24, width: 80, right: 5},
						theme: "capsule",
						title: '-',
						target: 'CinnamonDolceLatte.commentArrayController',
						action: 'deleteComment',
						isEnabledBinding: 'CinnamonDolceLatte.commentController.canDeleteComment'								
					})

				})				
				
			})
						
		})		
	}),
	
	bottomView: SC.ToolbarView.design({
		layout: { bottom: 0, left: 0, right: 0, height: 36 },
		childViews: 'copyLabelView'.w(),
		anchorLocation: SC.ANCHOR_BOTTOM,
		
		copyLabelView: SC.LabelView.design({
			layout: {centerY: 0, centerX: 0, height: 32, width: 250},
			controlSize: SC.SMALL_CONTROL_SIZE,
			value: 'Cinnamon Dolce Latt&egrave; &copy;',
			escapeHTML: false
		})
	}),
	
	logOut: function() {
		SC.routes.set('location', 'logoutPage/logoutPane');
	}
	    
  }),

	detailCommentPane: SC.PanelPane.create({
		layout: { width:400, height:140, centerX:0, centerY:-50},
		contentView: SC.View.extend({
			childViews: 'paneTitle commentContent saveButton cancelButton'.w(),
			
			paneTitle: SC.LabelView.design({
			        layout: { left: 17, right: 17, top: 17, height: 26 },
			        value: 'Comment Details',
			        textAlign: SC.ALIGN_CENTER,
			        fontWeight: SC.BOLD_WEIGHT
			}),
			
			commentContent: SC.View.design({
				layout: { left: 17, right: 17, top: 44, height: 26 },
				childViews: 'label field'.w(),
				
				label: SC.LabelView.design({
		          layout: { left: 0, width: 95, height: 18, centerY: 0 },

		          value: 'Comment',
		          textAlign: SC.ALIGN_RIGHT,
		          fontWeight: SC.BOLD_WEIGHT
		        }),
				
				field: SC.TextFieldView.design({
		          layout: { width: 250, height: 22, right: 3, centerY: 0 },
		          valueBinding: 'CinnamonDolceLatte.commentController.updatedComment',
		          isEnabledBinding: 'CinnamonDolceLatte.mainPage.detailCommentPane.isEnabled'
		        })
			}),
			
			saveButton: SC.ButtonView.design({
	        layout: {bottom: 10, right: 110, height:24, width:80},
	        title: 'Save',
	        action: 'save',
	        isDefault: YES,
	        isEnabledBinding: 'CinnamonDolceLatte.commentController.contentIsChanged',
	        isVisibleBinding: 'CinnamonDolceLatte.mainPage.detailCommentPane.isEnabled'
	      }),

	      cancelButton: SC.ButtonView.design({
	        layout: {bottom: 10, right: 20, height:24, width:80},
	        title: 'Cancel',
	        action: 'cancel',
	        isCancel: YES,
	        isVisibleBinding: 'CinnamonDolceLatte.mainPage.detailCommentPane.isEnabled'
	      })			
		}),
		
		detailIsVisible: NO,
		
		detailIsVisibleDidChange: function() {
		      var panel = CinnamonDolceLatte.mainPage.get('detailCommentPane');
		      if (this.get('detailIsVisible')) {
		        // Show
		        panel.append();
		        // Set focus on the username field
		        CinnamonDolceLatte.mainPage.detailCommentPane.contentView.commentContent.field.becomeFirstResponder();
		      }
		      else {
		        // Hide
		        panel.remove();
		      }
		}.observes('detailIsVisible'),
		
		showForUpdate: function() {
		      this.set('detailIsVisible', YES);
		},
		
		save: function() {
	    CinnamonDolceLatte.commentController.save();
			this.set('detailIsVisible', NO);
	    },

	    cancel: function() {
	      CinnamonDolceLatte.commentController.discard();
	      this.set('detailIsVisible', NO);
	    }		
	}),
	
	detailPostPane: SC.PanelPane.create({
		layout: { width:400, height:200, centerX:0, centerY:-50},
		contentView: SC.View.extend({
			childViews: 'paneTitle postTitle postArticle referenceButton saveButton cancelButton'.w(),
			
			paneTitle: SC.LabelView.design({
			        layout: { left: 17, right: 17, top: 17, height: 26 },
			        value: 'Post Details',
			        textAlign: SC.ALIGN_CENTER,
			        fontWeight: SC.BOLD_WEIGHT
			}),
			
			postTitle: SC.View.design({
				layout: { left: 17, right: 17, top: 44, height: 26 },
				childViews: 'label field'.w(),
				
				label: SC.LabelView.design({
		          layout: { left: 0, width: 95, height: 18, centerY: 0 },

		          value: 'Title',
		          textAlign: SC.ALIGN_RIGHT,
		          fontWeight: SC.BOLD_WEIGHT
		        }),
				
				field: SC.TextFieldView.design({
		          layout: { width: 250, height: 22, right: 3, centerY: 0 },
		          valueBinding: 'CinnamonDolceLatte.postController.updatedTitle',
		          isEnabledBinding: 'CinnamonDolceLatte.mainPage.detailPostPane.isEnabled'
		        })
			}),
			
			postArticle: SC.View.design({
				layout: { left: 17, right: 17, top: 72, height: 26 },
				childViews: 'label field'.w(),
				
				label: SC.LabelView.design({
		          layout: { left: 0, width: 95, height: 18, centerY: 0 },

		          value: 'Article',
		          textAlign: SC.ALIGN_RIGHT,
		          fontWeight: SC.BOLD_WEIGHT
		        }),
				
				field: SC.TextFieldView.design({
		          layout: { width: 250, height: 22, right: 3, centerY: 0 },
		          valueBinding: 'CinnamonDolceLatte.postController.updatedArticle',
		          isEnabledBinding: 'CinnamonDolceLatte.mainPage.detailArticlePane.isEnabled'
		        })
			}),
			
			
			referenceButton: SC.ButtonView.design({
	        layout: {bottom: 10, left: 10, height:24, width:120},
	        title: 'References',
	        action: 'showReferences'
	        // isEnabledBinding: 'CinnamonDolceLatte.postController.contentIsChanged',
	        // isVisibleBinding: 'CinnamonDolceLatte.mainPage.detailPostPane.isEnabled'
	      }),
			
			
			saveButton: SC.ButtonView.design({
	        layout: {bottom: 10, right: 110, height:24, width:80},
	        title: 'Save',
	        action: 'save',
	        isDefault: YES,
	        isEnabledBinding: 'CinnamonDolceLatte.postController.contentIsChanged',
	        isVisibleBinding: 'CinnamonDolceLatte.mainPage.detailPostPane.isEnabled'
	      }),

	      cancelButton: SC.ButtonView.design({
	        layout: {bottom: 10, right: 20, height:24, width:80},
	        title: 'Cancel',
	        action: 'cancel',
	        isCancel: YES,
	        isVisibleBinding: 'CinnamonDolceLatte.mainPage.detailPostPane.isEnabled'
	      })			
		}),
		
		detailIsVisible: NO,
		
		detailIsVisibleDidChange: function() {
		      var panel = CinnamonDolceLatte.mainPage.get('detailPostPane');
		      if (this.get('detailIsVisible')) {
		        // Show
		        panel.append();
		        // Set focus on the username field
		        CinnamonDolceLatte.mainPage.detailPostPane.contentView.postTitle.field.becomeFirstResponder();
		      }
		      else {
		        // Hide
		        panel.remove();
		      }
		}.observes('detailIsVisible'),
		
		showForUpdate: function() {
		      this.set('detailIsVisible', YES);
		},
		
		showReferences: function() {
			 var refPane =      SC.PickerPane.create({
			        layout: { width: 400, height: 200 },
			        contentView: SC.View.extend({
								// childViews: 'referenceHeaderView referenceContentView referenceButtonViews'.w(),								
								childViews: 'referenceHeaderView'.w(),		
								referenceHeaderView: SC.ToolbarView.design({
									layout: {top: 10, left: 0, right: 0, height: 30},
									childViews: 'referenceLabelView'.w(),
									anchorLocation: SC.ANCHOR_TYPE,

									referenceLabelView: SC.LabelView.design({
										layout: { centerY: 0, centerX: 0, height: 20, width: 150 },
										controlSize: SC.SMALL_CONTROL_SIZE,
										value: 'Post References'					
									})										
								})						
							})
			      }).popup(this);
			this.cancel();
			return refPane;
		},
		
		save: function() {
	    CinnamonDolceLatte.postController.save();
			this.set('detailIsVisible', NO);
	    },

	    cancel: function() {
	      CinnamonDolceLatte.postController.discard();
	      this.set('detailIsVisible', NO);
	    }		
	})

});
