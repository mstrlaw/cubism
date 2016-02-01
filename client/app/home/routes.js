Router.route(
	'/',
	{
		name: 'home',
		onBeforeAction: function(){
			if(typeof(editorObj) !== 'undefined'){clearEditor(editorObj);};
			Session.set('currentWorld');
			this.next();
		},
		waitOn: function(){
			return Meteor.subscribe("worlds");
		},
		action: function(){
  			this.render('home', {
  				data: function(){
					return { 
						'worlds': Worlds.find(),
					};
  				}
  			});
  			
  			this.render('homeMenu', {
  				to: 'menuArea',
  				data: function(){
					return { 
						'worlds': Worlds.find({
							owner: Meteor.userId()
						}),
					};
  				}
  			});
		},
		onAfterAction: function(){
			/* Le hack to hide the scene */
			$('body').find('.scene').css({'display':'none'});
		}
	}
);