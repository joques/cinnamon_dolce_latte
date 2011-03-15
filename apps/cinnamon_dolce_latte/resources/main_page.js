// ==========================================================================
// Project:   CinnamonDolceLatte - mainPage
// Copyright: ©2010 iTrinity Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

// This page describes the main user interface for your application.  
CinnamonDolceLatte.mainPage = SC.Page.design({	
  mainPane: SC.MainPane.design({
		defaultResponder: 'CinnamonDolceLatte.statechart',
    childViews: 'middleView topView bottomView'.w(),
		classNames: ['main-pane'],

	topView: SC.ToolbarView.design({
		layout: { top: 0, left: 0, right: 0, height: 36 },
		childViews: 'appLabelView bannerLabelView searchView logOutButton'.w(),
		anchorLocation: SC.ANCHOR_TOP,
		
		appLabelView: SC.LabelView.design({
			layout: { centerY: 0, height: 24, left: 8, width: 200 },
	        controlSize: SC.SMALL_CONTROL_SIZE,
	        value:   '_vrg'.loc()
		}),
		
		bannerLabelView: SC.LabelView.design({
			layout: { centerY: 0, centerX: 0, height: 24, width: 250 },
	        controlSize: SC.LARGE_CONTROL_SIZE,
	        value:   '_AppTitle'.loc(),
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
					value: '_Topics'.loc()
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
					action: 'addNode'
				}),
				
				deleteTopicButton: SC.ButtonView.design({
					layout: {height: 24, width: 80, right: 5},
					theme: "capsule",
					title: '-',
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
						value: '_Articles'.loc()					
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
								label: '_Title'.loc(),
								width: 400
							}),
							SC.TableColumn.create({
								key: 'shortArticle',
								label: '_Article'.loc(),
								width: 800
							}),
							SC.TableColumn.create({
								key: 'creator',
								label: '_Author'.loc(),
								width: 140
							}),							
							SC.TableColumn.create({
								key: 'date_created',
								label: '_CreatedOn'.loc(),
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
						action: "showPostEditor"
					})				
				}),
				
				postButtonViews: SC.View.design({
					layout: { bottom: 10, centerX:0, height: 24, width: 170 },
					childViews: 'addPostButton deletePostButton'.w(),

					addPostButton: SC.ButtonView.design({
						layout: {height: 24, width: 80, left: 5},
						theme: "capsule",
						title: '+',
						action: 'addPost',
						isEnabledBinding: 'CinnamonDolceLatte.treeNodeController.canAddPost'								
					}),

					deletePostButton: SC.ButtonView.design({
						layout: {height: 24, width: 80, right: 5},
						theme: "capsule",
						title: '-',
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
						value: '_vComment'.loc()					
					})										
					
				}),
				
				commentContentView: SC.ScrollView.design({
					hasHorizontalScroller: NO,
					layout: { top: 40, left: 0, right: 0 },
					contentView: SC.TableView.design({
						layout: {top: 45, bottom:34, left: 10, right:10},
						
						columns:[
							SC.TableColumn.create({
								key: 'shortComment',
								label: '_Comment'.loc(),
								width: 1200
							}),
							SC.TableColumn.create({
								key: 'commentator',
								label: '_Author'.loc(),
								width: 140
							}),
							SC.TableColumn.create({
								key: 'date_created',
								label: '_CreatedOn'.loc(),
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
						action: "showCommentEditor"
					})
					
				}),
				
				commentButtonViews: SC.View.design({
					layout: { bottom: 10, centerX:0, height: 24, width: 170 },
					childViews: 'addCommentButton deleteCommentButton'.w(),

					addCommentButton: SC.ButtonView.design({
						layout: {height: 24, width: 80, left: 5},
						theme: "capsule",
						title: '+',
						action: 'addComment',
						isEnabledBinding: 'CinnamonDolceLatte.postController.canAddComment'								
					}),

					deleteCommentButton: SC.ButtonView.design({
						layout: {height: 24, width: 80, right: 5},
						theme: "capsule",
						title: '-',
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
	})	    
}),

	detailCommentPane: SC.PanelPane.create({
		layout: { width:400, height:140, centerX:0, centerY:-50},
		contentView: SC.View.extend({
			childViews: 'paneTitle commentContent saveButton cancelButton'.w(),
			
			
			paneTitle: SC.ToolbarView.design({
				layout: {top: 5, left: 0, right: 0, height: 20},
				childViews: 'referenceLabelView'.w(),
				anchorLocation: SC.ANCHOR_TYPE,

				referenceLabelView: SC.LabelView.design({
					layout: { centerY: 0, centerX: 0, height: 15, width: 80},
					controlSize: SC.SMALL_CONTROL_SIZE,
					value: '_EditComment'.loc()					
				})										
			}),
			
			commentContent: SC.View.design({
				layout: { left: 17, right: 17, top: 30, height: 70 },
				childViews: 'field'.w(),
								
				field: SC.TextFieldView.design({
		          layout: { width: 350, height: 60, centerX: 0, centerY: 0 },
							isTextArea: YES,
		          valueBinding: 'CinnamonDolceLatte.commentController.updatedComment',
		          isEnabledBinding: 'CinnamonDolceLatte.mainPage.detailCommentPane.isEnabled'
		        })
			}),
			
			saveButton: SC.ButtonView.design({
	        layout: {bottom: 10, right: 110, height:24, width:80},
	        title: '_Save'.loc(),
	        action: 'save',
	        isDefault: YES,
	        isEnabledBinding: 'CinnamonDolceLatte.commentController.contentIsChanged',
	        isVisibleBinding: 'CinnamonDolceLatte.mainPage.detailCommentPane.isEnabled'
	      }),

	      cancelButton: SC.ButtonView.design({
	        layout: {bottom: 10, right: 20, height:24, width:80},
	        title: '_Cancel'.loc(),
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
			CinnamonDolceLatte.statechart.sendEvent('saveComment');
		},
		
		cancel: function() {
			CinnamonDolceLatte.statechart.sendEvent('cancelComment');
		}		
	}), // detailCommentPane
	
	detailPostPane: SC.PanelPane.create({
		layout: { width:400, height:200, centerX:0, centerY:-50},
		contentView: SC.View.extend({
			childViews: 'paneTitle postTitle postArticle referenceButton saveButton cancelButton'.w(),
			
			paneTitle: SC.ToolbarView.design({
				layout: {top: 5, left: 0, right: 0, height: 20},
				childViews: 'referenceLabelView'.w(),
				anchorLocation: SC.ANCHOR_TYPE,

				referenceLabelView: SC.LabelView.design({
					layout: { centerY: 0, centerX: 0, height: 15, width: 80},
					controlSize: SC.SMALL_CONTROL_SIZE,
					value: '_EditPost'.loc()					
				})										
			}),
			
			postTitle: SC.View.design({
				layout: { left: 17, right: 17, top: 30, height: 26 },
				childViews: 'label field'.w(),
				
				label: SC.LabelView.design({
		          layout: { left: 0, width: 95, height: 24, centerY: 0 },

		          value: '_Title'.loc(),
		          textAlign: SC.ALIGN_RIGHT,
		          fontWeight: SC.BOLD_WEIGHT
		        }),
				
				field: SC.TextFieldView.design({
		          layout: { width: 250, height: 24, right: 3, centerY: 0 },
		          valueBinding: 'CinnamonDolceLatte.postController.updatedTitle',
		          isEnabledBinding: 'CinnamonDolceLatte.mainPage.detailPostPane.isEnabled'
		        })
			}),
			
			postArticle: SC.View.design({
				layout: { left: 17, right: 17, top: 60, height: 70 },
				childViews: 'label field'.w(),
				
				label: SC.LabelView.design({
		          layout: { left: 0, width: 95, height: 18, centerY: 0 },

		          value: '_Article'.loc(),
		          textAlign: SC.ALIGN_RIGHT,
		          fontWeight: SC.BOLD_WEIGHT
		        }),
				
				field: SC.TextFieldView.design({
		          layout: { width: 250, height: 65, right: 3, centerY: 0 },
							isTextArea: YES,
		          valueBinding: 'CinnamonDolceLatte.postController.updatedArticle',
		          isEnabledBinding: 'CinnamonDolceLatte.mainPage.detailPostPane.isEnabled'
		        })
			}),
			
			
			referenceButton: SC.ButtonView.design({
	        layout: {bottom: 10, left: 10, height:24, width:120},
	        title: '_References'.loc(),
	        action: 'showPostReferences'
	      }),
			
			
			saveButton: SC.ButtonView.design({
	        layout: {bottom: 10, right: 110, height:24, width:80},
	        title: '_Save'.loc(),
	        action: 'save',
	        isDefault: YES,
	        isEnabledBinding: 'CinnamonDolceLatte.postController.contentIsChanged',
	        isVisibleBinding: 'CinnamonDolceLatte.mainPage.detailPostPane.isEnabled'
	      }),

	      cancelButton: SC.ButtonView.design({
	        layout: {bottom: 10, right: 20, height:24, width:80},
	        title: '_Cancel'.loc(),
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
		
		displayReferences: function() {
			 var refPane =      SC.PickerPane.create({
			        layout: { width: 700, height: 400 },
			        contentView: SC.View.extend({
								childViews: 'referenceHeaderView referenceContentView referenceButtonViews'.w(),
										
								referenceHeaderView: SC.ToolbarView.design({
									layout: {top: 10, left: 0, right: 0, height: 30},
									childViews: 'referenceLabelView'.w(),
									anchorLocation: SC.ANCHOR_TYPE,

									referenceLabelView: SC.LabelView.design({
										layout: { centerY: 0, centerX: 0, height: 20, width: 60 },
										controlSize: SC.SMALL_CONTROL_SIZE,
										value: '_References'.loc()					
									})										
								}),
								
								referenceContentView: SC.ScrollView.design({
									hasHorizontalScroller: NO,
									layout: { top: 40, left: 0, right: 0 },
									
									contentView: SC.TableView.design({
										layout: {bottom:40, left: 10, right:10},
										columns:[
											SC.TableColumn.create({
												key: 'resource_title',
												label: '_Title'.loc(),
												width: 400
											}),
											SC.TableColumn.create({
												key: 'resource_type',
												label: '_Category'.loc(),
												width: 80
											}),
											SC.TableColumn.create({
												key: 'authorsName',
												label: '_Authors'.loc(),
												width: 120
											}),
											SC.TableColumn.create({
												key: 'date_of_publication',
												label: '_PublishedOn'.loc(),
												width: 60
											})
										],

										contentBinding: "CinnamonDolceLatte.referenceArrayController.arrangedObjects",
										selectionBinding: "CinnamonDolceLatte.referenceArrayController.selection",
										canReorderContent: YES, 

									    sortedColumnBinding: 'CinnamonDolceLatte.referenceArrayController.sortedColumn',
									    selectOnMouseDown: YES,
									    exampleView: SC.TableRowView,
									    recordType: CinnamonDolceLatte.Reference,

										// target: "CinnamonDolceLatte.mainPage.detailReferencePane",
										target: "CinnamonDolceLatte.mainPage.detailPostPane",
										// action: "showForUpdate"
										action: "showReferenceEditor"
										})					
								}),
								
								referenceButtonViews: SC.View.design({
									layout: {bottom: 5, left: 0, right: 0, height: 30},
									childViews: 'closeReferenceButton addReferenceButton deleteReferenceButton'.w(),
									
									closeReferenceButton: SC.ButtonView.design({
										layout: {left: 10, width: 80, height: 24},
										title: '_Close'.loc(),
										action: 'closePickerPane',
										target: 'CinnamonDolceLatte.mainPage.detailPostPane'
									}),
									
									deleteReferenceButton: SC.ButtonView.design({
										layout: {right: 10, width: 80, height: 24},
										title: '-',
										target: 'CinnamonDolceLatte.mainPage.detailPostPane',
										action: 'deleteReference',
										isEnabledBinding: 'CinnamonDolceLatte.referenceController.canDeleteReference'
									}),
									
									addReferenceButton: SC.ButtonView.design({
										layout: {right: 100, width: 80, height: 24},
										title: '+',
										target: 'CinnamonDolceLatte.mainPage.detailPostPane',
										action: 'addReference'
									})
								})
							})
			      }).popup(this);
			this.cancel();
			return refPane;
		},
		
		save: function() {
			CinnamonDolceLatte.statechart.sendEvent('savePost');
	  },

	  cancel: function() {
			CinnamonDolceLatte.statechart.sendEvent('cancelPost');
	  },
	
		showPostReferences: function() {
			CinnamonDolceLatte.statechart.sendEvent('showPostReferences');
		},
	
		closePickerPane: function(sender){
			CinnamonDolceLatte.statechart.sendEvent('closeRefs');
			sender.get('pane').remove();
		},
		
		addReference: function() {
			CinnamonDolceLatte.statechart.sendEvent('addReference');
		},
		
		deleteReference: function() {
			CinnamonDolceLatte.statechart.sendEvent('deleteReference');
		},
		
		showReferenceEditor: function() {
			CinnamonDolceLatte.statechart.sendEvent('showReferenceEditor');
		}
		
	}),//detailPostPane
	
	
	// detailReferencePane
	detailReferencePane: SC.PanelPane.create({
		layout: { width:400, height:450, centerX:0, centerY:-50},
		contentView: SC.View.extend({
			childViews: 'paneTitle referenceContent addAuthorButton deleteAuthorButton saveButton cancelButton'.w(),
			
			paneTitle: SC.ToolbarView.design({
				layout: {top: 5, left: 0, right: 0, height: 20},
				childViews: 'referenceLabelView'.w(),
				anchorLocation: SC.ANCHOR_TYPE,

				referenceLabelView: SC.LabelView.design({
					layout: { centerY: 0, centerX: 0, height: 15, width: 80},
					controlSize: SC.SMALL_CONTROL_SIZE,
					value: '_EditReference'.loc()					
				})										
			}),
									
			referenceContent: SC.View.design({
				layout: { left: 5, right: 5, top: 23, height: 370 },
				childViews: 'resourceTitle resourceType resourceDOP authors'.w(),
				
				// resourceTitle
				resourceTitle: SC.View.design({
					layout: { left: 0, right: 0, top: 10, height: 50 },
					childViews: 'label field'.w(),

					label: SC.LabelView.design({
			          layout: { left: 0, width: 120, height: 18, centerY: 0 },

			          value: '_ResourceTitle'.loc(),
			          textAlign: SC.ALIGN_RIGHT,
			          fontWeight: SC.BOLD_WEIGHT
			        }),

					field: SC.TextFieldView.design({
			          layout: { width: 250, height: 45, right: 3, centerY: 0 },
								isTextArea: YES,
								hint: '_ResourceTitle'.loc(),
			          valueBinding: 'CinnamonDolceLatte.referenceController.updatedTitle',
			          isEnabledBinding: 'CinnamonDolceLatte.mainPage.detailReferencePane.isEnabled'
			        })
				}),
				
				// resourceType				
				resourceType: SC.View.design({
					layout: { left: 0, right: 0, top: 60, height: 50 },
					childViews: 'label field'.w(),

					label: SC.LabelView.design({
			          layout: { left: 0, width: 120, height: 18, centerY: 0 },

			          value: '_ResourceType'.loc(),
			          textAlign: SC.ALIGN_RIGHT,
			          fontWeight: SC.BOLD_WEIGHT
			        }),

					field: SC.SelectFieldView.design({
			          layout: { width: 250, height: 45, right: 3, centerY: +10 },
								objects: [{name: 'talk', value: 'Talk'},
								{name: 'wiki', value: 'Wiki'},
								{name: 'conference', value: 'Conference'},
								{name: 'journal', value: 'Journal'},
								{name: 'blog', value: 'Blog'}],
								
								nameKey: 'name',
								valueKey: 'value',			
			          valueBinding: 'CinnamonDolceLatte.referenceController.updatedType'
			          // isEnabledBinding: 'CinnamonDolceLatte.mainPage.detailReferencePane.isEnabled'
			        })
				}),
				
				// resourceDOP				
				resourceDOP: SC.View.design({
					layout: { left: 0, right: 0, top: 110, height: 50 },
					childViews: 'label field'.w(),

					label: SC.LabelView.design({
			          layout: { left: 0, width: 120, height: 18, centerY: 0 },

			          value: '_PublishedOn'.loc(),
			          textAlign: SC.ALIGN_RIGHT,
			          fontWeight: SC.BOLD_WEIGHT
			        }),

					field: SC.TextFieldView.design({
			          layout: { width: 250, height: 45, right: 3, centerY: 0 },
								isTextArea: YES,
								hint: '_dop'.loc(),
			          valueBinding: 'CinnamonDolceLatte.referenceController.updatedDOP',
			          isEnabledBinding: 'CinnamonDolceLatte.mainPage.detailReferencePane.isEnabled',
								validator: 'DateTime'
			        })
				}),
				
				// authors
				authors: SC.ScrollView.design({
					hasHorizontalScroller: NO,
					layout: { top: 160, left: 0, right: 0 },
					
					contentView: SC.TableView.design({
						layout: {bottom:15, left: 10, right:10},
						columns:[
							SC.TableColumn.create({
								key: 'first_name',
								label: '_FirstName'.loc(),
								width: 120
							}),
							SC.TableColumn.create({
								key: 'last_name',
								label: '_LastName'.loc(),
								width: 120
							}),
							SC.TableColumn.create({
								key: 'email',
								label: '_Email'.loc(),
								width: 120
							})
						],

						contentBinding: "CinnamonDolceLatte.authorArrayController.arrangedObjects",
						selectionBinding: "CinnamonDolceLatte.authorArrayController.selection",
						canReorderContent: YES, 

					  sortedColumnBinding: 'CinnamonDolceLatte.authorArrayController.sortedColumn',
					  selectOnMouseDown: YES,
					  exampleView: SC.TableRowView,
					  recordType: CinnamonDolceLatte.Author,

						// target: "CinnamonDolceLatte.mainPage.detailAuthorPane",
						target: "CinnamonDolceLatte.mainPage.detailReferencePane",
						action: "showAuthorEditor"
						})					
				})								
			}),
			
			
			addAuthorButton: SC.ButtonView.design({
				layout: {bottom: 10, left: 5, height:24, width:80},
				theme: "capsule",
				title: 'Author+',
				action: 'addAuthor',
				isEnabledBinding: 'CinnamonDolceLatte.referenceController.canAddAuthor'								
			}),

			deleteAuthorButton: SC.ButtonView.design({
				layout: {bottom: 10, left: 90, height:24, width:80},
				theme: "capsule",
				title: 'Author-',
				action: 'deleteAuthor',
				isEnabledBinding: 'CinnamonDolceLatte.authorController.canDeleteAuthor'				
			}),
			
			saveButton: SC.ButtonView.design({
	        layout: {bottom: 10, right: 110, height:24, width:80},
	        title: '_Save'.loc(),
	        action: 'save',
	        isDefault: YES,
	        isEnabledBinding: 'CinnamonDolceLatte.referenceController.contentIsChanged',
	        isVisibleBinding: 'CinnamonDolceLatte.mainPage.detailReferencePane.isEnabled'
	      }),

	      cancelButton: SC.ButtonView.design({
	        layout: {bottom: 10, right: 20, height:24, width:80},
	        title: '_Cancel'.loc(),
	        action: 'cancel',
	        isCancel: YES,
	        isVisibleBinding: 'CinnamonDolceLatte.mainPage.detailReferencePane.isEnabled'
	      })			
		}),
		
		detailIsVisible: NO,
		
		detailIsVisibleDidChange: function() {
		      var panel = CinnamonDolceLatte.mainPage.get('detailReferencePane');
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
			CinnamonDolceLatte.statechart.sendEvent('saveReference');
	    },

	    cancel: function() {
				CinnamonDolceLatte.statechart.sendEvent('cancelReference');
	    },
	
	addAuthor: function() {
		CinnamonDolceLatte.statechart.sendEvent('addAuthor');
	},
	
	deleteAuthor: function() {
		CinnamonDolceLatte.statechart.sendEvent('deleteAuthor');
	},
	
	showAuthorEditor: function() {
		CinnamonDolceLatte.statechart.sendEvent('showAuthorEditor');
	}	
	
	}), //detailReferencePane
	
	detailAuthorPane: SC.PanelPane.create({
		layout: { width:400, height:230, centerX:0, centerY:-50},
		contentView: SC.View.extend({
			childViews: 'paneTitle authorContent saveButton cancelButton'.w(),
			
			paneTitle: SC.ToolbarView.design({
				layout: {top: 5, left: 0, right: 0, height: 20},
				childViews: 'referenceLabelView'.w(),
				anchorLocation: SC.ANCHOR_TYPE,

				referenceLabelView: SC.LabelView.design({
					layout: { centerY: 0, centerX: 0, height: 15, width: 80},
					controlSize: SC.SMALL_CONTROL_SIZE,
					value: '_EditAuthor'.loc()					
				})										
			}),
			
			
			authorContent: SC.View.design({
				layout: { left: 5, right: 5, top: 23, height: 150 },
				childViews: 'firstName lastName emailAddress'.w(),
				
				// firstName
				firstName: SC.View.design({
					layout: { left: 0, right: 0, top: 10, height: 50 },
					childViews: 'label field'.w(),

					label: SC.LabelView.design({
			          layout: { left: 0, width: 120, height: 18, centerY: 0 },

			          value: '_FirstName'.loc(),
			          textAlign: SC.ALIGN_RIGHT,
			          fontWeight: SC.BOLD_WEIGHT
			        }),

					field: SC.TextFieldView.design({
			          layout: { width: 250, height: 45, right: 3, centerY: 0 },
								isTextArea: YES,
								hint: '_FirstName'.loc(),
			          valueBinding: 'CinnamonDolceLatte.authorController.updatedFirstName',
			          isEnabledBinding: 'CinnamonDolceLatte.mainPage.detailAuthorPane.isEnabled'
			        })
				}),
				
				// lastName	
				lastName: SC.View.design({
					layout: { left: 0, right: 0, top: 60, height: 50 },
					childViews: 'label field'.w(),

					label: SC.LabelView.design({
			          layout: { left: 0, width: 120, height: 18, centerY: 0 },

			          value: '_LastName'.loc(),
			          textAlign: SC.ALIGN_RIGHT,
			          fontWeight: SC.BOLD_WEIGHT
			        }),

					field: SC.TextFieldView.design({
			          layout: { width: 250, height: 45, right: 3, centerY: 0 },
								isTextArea: YES,
								hint: '_LastName'.loc(),
			          valueBinding: 'CinnamonDolceLatte.authorController.updatedLastName',
			          isEnabledBinding: 'CinnamonDolceLatte.mainPage.detailAuthorPane.isEnabled'
			        })
				}),
				
				// Email Address				
				emailAddress: SC.View.design({
					layout: { left: 0, right: 0, top: 110, height: 50 },
					childViews: 'label field'.w(),

					label: SC.LabelView.design({
			          layout: { left: 0, width: 120, height: 18, centerY: 0 },

			          value: '_Email'.loc(),
			          textAlign: SC.ALIGN_RIGHT,
			          fontWeight: SC.BOLD_WEIGHT
			        }),

					field: SC.TextFieldView.design({
			          layout: { width: 250, height: 45, right: 3, centerY: 0 },
								isTextArea: YES,
								hint: '_Email'.loc(),
			          valueBinding: 'CinnamonDolceLatte.authorController.updatedEmail',
			          isEnabledBinding: 'CinnamonDolceLatte.mainPage.detailAuthorPane.isEnabled',
								validator: 'Email'
			        })
				})				
			}),
			
			saveButton: SC.ButtonView.design({
	        layout: {bottom: 10, right: 110, height:24, width:80},
	        title: '_Save'.loc(),
	        action: 'save',
	        isDefault: YES,
	        isEnabledBinding: 'CinnamonDolceLatte.authorController.contentIsChanged',
	        isVisibleBinding: 'CinnamonDolceLatte.mainPage.detailAuthorPane.isEnabled'
	      }),

	      cancelButton: SC.ButtonView.design({
	        layout: {bottom: 10, right: 20, height:24, width:80},
	        title: '_Cancel'.loc(),
	        action: 'cancel',
	        isCancel: YES,
	        isVisibleBinding: 'CinnamonDolceLatte.mainPage.detailAuthorPane.isEnabled'
	      })			
		}),
		
		detailIsVisible: NO,
		
		detailIsVisibleDidChange: function() {
		      var panel = CinnamonDolceLatte.mainPage.get('detailAuthorPane');
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
			CinnamonDolceLatte.statechart.sendEvent('saveAuthorEdit');
	  },

	  cancel: function() {
			CinnamonDolceLatte.statechart.sendEvent('cancelAuthorEdit');
	  }		
	}) // detailAuthorPane
	

});
