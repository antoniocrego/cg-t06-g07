import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene,[0.5,0.5,1,0,1,1]);
        this.secondtriangle = new MyTriangle(scene,[0.5,0.5,1,0,0,0]);
        this.paralellogram = new MyParallelogram(scene);
        this.trianglesmall = new MyTriangleSmall(scene);
        this.smallRecTriangle1 = new MyTriangle(scene,[0.25,0.25,0,0,0,0.5]);
        this.smallRecTriangle2 = new MyTriangle(scene,[0.5,0.5,0.75,0.75,0.25,0.75]);

        this.initMaterials();
	}

    initMaterials() {
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1.0, 0.0, 0.0, 1.0);
        //this.red.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.red.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.red.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.red.setShininess(10.0);

        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(0.6, 0.3, 0.7, 1.0);
        //this.purple.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.purple.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.purple.setSpecular(0.6, 0.3, 0.7, 1.0);
        this.purple.setShininess(10.0);

        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(1.0, 1.0, 0.0, 1.0);
        //this.yellow.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.yellow.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.yellow.setSpecular(1.0, 1.0, 0.0, 1.0);
        this.yellow.setShininess(10.0);

        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(1.0, 0.6, 0.8, 1.0);
        //this.pink.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.pink.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.pink.setSpecular(1.0, 0.6, 0.8, 1.0);
        this.pink.setShininess(10.0);

        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0.0, 0.6, 1.0, 1.0);
        //this.blue.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.blue.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.blue.setSpecular(0.0, 0.6, 1.0, 1.0);
        this.blue.setShininess(10.0);

        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(1.0, 0.6, 0.0, 1.0);
        //this.orange.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.orange.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.orange.setSpecular(1.0, 0.6, 0.0, 1.0);
        this.orange.setShininess(10.0);

        this.tangMaterial = new CGFappearance(this.scene);
        this.tangMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangMaterial.setShininess(10.0);
        this.tangMaterial.loadTexture('images/tangram.png');
        this.tangMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.secondtriangle.enableNormalViz();
        this.paralellogram.enableNormalViz();
        this.trianglesmall.enableNormalViz();
        this.smallRecTriangle1.enableNormalViz();
        this.smallRecTriangle2.enableNormalViz();
    }

    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.secondtriangle.disableNormalViz();
        this.paralellogram.disableNormalViz();
        this.trianglesmall.disableNormalViz();
        this.smallRecTriangle1.disableNormalViz();
        this.smallRecTriangle2.disableNormalViz();
    }

    

    display(){
        this.scene.pushMatrix();
        this.scene.translate(0,-2.5,0);
        this.tangMaterial.apply();
        // BEGIN DIAMOND
        this.scene.pushMatrix();

        var rotate45 = [
            Math.sqrt(2)/2, -Math.sqrt(2)/2, 0, 0,
            Math.sqrt(2)/2, Math.sqrt(2)/2, 0, 0,
            0,0,1,0,
            0,0,0,1
        ];

        var move1 = [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,1,0,1,
        ]

        var move3 = [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            -0.5,3,0,1,
        ];

        var scale = [
            Math.sqrt(2)/2,0,0,0,
            0,Math.sqrt(2)/2,0,0,
            0,0,Math.sqrt(2)/2,0,
            0,0,0,1,
        ];

        this.scene.multMatrix(move3);

        this.scene.multMatrix(scale);

        this.scene.multMatrix(rotate45);

        this.scene.multMatrix(move1);

        this.diamond.display();

        this.scene.popMatrix();
        // END DIAMOND

        // BEGIN TWO BIG RIGHT TRIANGLES
        this.scene.pushMatrix();

        this.scene.translate(0,1,0);

        this.triangle.display();

        this.scene.rotate(Math.PI,0,0,1);

        this.secondtriangle.display();

        this.scene.popMatrix();
        // END TWO BIG RIGHT TRIANGLES

        // BEGIN PARALELLOGRAM
        this.scene.pushMatrix();

        this.scene.translate(-1.5,2,0);

        this.scene.scale(-1/Math.sqrt(2),1/Math.sqrt(2),1/Math.sqrt(2));

        this.scene.rotate(Math.PI/4 + Math.PI/2,0,0,1);

        this.paralellogram.display();

        this.scene.popMatrix();
        // END PARALELLOGRAM

        // BEGIN SMALL TRIANGLE
        this.scene.pushMatrix();

        this.scene.translate(0.5,2,0);

        this.trianglesmall.display();

        this.scene.popMatrix();
        // END SMALL TRIANGLE

        // BEGIN TWO SMALL RIGHT TRIANGLES
        this.scene.pushMatrix();

        this.scene.translate(0,4.5,0);

        this.scene.scale(1/2,1/2,1/2);

        this.smallRecTriangle1.display();

        this.scene.rotate(Math.PI,0,0,1);

        this.smallRecTriangle2.display();

        this.scene.popMatrix();
        // END TWO SMALL RIGHT TRIANGLES

        this.scene.popMatrix();
    }
}

