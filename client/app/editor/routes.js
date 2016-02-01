Router.route(
	'/edit',
	{
		name: 'editor',
		waitOn: function(){
			return [Meteor.subscribe("worlds")];
		},
		action: function(){
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
		},
		onAfterAction: function(){
			/*
				This hack makes the editor "reload" the world's data
			*/
			
			if(this.ready()){
				if(Meteor.userId()){
					var world = Worlds.find({
						owner:Meteor.userId()
					},
					{
						'sort':{
							'updated': -1
						}
					}).fetch();

					if(world.length === 0){
						/* Instantiate a new blank editor */
						if(typeof(editorObj) !== 'undefined'){clearEditor(editorObj)};
						editorObj = init(document.body);	

						/* Use this so we later check if an editor has been instantiated or not*/
						Session.set('hasEditor', true);
						Session.set('currentWorld');
					}
					else{
						/* Check if we have previously created an editor */
						if(Session.get('hasEditor') && typeof(editorObj) !== 'undefined'){
							/* Simply import the world's data */
							editorObj.editor.import(world[0].worldState);
							Session.set('currentWorld', world[0]._id);
						}
						else{
							/* Instantiate a new editor a load it with the world's data */
							editorObj = init(document.body, world[0].worldState);
							Session.set('hasEditor', true);
							Session.set('currentWorld', world[0]._id);
						}
					}
				}
			}
		}
	}
);