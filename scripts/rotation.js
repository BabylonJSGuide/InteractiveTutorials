var createScene = function() {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3( .5, .5, .5);
  
    var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(5, 3, 0), scene);
    camera.setPosition(new BABYLON.Vector3(10.253, 5.82251, -9.45717));
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
    light.intensity = 0.8;
   
    var blueMat = new BABYLON.StandardMaterial("blue", scene);
    blueMat.emissiveColor = new BABYLON.Color3(0,0,1);
    
    var redMat = new BABYLON.StandardMaterial("red", scene);
    redMat.emissiveColor = new BABYLON.Color3(1,0,0);
    
   
    var body = BABYLON.MeshBuilder.CreateCylinder("body", { height: 0.75, diameterTop: 0.2, diameterBottom: 0.5, tessellation: 6, subdivisions: 1 }, scene);
    var arm = BABYLON.MeshBuilder.CreateBox("arm", { height: 0.75, width: 0.3, depth: 0.1875 }, scene);
    arm.position.x = 0.125;
    
    var blueBlock = BABYLON.Mesh.MergeMeshes([body, arm], true);
    blueBlock.position = new BABYLON.Vector3(1, 3, 4);
    blueBlock.material = blueMat;
    
    return scene;
  };