import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangle = new MyTriangle(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
    }

    display(){
        var ang = Math.PI/4;

        var rotateZ = [
            Math.cos(ang), -Math.sin(ang),0,0,
            Math.sin(ang), Math.cos(ang),0,0,
            0, 0, 0, 1,
            0, 0, 0, 1
        ]

        var translateX = 0
        var translateY = 1
        var translateZ = 0

        var translateMatrix = [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            translateX,translateY,translateZ,1
        ]

        var scaleMatrix = [
            Math.sqrt(2)/2,0,0,0,
            0,Math.sqrt(2)/2,0,0,
            0,0,Math.sqrt(2)/2,0,
            0,0,0,1
        ]
        // ---- BEGIN Primitive drawing section
        
        this.scene.pushMatrix();
        //{
        
        this.scene.multMatrix(translateMatrix);
        this.scene.multMatrix(rotateZ);
        this.scene.multMatrix(scaleMatrix);
        this.diamond.display();

        this.scene.popMatrix();
        //}

        this.scene.pushMatrix();

        this.scene.translate(0.5,-0.5,0);

        this.triangleSmall.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(-1,0.5,0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.scale(-1/Math.sqrt(2),1/Math.sqrt(2),1/Math.sqrt(2));
        this.scene.translate(-1.5,-1.5,0);

        this.parallelogram.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0,-1.5,0);
        this.triangle.display();
        
        
        this.scene.rotate(Math.PI,0,0,1);
        this.triangle.display();
        
        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.scale(1/2,1/2,1/2);
        this.scene.translate(0,4.0,0);
        this.triangle.display();

        this.scene.rotate(Math.PI,0,0,1);
        this.triangle.display();

        this.scene.popMatrix();
    }
	
}

