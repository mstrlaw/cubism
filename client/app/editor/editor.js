Template.editor.onRendered(function(){
	/*
		'Autosave' hack
		For some reason can't get it to work with Meteor template events 
		Only save if currentWorld exists and target className is 'shader' (i.e. click on the cubes)
		(avoids saving when clicking on menu or such i.e. when deleting)
	*/
	if (Meteor.userId()){
		document.addEventListener('click', function(e){
			if(typeof(Session.get('currentWorld')) !== 'undefined' && e.target.className === 'shader'){
				saveWorld(editorObj.editor, Session.get('currentWorld'));
			}
		});

		document.addEventListener('contextmenu', function(e){
			if(typeof(Session.get('currentWorld')) !== 'undefined' && e.target.className === 'shader'){
				saveWorld(editorObj.editor, Session.get('currentWorld'));
			}
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

Template.editor.events({
	'click .edit-icon': function(e){
		$('#worldName').focus();
	},
	'focus #worldName': function(e){
		var content = e.currentTarget.innerHTML;
	    e.currentTarget.setAttribute('data-content', content);
	},
	'blur #worldName': function(e){
		var content = e.currentTarget.innerHTML;
		
		if(e.currentTarget.getAttribute('data-content') != content){
		    e.currentTarget.innerHTML = '';
		    Meteor.call('saveName', content, Session.get('currentWorld'), function(err, data){
		        // if(!err){
		        //     Materialize.toast('Brief saved.', 4000, 'green');
		        // }
		        // else{
		        //     Materialize.toast('Error saving project.', 4000, 'red');
		        // }
		    });
		};
	}
})