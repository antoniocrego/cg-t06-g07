import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0,0,0, //0
            1,0,0, //1
            0,1,0, //2
            1,1,0, //3
            0,0,1, //4
            1,0,1, //5
            0,1,1, //6
            1,1,1  //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			1, 2, 3,
            4, 5, 6,
            5, 7, 6,
            0, 5, 4,
            0, 1, 5,
            2, 6, 7,
            2, 7, 3,
            1, 3, 5,
            3, 7, 5,
            0, 4, 2,
            2, 4, 6
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

