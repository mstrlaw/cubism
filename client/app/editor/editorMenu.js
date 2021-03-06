Template.editorMenu.events({
	'click .delete-world': function(e){
		e.preventDefault();
		Meteor.call('deleteWorld', Session.get('currentWorld'), function(){
			Session.set('currentWorld');
			Router.go('home');
		});

	},
	'click .publish-world': function(e){
		Meteor.call('publishWorld', Session.get('currentWorld'));
	},
	'click .unpublish-world': function(e){
		Meteor.call('unpublishWorld', Session.get('currentWorld'));
	},
	'click .mesh-dropdown a': function(e){
		switch(e.currentTarget.className){
			case 'dirt':
				editorObj.editor.setToolMesh(voxelcss.Meshes.dirt);
				break;
			case 'grass':
				editorObj.editor.setToolMesh(voxelcss.Meshes.grass);
				break;
			case 'water':
				editorObj.editor.setToolMesh(voxelcss.Meshes.water);
				break;
			case 'waterfall':
				editorObj.editor.setToolMesh(voxelcss.Meshes.waterFall);
				break;
			case 'waterfall-top':
				editorObj.editor.setToolMesh(voxelcss.Meshes.waterFallTop);
				break;
			case 'waterfall-crash':
				editorObj.editor.setToolMesh(voxelcss.Meshes.waterFallCrash);
				break;
			case 'tree':
				editorObj.editor.setToolMesh(voxelcss.Meshes.treeTrunk);
				break;
			case 'leaves':
				editorObj.editor.setToolMesh(voxelcss.Meshes.treeLeaves);
				break;
			default:
				editorObj.editor.setToolMesh(voxelcss.Meshes.grass);
				
		}
	}
});

Template.editorMenu.helpers({
	'isPublic': function(){
		if(typeof(Session.get('currentWorld')) !== 'undefined'){
			return Worlds.findOne({_id:Session.get('currentWorld')}).published;
		}
	}
})