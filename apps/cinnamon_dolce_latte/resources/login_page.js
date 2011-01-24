// ==========================================================================
// Project:   CinnamonDolceLatte - loginPage
// Copyright: ©2010 iTrinity Inc.
// ==========================================================================


CinnamonDolceLatte.loginPage = SC.Page.design({
	loginPane: SC.MainPane.design({
		layout: {width: 460, height: 160, centerX: 0, centerY: 0},
		classNames: ['login-pane'],
		childViews: 'boxView'.w(),
		
		boxView: SC.View.design({
			childViews: 'userName passWord loginButton'.w(),
			
			userName: SC.View.design({
				layout: {left: 10, width: 160, centerY: 0, height: 80},
				childViews: 'label field'.w(),        
				
				label: SC.LabelView.design({
					layout: {left: 10, width: 160, centerY: -18, height: 15},
					value: "_Username",
					localize: YES,
					textAlign: SC.ALIGN_CENTER
				}),
			
				field: SC.TextFieldView.design({
					layout: {left: 10, width: 160, centerY: 20, height: 50},
					isEnabledBinding: SC.Binding.from("CinnamonDolceLatte.loginController.isLoggingIn")
																			.bool()
																			.transform(function(value, isForward) {return !value ;}),
					valueBinding: "CinnamonDolceLatte.loginController.userName"
				})
			}),
			
			passWord: SC.View.design({
				layout: {left: 185, width: 160, centerY: 0, height: 80},
				childViews: 'label field'.w(),        
				
				label: SC.LabelView.design({
					layout: {left: 0, width: 160, centerY: -18, height: 15},
					value: "_Password",
					localize: YES,
					textAlign: SC.ALIGN_CENTER					
				}),
				
				field: SC.TextFieldView.design({
					layout: {left: 0, width: 160, centerY: 20, height: 50},
					isPassword: YES,
					isEnabledBinding: SC.Binding.from("CinnamonDolceLatte.loginController.isLoggingIn")
																			.bool()
																			.transform(function(value, isForward) {return !value ;}),
					valueBinding: "CinnamonDolceLatte.loginController.passWord"				
				})
			}),
			
			loginButton: SC.ButtonView.design({
				
				layout: {left: 355, width: 100, centerY: 25, height: 50},
				title: '_Login',
				localize: YES,
				isDefault: YES,
				isEnabledBinding: SC.Binding.from("CinnamonDolceLatte.loginController.isLoggingIn").bool().transform(function(value, isForward) {return !value ;}),
				target: 'CinnamonDolceLatte.loginController',
				action: 'beginLogging'
			})			
		})
	})
});