Meteor.publish('worlds', function(){
	return Worlds.find({});
});