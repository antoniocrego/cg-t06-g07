import {CGFobject} from '../lib/CGF.js';
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
        this.triangle = new MyTriangle(scene);
        this.secondtriangle = new MyTriangle(scene);
        this.paralellogram = new MyParallelogram(scene);
        this.trianglesmall = new MyTriangleSmall(scene);
        this.smallRecTriangle1 = new MyTriangle(scene);
        this.smallRecTriangle2 = new MyTriangle(scene);
	}

    display(){
        this.scene.pushMatrix();
        this.scene.translate(0,-2.5,0);

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

