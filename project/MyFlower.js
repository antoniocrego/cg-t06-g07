import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyStem } from "./MyStem.js";
import { MyReceptacle } from './MyReceptacle.js';
import { MyPetal } from './MyPetal.js';
import { MyPollen } from './MyPollen.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
	constructor(scene, petals, petalColor, petalAngle, receptacleRadius, receptacleColor, stemRadius, stemStacks, stemColor, externalCircumference=1+receptacleRadius, flowerRotation, flowerSize, minimiumPetalRotationX, maximumPetalRotationX, minimiumPetalRotationY, maximumPetalRotationY, leafTexture, pollen_appearance) {
		super(scene);
        this.stem = new MyStem(scene, 10, stemStacks, stemRadius, stemColor, leafTexture);
        this.receptacle = new MyReceptacle(scene, 10, 10, receptacleRadius, false);
        this.petals = [];
        this.modifier = (externalCircumference-receptacleRadius);
        this.petalColor = petalColor;
        this.receptacleRadius = receptacleRadius;
        this.receptacleColor = receptacleColor;
        this.flowerRotation = flowerRotation;
        this.flowerSize = flowerSize;
        this.petalRotationsX = [];
        this.petalRotationsY = [];
        for (let i = 0; i < petals; i++) {
            this.petals.push(new MyPetal(scene, petalAngle));
            this.petalRotationsX.push(Math.random()*(maximumPetalRotationX-minimiumPetalRotationX)+minimiumPetalRotationX);
            this.petalRotationsY.push(Math.random()*(maximumPetalRotationY-minimiumPetalRotationY)+minimiumPetalRotationY);
        }
        this.pollen_appearance = pollen_appearance;
        this.pollen = new MyPollen(scene, 10, 10, receptacleRadius*0.9, false);
        this.initMaterials();
	}

    initMaterials() {
        
    }

    enableNormalViz(){
        this.stem.enableNormalViz();
        this.receptacle.enableNormalViz();
        for (let i = 0; i < this.petals.length; i++) {
            this.petals[i].enableNormalViz();
        }
    }

    disableNormalViz(){
        this.stem.disableNormalViz();
        this.receptacle.disableNormalViz();
        for (let i = 0; i < this.petals.length; i++) {
            this.petals[i].disableNormalViz();
        }
    }

    

    display(){
        
        this.scene.pushMatrix();

        this.scene.scale(this.flowerSize, this.flowerSize, this.flowerSize);

        this.scene.rotate(this.flowerRotation, 0, 1, 0);

        this.scene.pushMatrix();

        this.stem.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(this.stem.dist, this.stem.height, 0);

        this.scene.rotate(this.stem.randomRotations[this.stem.cylinderCount-1],0,0,1);

        this.receptacleColor.apply();

        this.receptacle.display();

        this.pollen_appearance.apply();

        this.pollen.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(this.stem.dist, this.stem.height, 0);

        this.petalColor.apply();

        for (let i = 0; i < this.petals.length; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI/2,1,0,0);
            this.scene.rotate(-Math.PI/4, 0, 1, 0);
            this.scene.rotate(this.stem.randomRotations[this.stem.cylinderCount-1],0,1,0);
            if (this.petals.length > 1) this.scene.rotate(-i * (3*Math.PI/(2*(this.petals.length-1))), 0, 1, 0);
            else this.scene.rotate(-Math.PI + Math.PI/4, 0, 1, 0);
            this.scene.rotate(Math.PI/4, 0, 0, 1);
            this.scene.translate(0,0,this.receptacleRadius);
            this.scene.rotate(this.petalRotationsX[i], 1, 0, 0);
            this.scene.rotate(this.petalRotationsY[i], 0, 1, 0);
            this.scene.scale(1,1,this.modifier);
            this.petals[i].display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}

