Router.route(
	'/edit/:_id',
	{
		name: 'editor',
		waitOn: function(){
			return Meteor.subscribe('worlds');
		},
		action: function(){
			
			world = Worlds.find({
				_id: this.params._id,
			},
			{
				'sort':{ 'updated': -1 }
			}).fetch();

  			this.render('editor');

  			this.render('editorMenu', {
  				to: 'menuArea',
  				data: function(){
  					
  					/* Show/hide editor tools */
  					if(world.owner === Meteor.userId()){
						return { 
							'canEdit': true,
						};
  					}
  					else{
  						return {
  							'canEdit': false,
  						}
  					}
  				}
  			});
		},
		onAfterAction: function(){
			/*
				This hack makes the editor "reload" the world's data
			*/
			if(this.ready()){

				if(typeof(world) !== 'undefined' && world.length > 0){
					if(typeof(editorObj) === 'undefined'){
						editorObj = init(document.body, world[0].worldState); 
					}
					else{
						editorObj.editor.import(world[0].worldState);
					}

					/* Disable editor if need be*/
					if(!Meteor.userId() || world[0].owner !== Meteor.userId()){
						editorObj.editor.disable();
					}

					Session.set('currentWorld', world[0]._id);
					$('body').find('.scene').css({'display':'block'});
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
);