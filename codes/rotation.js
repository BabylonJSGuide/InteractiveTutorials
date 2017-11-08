var createScene = function() {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3( .5, .5, .5);
  
    // camera
    var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(5, 3, 0), scene);
    camera.setPosition(new BABYLON.Vector3(10.253, 5.82251, -9.45717));
    camera.attachControl(canvas, true);
    // lights
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
    light.intensity = 0.8;
   
    
    /************Creations of Blocks*********************************/
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
    
    var redBlock = blueBlock.clone("redBlock");
    redBlock.material = redMat;
    redBlock.position = new BABYLON.Vector3(4, 3, 4);
    
    /*****************Creation of Axes for Blocks***********************************************/
      
    var localOriginBlue = localAxes(1.5);
    var localOriginRed = localAxes(1.5);
  
    localOriginBlue.position = blueBlock.position;
      
    
    localOriginRed.position = redBlock.position;
    redBlock.setEnabled(false);
    
    localOriginBlue.setEnabled(false);
    localOriginRed.setEnabled(false);


    
        // GUI
      var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
      
      var container = new BABYLON.GUI.Rectangle();
      container.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
      container.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      container.width = 0.5;
      container.height = 0.25;
      container.cornerRadius = 10;
      container.color = "Orange";
      container.thickness = 4;
      container.background = "green";
      container.top = 5;
      container.left = 5;
      advancedTexture.addControl(container); 
      
      var teacher = BABYLON.GUI.Button.CreateImageOnlyButton("but", "teacher.png");
      teacher.width = 0.4;
      teacher.height = 0.8;
      teacher.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      teacher.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
      teacher.top = 2;
      teacher.left=2;
      teacher.color = "green";
      container.addControl(teacher);
  
      var textBlock = new BABYLON.GUI.TextBlock("text", "So you want to learn about rotating ehh!. Follow to the end and I will let you have examples.");
      textBlock.width = 0.55;
      textBlock.height = 0.7
      textBlock.textWrapping = true;
      textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      textBlock.paddingLeft = 2;
      textBlock.color = "white";
      textBlock.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
      textBlock.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      textBlock.left = "45%";
      textBlock.top = 5;
      container.addControl(textBlock);  
  
      var nextButton = BABYLON.GUI.Button.CreateSimpleButton("but1", "Next");
      nextButton.width = 0.2
      nextButton.height = 0.15;
      nextButton.color = "white";
      nextButton.cornerRadius = 5;
      nextButton.background = "black";
      nextButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
      nextButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      nextButton.left = "70%";
      nextButton.top = "80%";
      container.addControl(nextButton);
      
      var justStarted = true;
  
      //Selection Controls
          var addRadio = function(text, parent, group, func, checked) {
  
          checked = checked || false;
          var button = new BABYLON.GUI.RadioButton();
          button.width = "20px";
          button.height = "20px";
          button.color = "white";
          button.background = "green"; 
          button.group = group;
          button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  
          button.onIsCheckedChangedObservable.add(function(state) {		
              if (state && !justStarted) {
                  func();
              }
          }); 
  
          var header = BABYLON.GUI.Control.AddHeader(button, text, "80px", { isHorizontal: true, controlFirst: true });
          header.height = "30px";
  
          parent.addControl(header);    
          button.isChecked = checked; 
      }
      
      var spaceWorld = true;
      var frameRate = 20;
      
      var rotationX = new BABYLON.Animation("rotationX", "rotation.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      var rotationY = new BABYLON.Animation("rotationY", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      var rotationZ = new BABYLON.Animation("rotationZ", "rotation.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotationX_keys = [];
      
      rotationX_keys.push({
          frame: 0,
          value: 0
      });
  
      rotationX_keys.push({
          frame: 5 * frameRate,
          value: 0
      });
  
      rotationX_keys.push({
          frame: 7 * frameRate,
          value: Math.PI/2
      });
      
      rotationX.setKeys(rotationX_keys);
      
      var rotationY_keys = [];
      
      rotationY_keys.push({
          frame: 0,
          value: 0
      });
  
      rotationY_keys.push({
          frame: 5 * frameRate,
          value: 0
      });
  
      rotationY_keys.push({
          frame: 7 * frameRate,
          value: Math.PI/2
      });
      
      rotationY.setKeys(rotationY_keys);
      
      var rotationZ_keys = [];
      
      rotationZ_keys.push({
          frame: 0,
          value: 0
      });
  
      rotationZ_keys.push({
          frame: 5 * frameRate,
          value: 0
      });
  
      rotationZ_keys.push({
          frame: 7 * frameRate,
          value: Math.PI/2
      });
      
      rotationZ.setKeys(rotationZ_keys);
      
      var qXStart = new BABYLON.Quaternion.RotationAxis(BABYLON.Axis.X, 0); 
      var qXEnd = new BABYLON.Quaternion.RotationAxis(BABYLON.Axis.X, Math.PI/2);
      var qYStart = new BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, 0); 
      var qYEnd = new BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, Math.PI/2);
      var qZStart = new BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Z, 0); 
      var qZEnd = new BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Z, Math.PI/2);
      
      var qWorldXY = qYEnd.multiply(qXEnd);
      var qWorldXYZ = qZEnd.multiply(qWorldXY);
      var qLocalXY = qXEnd.multiply(qYEnd);
      var qLocalXYZ = qLocalXY.multiply(qZEnd);
      
      var qWorldXZ = qZEnd.multiply(qXEnd);
      var qWorldXZY = qYEnd.multiply(qWorldXZ);
      var qLocalXZ = qXEnd.multiply(qZEnd);
      var qLocalXZY = qLocalXZ.multiply(qYEnd);
      
      var qWorldYX = qXEnd.multiply(qYEnd);
      var qWorldYXZ = qZEnd.multiply(qWorldYX);
      var qLocalYX = qYEnd.multiply(qXEnd);
      var qLocalYXZ = qLocalYX.multiply(qZEnd);
      
      var qWorldYZ = qZEnd.multiply(qYEnd);
      var qWorldYZX = qXEnd.multiply(qWorldYZ);
      var qLocalYZ = qYEnd.multiply(qZEnd);
      var qLocalYZX = qLocalYZ.multiply(qXEnd);
      
      var qWorldZY = qYEnd.multiply(qZEnd);
      var qWorldZYX = qXEnd.multiply(qWorldZY);
      var qLocalZY = qZEnd.multiply(qYEnd);
      var qLocalZYX = qLocalZY.multiply(qXEnd);
      
      var qWorldZX = qXEnd.multiply(qZEnd);
      var qWorldZXY = qYEnd.multiply(qWorldZX);
      var qLocalZX = qZEnd.multiply(qXEnd);
      var qLocalZXY = qLocalZX.multiply(qYEnd);
      
      var rotationMsg = true;
      
      //_______________________XYZ Start___________________________________
      var rotateWorldXYZ = new BABYLON.Animation("rotateX", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotateWorldXYZ_keys = [];
      
      rotateWorldXYZ_keys.push({
          frame: 0,
          value: qXStart
      });
      
      rotateWorldXYZ_keys.push({
          frame: 1 * frameRate,
          value: qXStart
      });
      
      rotateWorldXYZ_keys.push({
          frame: 3 * frameRate,
          value: qXEnd
      });
  
      rotateWorldXYZ_keys.push({
          frame: 5 * frameRate,
          value: qWorldXY
      });
  
      rotateWorldXYZ_keys.push({
          frame: 7 * frameRate,
          value: qWorldXYZ
      });
      
      rotateWorldXYZ.setKeys(rotateWorldXYZ_keys);
      
      var rotateLocalXYZ = new BABYLON.Animation("rotateX", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotateLocalXYZ_keys = [];
      
      rotateLocalXYZ_keys.push({
          frame: 0,
          value: qXStart
      });
      
      rotateLocalXYZ_keys.push({
          frame: 1 * frameRate,
          value: qXStart
      });
      
      rotateLocalXYZ_keys.push({
          frame: 3 * frameRate,
          value: qXEnd
      });
  
      rotateLocalXYZ_keys.push({
          frame: 5 * frameRate,
          value: qLocalXY
      });
  
      rotateLocalXYZ_keys.push({
          frame: 7 * frameRate,
          value: qLocalXYZ
      });
      
      rotateLocalXYZ.setKeys(rotateLocalXYZ_keys);
      
      
      var XYZ = function() {
         editOn();
         var newLines = '    blueBlock.rotation.x = Math.PI/2;\r\n';
         newLines += '    blueBlock.rotation.y = Math.PI/2;\r\n';
         newLines += '    blueBlock.rotation.z = Math.PI/2;';
         changeEditorLines(newLines,[31, 33]);
         
          rotationMsg	= !rotationMsg;
          if(rotationMsg) {
              textBlock.text = "With .rotate the red block rotates in the given order."
          }
          else {
              textBlock.text = "With .rotation the blue block's orientaion is dependent only on the three angles and not the order given."
          }
          if(spaceWorld) {
              scene.beginDirectAnimation(blueBlock, [rotationX], 4 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationY], 2 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationZ], 0 * frameRate , 7 * frameRate, false);
              
              scene.beginDirectAnimation(redBlock, [rotateWorldXYZ], 0 * frameRate , 7 * frameRate, false);

              newLines = '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);';
              changeEditorLines(newLines,[35, 37]);
          }
          else {
              scene.beginDirectAnimation(blueBlock, [rotationY], 4 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationX], 2 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationZ], 0 * frameRate , 7 * frameRate, false);
              
              scene.beginDirectAnimation(redBlock, [rotateLocalXYZ], 0 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(localOriginRed, [rotateLocalXYZ], 0 * frameRate , 7 * frameRate, false);

              newLines = '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.LOCAL);';
              changeEditorLines(newLines,[35, 37]);
          }
          editOff();
      }
      //_______________________XYZ End___________________________________
      
      //_______________________YZX Start___________________________________
  var rotateWorldYZX = new BABYLON.Animation("rotateY", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotateWorldYZX_keys = [];
      
      rotateWorldYZX_keys.push({
          frame: 0,
          value: qYStart
      });
      
      rotateWorldYZX_keys.push({
          frame: 1 * frameRate,
          value: qYStart
      });
      
      rotateWorldYZX_keys.push({
          frame: 3 * frameRate,
          value: qYEnd
      });
  
      rotateWorldYZX_keys.push({
          frame: 5 * frameRate,
          value: qWorldYZ
      });
  
      rotateWorldYZX_keys.push({
          frame: 7 * frameRate,
          value: qWorldYZX
      });
      
      rotateWorldYZX.setKeys(rotateWorldYZX_keys);
      
      var rotateLocalYZX = new BABYLON.Animation("rotateY", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotateLocalYZX_keys = [];
      
      rotateLocalYZX_keys.push({
          frame: 0,
          value: qYStart
      });
      
      rotateLocalYZX_keys.push({
          frame: 1 * frameRate,
          value: qYStart
      });
      
      rotateLocalYZX_keys.push({
          frame: 3 * frameRate,
          value: qYEnd
      });
  
      rotateLocalYZX_keys.push({
          frame: 5 * frameRate,
          value: qLocalYZ
      });
  
      rotateLocalYZX_keys.push({
          frame: 7 * frameRate,
          value: qLocalYZX
      });
      
      rotateLocalYZX.setKeys(rotateLocalYZX_keys);
      
      
      var YZX = function() {
        editOn();
        var newLines = '    blueBlock.rotation.y = Math.PI/2;\r\n';
        newLines += '    blueBlock.rotation.z = Math.PI/2;\r\n';
        newLines += '    blueBlock.rotation.x = Math.PI/2;';
        changeEditorLines(newLines,[31, 33]);
        
          rotationMsg	= !rotationMsg;
          if(rotationMsg) {
              textBlock.text = "With .rotate the red block rotates in the given order."
          }
          else {
              textBlock.text = "With .rotation the blue block's orientaion is dependent only on the three angles and not the order given."
          }
          if(spaceWorld) {
              scene.beginDirectAnimation(blueBlock, [rotationY], 4 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationZ], 2 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationX], 0 * frameRate , 7 * frameRate, false);
              
              scene.beginDirectAnimation(redBlock, [rotateWorldYZX], 0 * frameRate , 7 * frameRate, false);

              newLines = '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);';
              changeEditorLines(newLines,[35, 37]);
          }
          else {
              scene.beginDirectAnimation(blueBlock, [rotationZ], 4 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationY], 2 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationX], 0 * frameRate , 7 * frameRate, false);
              
              scene.beginDirectAnimation(redBlock, [rotateLocalYZX], 0 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(localOriginRed, [rotateLocalYZX], 0 * frameRate , 7 * frameRate, false);

              newLines = '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.LOCAL);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);';
              changeEditorLines(newLines,[35, 37]);              
          }
          editOff();
      }
      
      //______________YZX END_____________________________________________________________
      
      //_______________________YZX Start___________________________________
  var rotateWorldYXZ = new BABYLON.Animation("rotateY", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotateWorldYXZ_keys = [];
      
      rotateWorldYXZ_keys.push({
          frame: 0,
          value: qYStart
      });
      
      rotateWorldYXZ_keys.push({
          frame: 1 * frameRate,
          value: qYStart
      });
      
      rotateWorldYXZ_keys.push({
          frame: 3 * frameRate,
          value: qYEnd
      });
  
      rotateWorldYXZ_keys.push({
          frame: 5 * frameRate,
          value: qWorldYX
      });
  
      rotateWorldYXZ_keys.push({
          frame: 7 * frameRate,
          value: qWorldYXZ
      });
      
      rotateWorldYXZ.setKeys(rotateWorldYXZ_keys);
      
      var rotateLocalYXZ = new BABYLON.Animation("rotateY", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotateLocalYXZ_keys = [];
      
      rotateLocalYXZ_keys.push({
          frame: 0,
          value: qYStart
      });
      
      rotateLocalYXZ_keys.push({
          frame: 1 * frameRate,
          value: qYStart
      });
      
      rotateLocalYXZ_keys.push({
          frame: 3 * frameRate,
          value: qYEnd
      });
  
      rotateLocalYXZ_keys.push({
          frame: 5 * frameRate,
          value: qLocalYX
      });
  
      rotateLocalYXZ_keys.push({
          frame: 7 * frameRate,
          value: qLocalYXZ
      });
      
      rotateLocalYXZ.setKeys(rotateLocalYXZ_keys);
      
      
      var YXZ = function() {
        editOn();
        var newLines = '    blueBlock.rotation.y = Math.PI/2;\r\n';
        newLines += '    blueBlock.rotation.x = Math.PI/2;\r\n';
        newLines += '    blueBlock.rotation.z = Math.PI/2;';
        changeEditorLines(newLines,[31, 33]);
        	
          rotationMsg	= !rotationMsg;
          if(rotationMsg) {
              textBlock.text = "With .rotate the red block rotates in the given order."
          }
          else {
              textBlock.text = "With .rotation the blue block's orientaion is dependent only on the three angles and not the order given."
          }
          if(spaceWorld) {
              scene.beginDirectAnimation(blueBlock, [rotationY], 4 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationX], 2 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationZ], 0 * frameRate , 7 * frameRate, false);
              
              scene.beginDirectAnimation(redBlock, [rotateWorldYXZ], 0 * frameRate , 7 * frameRate, false);

              newLines = '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);';
              changeEditorLines(newLines,[35, 37]);
          }
          else {
              scene.beginDirectAnimation(blueBlock, [rotationX], 4 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationY], 2 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationZ], 0 * frameRate , 7 * frameRate, false);
              
              scene.beginDirectAnimation(redBlock, [rotateLocalYXZ], 0 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(localOriginRed, [rotateLocalYXZ], 0 * frameRate , 7 * frameRate, false);

              newLines = '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.LOCAL);';
              changeEditorLines(newLines,[35, 37]);
  
          }
          editOn();
      }
      
      //______________YZX END_____________________________________________________________
      
      //_______________________ZYX Start___________________________________
  var rotateWorldZYX = new BABYLON.Animation("rotateZ", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotateWorldZYX_keys = [];
      
      rotateWorldZYX_keys.push({
          frame: 0,
          value: qZStart
      });
      
      rotateWorldZYX_keys.push({
          frame: 1 * frameRate,
          value: qZStart
      });
      
      rotateWorldZYX_keys.push({
          frame: 3 * frameRate,
          value: qZEnd
      });
  
      rotateWorldZYX_keys.push({
          frame: 5 * frameRate,
          value: qWorldZY
      });
  
      rotateWorldZYX_keys.push({
          frame: 7 * frameRate,
          value: qWorldZYX
      });
      
      rotateWorldZYX.setKeys(rotateWorldZYX_keys);
      
      var rotateLocalZYX = new BABYLON.Animation("rotateZ", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotateLocalZYX_keys = [];
      
      rotateLocalZYX_keys.push({
          frame: 0,
          value: qZStart
      });
      
      rotateLocalZYX_keys.push({
          frame: 1 * frameRate,
          value: qZStart
      });
      
      rotateLocalZYX_keys.push({
          frame: 3 * frameRate,
          value: qZEnd
      });
  
      rotateLocalZYX_keys.push({
          frame: 5 * frameRate,
          value: qLocalZY
      });
  
      rotateLocalZYX_keys.push({
      
      frame: 7 * frameRate,
          value: qLocalZYX
      });
      
      rotateLocalZYX.setKeys(rotateLocalZYX_keys);
      
      
      var ZYX = function() {
        editOn();
        var newLines = '    blueBlock.rotation.z = Math.PI/2;\r\n';
        newLines += '    blueBlock.rotation.y = Math.PI/2;\r\n';
        newLines += '    blueBlock.rotation.x = Math.PI/2;';
        changeEditorLines(newLines,[31, 33]);	
          rotationMsg	= !rotationMsg;
          if(rotationMsg) {
              textBlock.text = "With .rotate the red block rotates in the given order."
          }
          else {
              textBlock.text = "With .rotation the blue block's orientaion is dependent only on the three angles and not the order given."
          }
          if(spaceWorld) {
              scene.beginDirectAnimation(blueBlock, [rotationZ], 4 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationY], 2 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationX], 0 * frameRate , 7 * frameRate, false);
              
              scene.beginDirectAnimation(redBlock, [rotateWorldZYX], 0 * frameRate , 7 * frameRate, false);

              newLines = '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);';
              changeEditorLines(newLines,[35, 37]);
          }
          else {
              scene.beginDirectAnimation(blueBlock, [rotationY], 4 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationZ], 2 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationX], 0 * frameRate , 7 * frameRate, false);
              
              scene.beginDirectAnimation(redBlock, [rotateLocalZYX], 0 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(localOriginRed, [rotateLocalZYX], 0 * frameRate , 7 * frameRate, false);
  
              newLines = '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.LOCAL);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);';
              changeEditorLines(newLines,[35, 37]);
          }
          editOff();
      }
      
      //______________ZYX END_____________________________________________________________
      
      //_______________________ZXY Start___________________________________
  var rotateWorldZXY = new BABYLON.Animation("rotateZ", "rotationQuaternion", frameRate,  BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotateWorldZXY_keys = [];
      
      rotateWorldZXY_keys.push({
          frame: 0,
          value: qZStart
      });
  
      rotateWorldZXY_keys.push({
          frame: 1 * frameRate,
          value: qZStart
      });
      
      rotateWorldZXY_keys.push({
          frame: 3 * frameRate,
          value: qZEnd
      });
  
      rotateWorldZXY_keys.push({
          frame: 5 * frameRate,
          value: qWorldZX
      });
  
      rotateWorldZXY_keys.push({
          frame: 7 * frameRate,
          value: qWorldZXY
      });
      
      rotateWorldZXY.setKeys(rotateWorldZXY_keys);
      
      var rotateLocalZXY = new BABYLON.Animation("rotateZ", "rotationQuaternion", frameRate,  BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotateLocalZXY_keys = [];
      
      rotateLocalZXY_keys.push({
          frame: 0,
          value: qZStart
      });
      
      rotateLocalZXY_keys.push({
          frame: 1 * frameRate,
          value: qZStart
      });
      
      rotateLocalZXY_keys.push({
          frame: 3 * frameRate,
          value: qZEnd
      });
  
      rotateLocalZXY_keys.push({
          frame: 5 * frameRate,
          value: qLocalZX
      });
  
      rotateLocalZXY_keys.push({
          frame: 7 * frameRate,
          value: qLocalZXY
      });
      
      rotateLocalZXY.setKeys(rotateLocalZXY_keys);
      
      
      var ZXY = function() {
        editOn();
        var newLines = '    blueBlock.rotation.z = Math.PI/2;\r\n';
        newLines += '    blueBlock.rotation.x = Math.PI/2;\r\n';
        newLines += '    blueBlock.rotation.y = Math.PI/2;';
        changeEditorLines(newLines,[31, 33]);	
          rotationMsg	= !rotationMsg;
          if(rotationMsg) {
              textBlock.text = "With .rotate the red block rotates in the given order."
          }
          else {
              textBlock.text = "With .rotation the blue block's orientaion is dependent only on the three angles and not the order given."
          }
          if(spaceWorld) {
              scene.beginDirectAnimation(blueBlock, [rotationZ], 4 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationX], 2 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationY], 0 * frameRate , 7 * frameRate, false);
              
              scene.beginDirectAnimation(redBlock, [rotateWorldZXY], 0 * frameRate , 7 * frameRate, false);

              newLines = '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);';
              changeEditorLines(newLines,[35, 37]);
          }
          else {
              scene.beginDirectAnimation(blueBlock, [rotationX], 4 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationZ], 2 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationY], 0 * frameRate , 7 * frameRate, false);
              
              scene.beginDirectAnimation(redBlock, [rotateLocalZXY], 0 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(localOriginRed, [rotateLocalZXY], 0 * frameRate , 7 * frameRate, false);

              newLines = '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.LOCAL);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);';
              changeEditorLines(newLines,[35, 37]);  
              
          }
          editOff();
      }
      
      //______________ZXY END_____________________________________________________________
      
      //_______________________XZY Start___________________________________
  var rotateWorldXZY = new BABYLON.Animation("rotateX", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotateWorldXZY_keys = [];
      
      rotateWorldXZY_keys.push({
          frame: 0,
          value: qXStart
      });
      
      rotateWorldXZY_keys.push({
          frame: 1 * frameRate,
          value: qXStart
      });
      
      rotateWorldXZY_keys.push({
          frame: 3 * frameRate,
          value: qXEnd
      });
  
      rotateWorldXZY_keys.push({
          frame: 5 * frameRate,
          value: qWorldXZ
      });
  
      rotateWorldXZY_keys.push({
          frame: 7 * frameRate,
          value: qWorldXZY
      });
      
      rotateWorldXZY.setKeys(rotateWorldXZY_keys);
      
      var rotateLocalXZY = new BABYLON.Animation("rotateX", "rotationQuaternion", frameRate, BABYLON.Animation.ANIMATIONTYPE_QUATERNION, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      
      var rotateLocalXZY_keys = [];
      
      rotateLocalXZY_keys.push({
          frame: 0,
          value: qXStart
      });
      
      rotateLocalXZY_keys.push({
          frame: 1 * frameRate,
          value: qXStart
      });
      
      rotateLocalXZY_keys.push({
          frame: 3 * frameRate,
          value: qXEnd
      });
  
      rotateLocalXZY_keys.push({
          frame: 5 * frameRate,
          value: qLocalXZ
      });
  
      rotateLocalXZY_keys.push({
          frame: 7 * frameRate,
          value: qLocalXZY
      });
      
      rotateLocalXZY.setKeys(rotateLocalXZY_keys);
      
      
      var XZY = function() {
        editOn();
        var newLines = '    blueBlock.rotation.x = Math.PI/2;\r\n';
        newLines += '    blueBlock.rotation.z = Math.PI/2;\r\n';
        newLines += '    blueBlock.rotation.y = Math.PI/2;';
        changeEditorLines(newLines,[31, 33]);	
          rotationMsg	= !rotationMsg;
          if(rotationMsg) {
              textBlock.text = "With .rotate the red block rotates in the given order."
          }
          else {
              textBlock.text = "With .rotation the blue block's orientaion is dependent only on the three angles and not the order given."
          }
          if(spaceWorld) {
              scene.beginDirectAnimation(blueBlock, [rotationX], 4 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationZ], 2 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationY], 0 * frameRate , 7 * frameRate, false);
              
              scene.beginDirectAnimation(redBlock, [rotateWorldXZY], 0 * frameRate , 7 * frameRate, false);

              newLines = '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);';
              changeEditorLines(newLines,[35, 37]);
          }
          else {
              scene.beginDirectAnimation(blueBlock, [rotationZ], 4 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationX], 2 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(blueBlock, [rotationY], 0 * frameRate , 7 * frameRate, false);
              
              scene.beginDirectAnimation(redBlock, [rotateLocalXZY], 0 * frameRate , 7 * frameRate, false);
              scene.beginDirectAnimation(localOriginRed, [rotateLocalXZY], 0 * frameRate , 7 * frameRate, false);
  
              newLines = '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.LOCAL);\r\n';
              newLines += '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);';
              changeEditorLines(newLines,[35, 37]);
          }
          editOff();
      }
      
      //______________XZY END_____________________________________________________________
      
      var localSpace = function() {
          spaceWorld = false;
          localOriginRed.rotationQuaternion = qXStart.multiply(qYStart).multiply(qZStart);
          blueBlock.rotation = BABYLON.Vector3.Zero();
          redBlock.rotationQuaternion = qXStart.multiply(qYStart).multiply(qZStart);
          textBlock.text = "The rotation axes are LOCAL to the block and move with it."
      }
      
      var worldSpace = function() {
          spaceWorld = true;
          localOriginRed.rotationQuaternion = qXStart.multiply(qYStart).multiply(qZStart);
          blueBlock.rotation = BABYLON.Vector3.Zero();
          redBlock.rotationQuaternion = qXStart.multiply(qYStart).multiply(qZStart);
          textBlock.text = "The rotation axes are fixed and parallel to the WORLD axes."
      }
      
      
      var selectContainer = new BABYLON.GUI.Rectangle();
      selectContainer.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
      selectContainer.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
      selectContainer.width = 0.15;
      selectContainer.height = 0.45;
      selectContainer.cornerRadius = 10;
      selectContainer.color = "Orange";
      selectContainer.thickness = 4;
      selectContainer.background = "green";
      selectContainer.top = -5;
      selectContainer.left = -5;
      advancedTexture.addControl(selectContainer);
      
      var panel = new BABYLON.GUI.StackPanel(); 
      panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
      panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      panel.top = 5;
      panel.left = 5;
      selectContainer.addControl(panel);
      
      var orderHeading = new BABYLON.GUI.TextBlock("orderHead", "Order");
      orderHeading.width = 0.9;
      orderHeading.height = 0.1
      orderHeading.textWrapping = true;
      orderHeading.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
      orderHeading.paddingLeft = 2;
      panel.addControl(orderHeading); 
      
      addRadio("XYZ", panel, "order", XYZ, true);
      addRadio("YXZ", panel, "order", YXZ);
      addRadio("YZX", panel, "order", YZX);
      addRadio("ZYX", panel, "order", ZYX);
      addRadio("ZXY", panel, "order", ZXY);
      addRadio("XZY", panel, "order", XZY);
      
      var separator = new BABYLON.GUI.Rectangle();
      separator.width = 0.9;
      separator.height = 0.02;
      separator.background = "orange";
      separator.color = "orange";
      panel.addControl(separator);
      
      var spaceHeading = new BABYLON.GUI.TextBlock("spaceHead", "Space");
      spaceHeading.width = 0.9;
      spaceHeading.height = 0.1
      spaceHeading.textWrapping = true;
      spaceHeading.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
      spaceHeading.paddingLeft = 2;
      panel.addControl(spaceHeading);
      
      addRadio("WORLD", panel, "space", worldSpace, true);
      addRadio("LOCAL", panel, "space", localSpace);
      
      selectContainer.isVisible = false;
      
      //TUTORIAL CONTROL
      //functions
      var nextAction = function(index) {          
          switch(index) {
              case 1:
                  justStarted = false;
                  updateEditorLines([19, 25]);
              break
              case 2:
                  redBlock.setEnabled(true);
                  editOn();
                  var newLines = '\r\n    redBlock = blueBlock.clone("redBlock");\r\n';
                  newLines += '    redBlock.material = redMat;\r\n';
                  newLines += '    redBlock.position = new BABYLON.Vector3(4, 3, 4);\r\n';
                  clearEditorLines([19, 25]);
                  changeEditorLines(newLines,[26, 26]);
                  updateEditorLines([27, 29]);
                  clearEditorLines([19, 25]);
                  editOff();
              break
              case 3:
                  axisX.setEnabled(true);
                  xChar.setEnabled(true);
                  axisY.setEnabled(true);
                  yChar.setEnabled(true);
                  axisZ.setEnabled(true);
                  zChar.setEnabled(true);
                  //localOriginBlue.setEnabled(true);
                  localOriginRed.setEnabled(true);
              break
              case 4:
                    editOn();
                    var newLines = '\r\n    blueBlock.rotation.x = Math.PI/2;\r\n';
                    newLines += '    blueBlock.rotation.y = Math.PI/2;\r\n';
                    newLines += '    blueBlock.rotation.z = Math.PI/2;\r\n';
                    newLines += '\r\n';
                    newLines += '    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);\r\n';
                    newLines += '    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);\r\n';
                    newLines += '    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);\r\n';
                    clearEditorLines([27, 29]);
                    changeEditorLines(newLines,[30, 30]);
                    updateEditorLines([31, 33, 35, 37]);
                    editOff();
                    blueBlock.rotation = new BABYLON.Vector3(Math.PI/2, Math.PI/2, Math.PI/2);
                    redBlock.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
                    redBlock.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
                    redBlock.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
              break
              case 9:
                  selectContainer.isVisible = true;
                  nextButton.isVisible = false;
              break
          }
      }
  
      nextButton.onPointerUpObservable.add(function() {
          tutorIndex++;
          textBlock.text = tutorTexts[tutorIndex];
          nextAction(tutorIndex);
      });
  
      //XYZ();
      
      //text
      var tutorIndex = 0;
      
      var tutorTexts = new Array();
      
      tutorTexts = [
          "So you want to learn about rotating ehh!. Follow to the end and I will let you have examples.",
          "Let's use this asymmetric mesh, a Pak'ma'ra office block, to show what's going on. Keep checking the code on the left.",
          "Two ways for rotating are .rotation and .rotate, throw in a second block for good measure.",
          "Now to help you the Minbari technicians will throw in some axes behind the scenes. You wont see this code.",
          "As you can see the code for rotating has now been added, the blue block with .rotation and the red block with .rotate .",
          "Notice that the orientations of the blocks are different even though the order of axes, X, Y, Z is the same.",
          "Euler angles are used with .rotation which produced a fixed orientation whatever order is given.",
          "Order is important with .rotate as well as setting WORLD or LOCAL space. Examples coming up soon.",
          "For the examples you can choose the order of rotation about XYZ axes and in WORLD or LOCAL space.",
          "The backroom Minbari technicians will slow down the rotations so you can see them happening. Now make your choices."
          
      ]
      
      
      
      
  
    // show axis
    var axisX, axisY, axisZ;
    var xChar, yChar, zChar;
    
    var showAxis = function(size) {
      var makeTextPlane = function(text, color, size) {
      var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
      dynamicTexture.hasAlpha = true;
      dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
      var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
      plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
      plane.material.backFaceCulling = false;
      plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
      plane.material.diffuseTexture = dynamicTexture;
      return plane;
       };
    
      axisX = BABYLON.Mesh.CreateLines("axisX", [ 
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
        ], scene);
      axisX.color = new BABYLON.Color3(1, 0, 0);
      xChar = makeTextPlane("X", "red", size / 10);
      axisX.setEnabled(false);
      xChar.setEnabled(false);
      xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
      axisY = BABYLON.Mesh.CreateLines("axisY", [
          new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
          new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
          ], scene);
      axisY.color = new BABYLON.Color3(0, 1, 0);
      yChar = makeTextPlane("Y", "green", size / 10);
      axisY.setEnabled(false);
      yChar.setEnabled(false);
      yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
      axisZ = BABYLON.Mesh.CreateLines("axisZ", [
          new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
          new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
          ], scene);
      axisZ.color = new BABYLON.Color3(0, 0, 1);
      zChar = makeTextPlane("Z", "blue", size / 10);
      zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
      axisZ.setEnabled(false);
      zChar.setEnabled(false);
  };
    
    //Local Axes
    function localAxes(size) {
        var pilot_local_axisX = BABYLON.Mesh.CreateLines("pilot_local_axisX", [ 
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
        ], scene);
      pilot_local_axisX.color = new BABYLON.Color3(1, 0, 0);
  
      pilot_local_axisY = BABYLON.Mesh.CreateLines("pilot_local_axisY", [
          new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
          new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
      ], scene);
      pilot_local_axisY.color = new BABYLON.Color3(0, 1, 0);
  
      var pilot_local_axisZ = BABYLON.Mesh.CreateLines("pilot_local_axisZ", [
          new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
          new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
          ], scene);
      pilot_local_axisZ.color = new BABYLON.Color3(0, 0, 1);
  
      var local_origin = BABYLON.MeshBuilder.CreateBox("local_origin", {size:1}, scene);
      local_origin.isVisible = false;
      
      pilot_local_axisX.parent = local_origin;
        pilot_local_axisY.parent = local_origin;
        pilot_local_axisZ.parent = local_origin; 
        
      return local_origin;
      
    }
      
    showAxis(8);
    
    return scene;
  };