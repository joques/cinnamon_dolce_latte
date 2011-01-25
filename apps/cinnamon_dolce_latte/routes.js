// ==========================================================================
// Project:   CinnamonDolceLatte - routes
// Copyright: ©2010 iTrinity Inc.
// ==========================================================================


CinnamonDolceLatte.routes = SC.Object.create({
		currentPagePane: null,
		
		moveToPage: function(routeParams) {
			var pageName = routeParams.pageName;
			if ((pageName == undefined) || (pageName == '')) {
				pageName = 'mainPage';
			}
			
			var paneName = routeParams.paneName;
			if ((paneName == undefined) || (paneName == '')) {
				paneName = 'mainPane';
			}
			
			if((pageName != 'loginPage') && (paneName != 'loginPane')) {
				var authCookie = SC.Cookie.find('CinnamonDolceLatteCookie');
				if (authCookie == null) {
					CinnamonDolceLatte.loginController.set('userName', '');
					CinnamonDolceLatte.loginController.set('passWord', '');
					CinnamonDolceLatte.loginController.set('returnRoute', pageName + '/' + paneName);
					
					// CinnamonDolceLatte.loginPage.loginPane.boxView.userName.field.becomeFirstResponder();
					SC.routes.set('location', 'loginPage/loginPane');
					return ;
				}
			}
			
			if ((pageName == 'logoutPage') && (paneName == 'logoutPane')) {
				var authCookie = SC.Cookie.find('CinnamonDolceLatteCookie');
				if (authCookie != null) {
					authCookie.destroy();
				}
				CinnamonDolceLatte.loginController.set('userName', '');
				CinnamonDolceLatte.loginController.set('passWord', '');
				CinnamonDolceLatte.loginController.set('returnRoute',  'mainPage/mainPane');
								
				SC.routes.set('location', 'loginPage/loginPane');
				return ;
			}
			
			if(this.currentPagePane != null) {
				this.currentPagePane.remove();
			}
			
			var pagePanePath = 	pageName + '.' + paneName ;
			
			var pagePane = CinnamonDolceLatte.getPath(pagePanePath);
			pagePane.append();
			
			this.currentPagePane = pagePane;			
		}
});
