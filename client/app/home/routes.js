Router.route(
	'/',
	{
		name: 'home',
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