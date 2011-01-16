// ==========================================================================
// Project:   CinnamonDolceLatte - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

// This page describes the main user interface for your application.  
CinnamonDolceLatte.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'middleView topView bottomView'.w(),

	topView: SC.ToolbarView.design({
		layout: { top: 0, left: 0, right: 0, height: 36 },
		childViews: 'appLabelView bannerLabelView searchView'.w(),
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
			layout: { centerY: 0, height: 24, right: 0, width: 225},
			childViews: 'searchArea searchButton'.w(),
			
			searchArea: SC.TextFieldView.design({
				layout: {left: 0, height: 22, width: 120},
				hint: "local search".loc()
			}),
						
			searchButton: SC.ButtonView.design({
				layout: {height: 22, right: 12, width: 80},
				theme: "capsule",
				title: 'search'
			})
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
					selectionBinding: "CinnamonDolceLatte.disciplinesTreeController.selection"
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
	        // defaultThickness: 0.8,
			
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
								width: 940
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
					    recordType: CinnamonDolceLatte.Post
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
								width: 1340
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
					    recordType: CinnamonDolceLatte.Comment
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
	})    
  })

});
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('cinnamon_dolce_latte');