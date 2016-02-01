init = function(element, lastWorld) {
    var PI          = Math.PI;
    var scene       = new voxelcss.Scene();
    var lightSource = new voxelcss.LightSource(300, 300, 300, 750, 0.3, 1);
    var world       = new voxelcss.World(scene);
    var editor      = new voxelcss.Editor(world);

    scene.rotate(-PI / 8, PI / 4, 0);
    scene.attach(element);
    scene.addLightSource(lightSource);

    //editor.enableAutoSave();
    editor.deleteSave();
    editor.load();
    
    if(typeof(lastWorld) === 'undefined'){
        editor.add(new voxelcss.Voxel(0, 0, 0, 100, {
            mesh: voxelcss.Meshes.grass
        }));
    }
    else{
        editor.import(lastWorld);
    }

    return {
        'editor':editor,
        'scene':scene
    };
};

saveWorld = function(editor, currentWorld){
    Meteor.call('saveWorld', editor.getWorld().export(), currentWorld, function(err, data){
        Session.set('currentWorld', data);
    });
};

clearEditor = function(editorObj){
    if(typeof(editorObj) !== 'undefined'){

        editorObj.editor.deleteSave();
        try{ editorObj.scene.detach(document.body); }
        catch(err){};
        editorObj.scene.attach(document.body);
        editorObj.editor.load();

        //editorObj = undefined;
    }
};