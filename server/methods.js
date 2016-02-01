Meteor.methods({
	'newWorld': function(){
		console.log('create new world');

		/* Create new world with single voxel block*/
		var newWorld = Worlds.insert({
			'name': 'Untitled',
			'owner': Meteor.userId(),
			'created': new Date(),
			'updated': new Date(),
			'published': false,
			'worldState': '[{\"position\":{\"x\":0,\"y\":0,\"z\":0},\"dimension\":100,\"mesh\":\"{\\\"front\\\":\\\"image(http://voxelcss.com/res/grass/side.png)\\\",\\\"back\\\":\\\"image(http://voxelcss.com/res/grass/side.png)\\\",\\\"left\\\":\\\"image(http://voxelcss.com/res/grass/side.png)\\\",\\\"right\\\":\\\"image(http://voxelcss.com/res/grass/side.png)\\\",\\\"top\\\":\\\"image(http://voxelcss.com/res/grass/top.png)\\\",\\\"bottom\\\":\\\"image(http://voxelcss.com/res/grass/bottom.png)\\\"}\"}]',
		});

		return newWorld;
	},
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
	'saveName': function(name, currentWorld){
		Worlds.update({
			_id: currentWorld,
			owner: Meteor.userId()
		},
		{
			$set:{
				'name': name,
				'updated': new Date(),
			}
		});
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