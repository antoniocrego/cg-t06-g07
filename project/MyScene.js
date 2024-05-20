import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyGarden } from "./MyGarden.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyBee } from "./MyBee.js";
import { MyHive } from "./MyHive.js";
import { MyGrassBlade } from "./MyGrassBlade.js";
import { MyGrass } from "./MyGrass.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.garden = new MyGarden(this);
    this.gray = new CGFappearance(this);
    this.gray.setAmbient(0.3, 0.3, 0.3, 1);
    this.gray.setDiffuse(0.3, 0.3, 0.3, 1);
    this.gray.setSpecular(0.3, 0.3, 0.3, 1);
    this.gray.setShininess(3.0);
    this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg");
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.rock = new MyRock(this, 6, 6, 4);
    this.rockSet = new MyRockSet(this,10);
    this.bee = new MyBee(this, -7.7, 7, -7.7, [0,0],this.hive);
    this.hive = new MyHive(this);
    this.grass = new MyGrassBlade(this, 5, 4);
    this.grasses = new MyGrass(this, 40, 40);

    // animation
    this.setUpdatePeriod(50);
    this.appStartTime=Date.now();

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;
    this.displayBee = false;
    this.displayGarden = false;
    this.displayRockset = false;
    this.displayGrass = true;
    this.columns = 5;
    this.rows = 5;
    this.speedFactor = 1;
    this.scaleFactor = 0.5;

    this.enableTextures(true);

    this.terrain = new CGFtexture(this, "images/terrain.jpg");
    this.terrain_appearance = new CGFappearance(this);
    this.terrain_appearance.setTexture(this.terrain);
    this.terrain_appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.earth = new CGFtexture(this, "images/panorama4.jpg");
    this.earth_appearance = new CGFappearance(this);
    this.earth_appearance.setTexture(this.earth);
    this.earth_appearance.setTextureWrap('REPEAT', 'REPEAT');
    this.leaftexture = new CGFtexture(this, "images/leaf3.jpg");
    this.leaf_appearance = new CGFappearance(this);
    this.leaf_appearance.setTexture(this.leaftexture);
    this.leaf_appearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.grassTexture = new CGFtexture(this, "images/grass.jpg");
    this.grass_appearance = new CGFappearance(this);
    this.grass_appearance.setTexture(this.grassTexture);
    this.grass_appearance.setTextureWrap('REPEAT', 'REPEAT');


    this.rockTexture = new CGFtexture(this, "images/rock.jpg");
    this.rockAppearance = new CGFappearance(this);
    this.rockAppearance.setTexture(this.rockTexture);
    this.rockAppearance.setTextureWrap('REPEAT', 'REPEAT');
  }
  /*
  checkKeys() {
    var text="Keys pressed: ";
    var keysPressedF=false;
    var keysPressedS=false;
    var anyKeyPressed=false;
    var beeSpeed = 0;
    var beeRotation = 0;
    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            beeSpeed+=0.1;
            keysPressedF=true;
            anyKeyPressed=true;
    }
    if (this.gui.isKeyPressed("KeyS")){
            text+=" S ";
            beeSpeed-=0.2;
            keysPressedF=true;
            anyKeyPressed=true;
    }
    if (this.gui.isKeyPressed("KeyA")){
            text+=" A ";
            beeRotation+=Math.PI/16.0;
            keysPressedS=true;
            anyKeyPressed=true;
    }
    if (this.gui.isKeyPressed("KeyD")){
            text+=" D ";
            beeRotation-=Math.PI/16.0;
            keysPressedS=true;
            anyKeyPressed=true;
    }
    if (this.gui.isKeyPressed("KeyR")){
            text+=" R ";
            this.bee.reset();
            anyKeyPressed=true;
    }
    if (this.gui.isKeyPressed("KeyF")){
            text+=" F ";
            var xDist = Math.abs(this.bee.x%10);
            var zDist = Math.abs(this.bee.z%10);
            if ((zDist > 8 || zDist < 2) && (xDist > 8 || xDist < 2)){
              var column = 0;
              var row = 0;
              if (this.bee.z < 0 && this.bee.z > -2) row = 0;
              else row = zDist < 2 ? Math.floor((this.bee.z)/10) : Math.ceil((this.bee.z)/10)
              if (this.bee.x < 0 && this.bee.x > -2) column = 0;
              else column = xDist < 2 ? Math.floor((this.bee.x)/10) : Math.ceil((this.bee.x)/10)
              if (column >= 0 && column < this.columns && row >= 0 && row < this.rows) {
                var flower = this.garden.flowers[column*10+row];
                if (column >= 0 && column < 10 && row >= 0 && row < 10) {
                  var flower = this.garden.flowers[column * 10 + row];
                  if (flower == null) {
                      console.log("No flower found at: " + column + ", " + row);
                  } else {
                      console.log("Flower found at: " + column + ", "+ row);
                      this.bee.descend(flower);
                  }
                }
              }
              else {
                  console.log("Calculated column or row is out of bounds: " + column + ", " + row);
              }
            }
            else{
              console.log("Bee is not close enough to a flower!");
            }
            anyKeyPressed=true;
    }
    if (this.gui.isKeyPressed("KeyP")){
            text+=" P ";
            this.bee.ascend();  
            anyKeyPressed=true;
    }
    if (this.gui.isKeyPressed("KeyO")){
            text+=" O ";
            this.bee.deliver();
            anyKeyPressed=true;
    }
    if (keysPressedF){
      this.bee.accelerate(beeSpeed*this.speedFactor);
    }
    else{
      this.bee.deaccelerate(Math.sqrt(this.bee.speed[0]**2 + this.bee.speed[1]**2)/5);
    }
    if (keysPressedS){
      this.bee.turn(beeRotation*this.speedFactor);
    }
    if (anyKeyPressed){
      console.log(text);
    }
  }
  */
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.5,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  /*
  update(t)
  {
      var timeSinceAppStart=(t-this.appStartTime)/1000.0;

      this.checkKeys();

      this.bee.update(timeSinceAppStart);

      this.panorama.update(timeSinceAppStart);
    }
  */
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.terrain_appearance.apply();
    //this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.pushMatrix();
    //this.earth_appearance.apply();

    //this.sphere.display();

    this.popMatrix();

    this.pushMatrix();

    if (this.displayGarden) this.garden.display(this.rows, this.columns);
    
    this.popMatrix();

    this.pushMatrix();

    //this.translate(0,4,-10);

    /*
    this.gray.apply();

    if (this.displayBee) this.bee.display(this.scaleFactor);
    */

    this.popMatrix();

    this.pushMatrix();

    this.rockAppearance.apply();

    //this.translate(-14.5,0,-14.5);

    if(this.displayRockset) this.rockSet.display();

    this.translate(0, 20, 0);

    this.rock.display();

    /*
    this.translate(6.5,3.5,6.5);

    this.hive.display();
    */

    this.popMatrix();

    this.pushMatrix();

    this.grass_appearance.apply();

    if(this.displayGrass) this.grasses.display();

    this.popMatrix();
    
    this.translate(0, 80, 0);

    this.panorama.display();

    if (this.displayNormals)
            this.garden.enableNormalViz();
        else
            this.garden.disableNormalViz();

    //

    // ---- END Primitive drawing section
  }
}
