Template.homeMenu.events({
	'click .new-world': function(e){
		Session.set('currentWorld');
		if(typeof(editorObj) !== 'undefined'){ clearEditor(editorObj); };

		Meteor.call('newWorld', function(err, worldId){
			Session.set('currentWorld', worldId);
			Router.go('editor', {_id: worldId });
		});
	},
	
});

Template.homeMenu.helpers({
	'isPublic': function(){
		if(typeof(Session.get('currentWorld')) !== 'undefined'){
			return Worlds.findOne({_id:Session.get('currentWorld')}).published;
		}
	}
})