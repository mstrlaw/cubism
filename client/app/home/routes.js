Router.route(
	'/',
	{
		name: 'home',
		onBeforeAction: function(){
			if(typeof(editorObj) !== 'undefined'){ clearEditor(editorObj); };
			Session.set('currentWorld');
			this.next();
		},
		waitOn: function(){
			return [Meteor.subscribe("worlds")];
		},
		action: function(){
  			this.render('home');
  			
  			this.render('menu', {
  				to: 'menuArea',
  				data: function(){
					return { 
						'worlds': Worlds.find(),
					};
  				}
  			});
		},
	}
);