Router.route(
	'/edit/:_id',
	{
		name: 'editor',
		waitOn: function(){
			return Meteor.subscribe('worlds');
		},
		action: function(){
			if(Meteor.userId()){

	  			this.render('editor');
	  			
	  			this.render('menu', {
	  				to: 'menuArea',
	  				data: function(){
	  					
	  					var worlds = Worlds.find();

	  					if(typeof(worlds) !== 'undefined'){
							return { 
								'worlds': worlds,
							};
	  					}
	  				}
	  			});
			}
			else{
				Router.go('home');
			}

		},
		onAfterAction: function(){
			/*
				This hack makes the editor "reload" the world's data
			*/
			
			if(this.ready()){
				if(Meteor.userId()){
					
					var world = Worlds.find({
						_id: this.params._id,
						owner:Meteor.userId()
					},
					{
						'sort':{ 'updated': -1 }
					}).fetch();

					if(typeof(world) !== 'undefined' && world.length > 0){
						if(typeof(editorObj) === 'undefined'){
							editorObj = init(document.body, world[0].worldState); 
						}
						else{
							editorObj.editor.import(world[0].worldState);
						}
						
						Session.set('currentWorld', world[0]._id);
					}
					// else{
					// 	/*In case there are 0 worlds in the DB */
					// 	Meteor.call('newWorld', function(err, worldId){
					// 		Session.set('currentWorld', worldId);
					// 		Router.go('editor', {_id: worldId });
					// 	});
					// }
				}
			}
		}
	}
);