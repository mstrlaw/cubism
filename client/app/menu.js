Template.menu.events({
	'click .new-world': function(e){
		Session.set('currentWorld');
		clearEditor(editorObj);
		editorObj = init(document.body);
	},
	'click .delete-world': function(e){
		e.preventDefault();
		Meteor.call('deleteWorld', Session.get('currentWorld'), function(){
			Session.set('currentWorld');
		});
		clearEditor(editorObj);
		editorObj = init(document.body);
	},

	'click .load-world': function(e){
		var world = Worlds.findOne({ _id: e.currentTarget.id });
		
		Session.set('currentWorld', world._id);
		clearEditor(editorObj);
		editorObj = init(document.body, world.worldState);
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