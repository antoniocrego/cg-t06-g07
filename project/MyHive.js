import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyCone } from './MyCone.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
	constructor(scene) {
		super(scene);
        this.initMaterials();
        this.base = new MyCylinder(scene, 20, 20, 1, 4);
        this.top = new MyCone(scene, 20, 20, 1);
        this.littleCylinder = new MyCylinder(scene, 10, 10, 1.5, 0.5);
        this.littleHat = new MyCone(scene, 20, 20, 1);
	}

    initMaterials() {
        this.beehiveTex = new CGFtexture(this.scene, "images/wood1.jpg");
        this.beehive_appearance = new CGFappearance(this.scene);
        this.beehive_appearance.setTexture(this.beehiveTex);
        this.beehive_appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.hatTex = new CGFtexture(this.scene, "images/wood2.jpg");
        this.hat_appearance = new CGFappearance(this.scene);
        this.hat_appearance.setTexture(this.hatTex);
        this.hat_appearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    enableNormalViz(){
    }

    disableNormalViz(){
    }

    

    display(){
        this.scene.pushMatrix();
        this.scene.scale(1, 8, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.beehive_appearance.apply();
        this.base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 7, 0);
        this.scene.scale(5.5, 4, 5.5);
        this.hat_appearance.apply();
        this.top.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 10.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.beehive_appearance.apply();
        this.littleCylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 11.5, 0);
        this.hat_appearance.apply();
        this.littleHat.display();
        this.scene.popMatrix();
    }
}

