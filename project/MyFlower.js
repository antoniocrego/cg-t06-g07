import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyStem } from "./MyStem.js";
import { MyReceptacle } from './MyReceptacle.js';
import { MyPetal } from './MyPetal.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
	constructor(scene, petals, petalColor, receptacleRadius, receptacleColor, stemRadius, stemStacks, stemColor, externalCircumference=1+receptacleRadius) {
		super(scene);
        this.stem = new MyStem(scene, 10, stemStacks);
        this.receptacle = new MyReceptacle(scene, 10, 10, receptacleRadius, false);
        this.petals = [];
        this.modifier = (externalCircumference-receptacleRadius);
        this.petalColor = petalColor;
        this.receptacleRadius = receptacleRadius;
        this.receptacleColor = receptacleColor;
        this.stemRadius = stemRadius;
        this.stemColor = stemColor;
        for (let i = 0; i < petals; i++) {
            this.petals.push(new MyPetal(scene, 10, 10));
        }

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

        //this.scene.rotate(-Math.PI/2, 1, 0, 0);

        //this.scene.scale(this.stemRadius, this.stemRadius, 2);

        this.stemColor.apply();

        this.stem.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(this.stem.dist, this.stem.height, 0);

        this.scene.rotate(this.stem.randomRotations[this.stem.cylinderCount-1],0,0,1);

        this.receptacleColor.apply();

        this.receptacle.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(this.stem.dist, this.stem.height, 0);

        this.scene.rotate(Math.PI/2,1,0,0);

        this.scene.rotate(-Math.PI/4, 0, 1, 0);

        this.petalColor.apply();

        for (let i = 0; i < this.petals.length; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(this.stem.randomRotations[this.stem.cylinderCount-1],0,1,0);
            if (this.petals.length > 1) this.scene.rotate(-i * (3*Math.PI/(2*(this.petals.length-1))), 0, 1, 0);
            else this.scene.rotate(-Math.PI + Math.PI/4, 0, 1, 0);
            this.scene.rotate(Math.PI/4, 0, 0, 1);
            this.scene.translate(0,0,this.receptacleRadius);
            this.scene.scale(1,1,this.modifier);
            this.petals[i].display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}

