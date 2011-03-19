// ==========================================================================
// Project:   CinnamonDolceLatte
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CinnamonDolceLatte */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
CinnamonDolceLatte.main = function main() {
	SC.routes.add(':pageName/:paneName', CinnamonDolceLatte.routes, 'moveToPage');
	SC.routes.add(':', CinnamonDolceLatte.routes, 'moveToPage');
	CinnamonDolceLatte.statechart.initStatechart();
} ;

function main() { CinnamonDolceLatte.main(); }
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('cinnamon_dolce_latte');