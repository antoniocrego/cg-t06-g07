import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
	constructor(scene) {
		super(scene);
        this.flowers = [];
        this.initMaterials();
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                var externalCircumference = Math.random()*(7-3)+3;
                var receptacleRadius = Math.random()*(1-0.4)+0.4;
                var stemRadius = Math.random()*((receptacleRadius*0.3)-(receptacleRadius*0.1))+(receptacleRadius*0.1);
                var petals = Math.floor(Math.random()*(30-3)+3);
                var petalAngle = Math.random()*(160*Math.PI/180 - 121*Math.PI/180)+121*Math.PI/180;
                var stemHeight = Math.floor(Math.random()*(8-3)+3);
                var petalColor = this.petalColors[Math.floor(Math.random()*4)];
                var stemTex = this.stemTexs[Math.floor(Math.random()*2)];
                var flowerRotation = Math.random()*Math.PI*2;
                var flowerSize = Math.random()*(1-0.4)+0.4;
                var minimiumPetalRotationX = -Math.random()*Math.PI/6;
                var maximumPetalRotationX = Math.random()*Math.PI/6;
                var minimiumPetalRotationY = -Math.random()*Math.PI/6;
                var maximumPetalRotationY = Math.random()*Math.PI/6;
                var receptacleTex = this.receptacleTexs[Math.floor(Math.random()*3)];
                this.flowers.push(new MyFlower(this.scene, petals, petalColor, petalAngle, receptacleRadius, receptacleTex, stemRadius, stemHeight, stemTex, externalCircumference, flowerRotation, flowerSize, minimiumPetalRotationX, maximumPetalRotationX, minimiumPetalRotationY, maximumPetalRotationY, this.pollen_appearance));
            }
        }
	}

    initMaterials() {
        this.pollenTexture = new CGFtexture(this.scene, "images/pollen.jpg");
        this.pollen_appearance = new CGFappearance(this.scene);
        this.pollen_appearance.setTexture(this.pollenTexture);
        this.pollen_appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1, 0, 0, 1);
        this.red.setDiffuse(1, 0, 0, 1);
        this.red.setSpecular(1, 0, 0, 1);
        this.red.setShininess(10.0);
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0, 1, 0, 1);
        this.green.setDiffuse(0, 1, 0, 1);
        this.green.setSpecular(0, 1, 0, 1);
        this.green.setShininess(10.0);
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(1, 1, 0, 1);
        this.yellow.setDiffuse(1, 1, 0, 1);
        this.yellow.setSpecular(1, 1, 0, 1);
        this.yellow.setShininess(10.0);
        var petal1 = new CGFappearance(this.scene);
        petal1.setTexture(new CGFtexture(this.scene, "images/petal1.jpg"));
        petal1.setTextureWrap('REPEAT', 'REPEAT');
        var petal2 = new CGFappearance(this.scene);
        petal2.setTexture(new CGFtexture(this.scene, "images/petal2.jpg"));
        petal2.setTextureWrap('REPEAT', 'REPEAT');
        var petal3 = new CGFappearance(this.scene);
        petal3.setTexture(new CGFtexture(this.scene, "images/petal3.jpg"));
        petal3.setTextureWrap('REPEAT', 'REPEAT');
        var petal4 = new CGFappearance(this.scene);
        petal4.setTexture(new CGFtexture(this.scene, "images/petal4.jpg"));
        petal4.setTextureWrap('REPEAT', 'REPEAT');
        this.petalColors = [petal1, petal2, petal3, petal4];
        var stem1 = new CGFappearance(this.scene);
        stem1.setTexture(new CGFtexture(this.scene, "images/stem1.jpg"));
        stem1.setTextureWrap('REPEAT', 'REPEAT');
        var stem2 = new CGFappearance(this.scene);
        stem2.setTexture(new CGFtexture(this.scene, "images/stem2.jpg"));
        stem2.setTextureWrap('REPEAT', 'REPEAT');
        var stem3 = new CGFappearance(this.scene);
        stem3.setTexture(new CGFtexture(this.scene, "images/stem3.jpg"));
        stem3.setTextureWrap('REPEAT', 'REPEAT');
        this.stemTexs = [stem1, stem2];
        var receptacle1 = new CGFappearance(this.scene);
        receptacle1.setTexture(new CGFtexture(this.scene, "images/receptacle1.jpg"));
        receptacle1.setTextureWrap('REPEAT', 'REPEAT');
        var receptacle2 = new CGFappearance(this.scene);
        receptacle2.setTexture(new CGFtexture(this.scene, "images/receptacle2.jpg"));
        receptacle2.setTextureWrap('REPEAT', 'REPEAT');
        var receptacle3 = new CGFappearance(this.scene);
        receptacle3.setTexture(new CGFtexture(this.scene, "images/receptacle3.jpg"));
        receptacle3.setTextureWrap('REPEAT', 'REPEAT');
        this.receptacleTexs = [receptacle1, receptacle2, receptacle3];
    }

    enableNormalViz(){
        this.flowers.forEach(flower => {
            flower.enableNormalViz();
        });
    }

    disableNormalViz(){
        this.flowers.forEach(flower => {
            flower.disableNormalViz();
        });
    }

    

    display(gardenLines, gardenColumns){
        for (let x = 0; x < gardenColumns; x++) {
            for (let z = 0; z < gardenLines; z++) {
                this.scene.pushMatrix();
                this.scene.translate(x*10, 0, z*10);
                this.flowers[x*10+z].display();
                this.scene.popMatrix();
            }
        }
    }
}

