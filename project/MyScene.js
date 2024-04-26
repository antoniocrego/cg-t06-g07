import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyFlower } from "./MyFlower.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";

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
    this.red = new CGFappearance(this);
    this.red.setAmbient(1, 0, 0, 1);
    this.red.setDiffuse(1, 0, 0, 1);
    this.red.setSpecular(1, 0, 0, 1);
    this.red.setShininess(10.0);
    this.green = new CGFappearance(this);
    this.green.setAmbient(0, 1, 0, 1);
    this.green.setDiffuse(0, 1, 0, 1);
    this.green.setSpecular(0, 1, 0, 1);
    this.green.setShininess(10.0);
    this.yellow = new CGFappearance(this);
    this.yellow.setAmbient(1, 1, 0, 1);
    this.yellow.setDiffuse(1, 1, 0, 1);
    this.yellow.setSpecular(1, 1, 0, 1);
    this.yellow.setShininess(10.0);
    this.gray = new CGFappearance(this);
    this.gray.setAmbient(0.3, 0.3, 0.3, 1);
    this.gray.setDiffuse(0.3, 0.3, 0.3, 1);
    this.gray.setSpecular(0.3, 0.3, 0.3, 1);
    this.gray.setShininess(3.0);
    this.flower = new MyFlower(this, 6, this.red, 0.5, this.yellow, 0.1, 5, this.green, 2);
    this.sphere = new MySphere(this,30,30,4,true);
    this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg");
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.rock = new MyRock(this, 6, 6, 4);
    this.rockSet = new MyRockSet(this,20);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayNormals = false;

    this.enableTextures(true);

this.terrain = new CGFtexture(this, "images/terrain.jpg");
this.terrain_appearance = new CGFappearance(this);
this.terrain_appearance.setTexture(this.terrain);
this.terrain_appearance.setTextureWrap('REPEAT', 'REPEAT');

this.earth = new CGFtexture(this, "images/panorama4.jpg");
this.earth_appearance = new CGFappearance(this);
this.earth_appearance.setTexture(this.earth);
this.earth_appearance.setTextureWrap('REPEAT', 'REPEAT');

  }
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
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.pushMatrix();
    //this.earth_appearance.apply();

    //this.sphere.display();

    this.popMatrix();

    this.pushMatrix();

    //this.flower.display();
    
    this.popMatrix();

    this.pushMatrix();

    //this.translate(0,4,-10);

    //this.rotate(Math.PI/2,0,0,1);

    this.gray.apply();

    //this.rock.display();

    this.rockSet.display();

    this.popMatrix();

    this.panorama.display();

    if (this.displayNormals)
            this.flower.enableNormalViz();
        else
            this.flower.disableNormalViz();

    // ---- END Primitive drawing section
  }
}
