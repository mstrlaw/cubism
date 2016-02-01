Template.menu.events({
	'click .new-world': function(e){
		Session.set('currentWorld');
		if(typeof(editorObj) !== 'undefined'){ clearEditor(editorObj); };

		Meteor.call('newWorld', function(err, worldId){
			Session.set('currentWorld', worldId);
			Router.go('editor', {_id: worldId });
		});
	},
	'click .delete-world': function(e){
		e.preventDefault();
		Meteor.call('deleteWorld', Session.get('currentWorld'), function(){
			Router.go('home');
		});

	},
	'click .publish-world': function(e){
		Meteor.call('publishWorld', Session.get('currentWorld'));
	},
	'click .unpublish-world': function(e){
		Meteor.call('unpublishWorld', Session.get('currentWorld'));
	}

});

Template.menu.helpers({
	'isPublic': function(){
		if(typeof(Session.get('currentWorld')) !== 'undefined'){
			return Worlds.findOne({_id:Session.get('currentWorld')}).published;
		}
	}
})