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