Template.editor.onRendered(function(){
	/*
		'Autosave' hack
		For some reason can't get it to work with Meteor template events 
	*/
	if (Meteor.userId()){
		document.addEventListener('click', function(e){

			/*
				Only save if currentWorld exists and target className is 'scene' or 'shader' (the cubes)
				(avoids saving when clicking on menu or such i.e. when deleting)
			*/
			if(typeof(Session.get('currentWorld')) !== 'undefined' && (e.target.className === 'scene' || e.target.className === 'shader')){
				saveWorld(editorObj.editor, Session.get('currentWorld'));
			}
		});

		document.addEventListener('contextmenu', function(e){
			saveWorld(editorObj.editor, Session.get('currentWorld'));
		});
	}
});

Template.editor.helpers({
	'worldName': function(){
		var worldID = Session.get('currentWorld');
		if(typeof(worldID) !== 'undefined'){
			return Worlds.findOne({_id:worldID}).name;
		}
		else{
			return 'Untitled';
		}
	}
});