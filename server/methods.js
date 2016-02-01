Meteor.methods({
	'saveWorld': function(worldState, currentWorld){

		var world = Worlds.findOne({_id:currentWorld});

		if(typeof(world) === 'undefined'){
			var newWorld = Worlds.insert({
				'name': 'Untitled',
				'owner': Meteor.userId(),
				'created': new Date(),
				'updated': new Date(),
				'published': false,
				'worldState': worldState,
			});

			return newWorld;
		}
		else{
			//console.log('update existing world')
			Worlds.update({
				_id: currentWorld
			},
			{
				$set:{
					'worldState': worldState,
					'updated': new Date(),
				}
			});

			return currentWorld;
		}
		
	},
	'publishWorld': function(currentWorld){
		Worlds.update({
			_id: currentWorld
		},
		{
			$set:{
				'published': true,
			}
		});		
	},
	'unpublishWorld': function(currentWorld){
		Worlds.update({
			_id: currentWorld
		},
		{
			$set:{
				'published': false,
			}
		});		
	},
	'deleteWorld': function(currentWorld){
		if(typeof(currentWorld) !== 'undefined'){
			Worlds.remove({_id:currentWorld});
		}
	}
})