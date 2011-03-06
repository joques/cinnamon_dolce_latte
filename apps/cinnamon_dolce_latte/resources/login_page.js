// ==========================================================================
// Project:   CinnamonDolceLatte - loginPage
// Copyright: ©2010 iTrinity Inc.
// ==========================================================================


CinnamonDolceLatte.loginPage = SC.Page.design({
	loginPane: SC.MainPane.design({
		defaultResponder: 'CinnamonDolceLatte.statechart',
		layout: {width: 460, height: 160, centerX: 0, centerY: 0},
		classNames: ['login-pane'],
		childViews: 'boxView'.w(),
		
		boxView: SC.View.design({
			layerId: 'loginBox',
			childViews: 'userName passWord loginButton'.w(),
			
			userName: SC.View.design({
				layerId: 'loginUserName',
				layout: {left: 10, width: 160, centerY: 0, height: 80},
				childViews: 'label field'.w(),        
				
				label: SC.LabelView.design({
					layerId: 'loginUserNameLabel',
					layout: {left: 10, width: 160, centerY: -18, height: 15},
					value: "_Username".loc(),
					textAlign: SC.ALIGN_CENTER
				}),
			
				field: SC.TextFieldView.design({
					layerId: 'loginUserNameTextField',
					layout: {left: 10, width: 160, centerY: 20, height: 50},
					hint: "_Username".loc(),
					isEnabledBinding: SC.Binding.from("CinnamonDolceLatte.loginController.isLoggingIn")
																			.bool()
																			.transform(function(value, isForward) {return !value ;}),
					valueBinding: "CinnamonDolceLatte.loginController.userName",
					
					isVisibleObserver: function() {
					    if(this.get('isVisibleInWindow')) {
					      this.$input()[0].focus();
					    }
					  }.observes('isVisibleInWindow')
				})
			}),
			
			passWord: SC.View.design({
				layerId: 'loginPassWord',
				layout: {left: 185, width: 160, centerY: 0, height: 80},
				childViews: 'label field'.w(),        
				
				label: SC.LabelView.design({
					layerId: 'loginPassWordLabel',
					layout: {left: 0, width: 160, centerY: -18, height: 15},
					value: "_Password".loc(),
					textAlign: SC.ALIGN_CENTER					
				}),
				
				field: SC.TextFieldView.design({
					layerId: 'loginPassWordTextField',
					layout: {left: 0, width: 160, centerY: 20, height: 50},
					hint: "_Password".loc(),
					isPassword: YES,
					isEnabledBinding: SC.Binding.from("CinnamonDolceLatte.loginController.isLoggingIn")
																			.bool()
																			.transform(function(value, isForward) {return !value ;}),
					valueBinding: "CinnamonDolceLatte.loginController.passWord"
				})
			}),
			
			loginButton: SC.ButtonView.design({
				layerId: 'loginButton',				
				layout: {left: 355, width: 100, centerY: 25, height: 50},
				title: '_Login'.loc(),
				isDefault: YES,
				isEnabledBinding: SC.Binding.from("CinnamonDolceLatte.loginController.isLoggingIn").bool().transform(function(value, isForward) {return !value ;}),
				action: 'signin'
			})			
		})
	})
});