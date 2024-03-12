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
			-0.5,-0.5,-0.5, //0
            0.5,-0.5,-0.5, //1
            -0.5,0.5,-0.5, //2
            0.5,0.5,-0.5, //3
            -0.5,-0.5,0.5, //4
            0.5,-0.5,0.5, //5
            -0.5,0.5,0.5, //6
            0.5,0.5,0.5,  //7
			//
			-0.5,-0.5,-0.5, //0
            0.5,-0.5,-0.5, //1
            -0.5,0.5,-0.5, //2
            0.5,0.5,-0.5, //3
            -0.5,-0.5,0.5, //4
            0.5,-0.5,0.5, //5
            -0.5,0.5,0.5, //6
            0.5,0.5,0.5,  //7
			//
			-0.5,-0.5,-0.5, //0
            0.5,-0.5,-0.5, //1
            -0.5,0.5,-0.5, //2
            0.5,0.5,-0.5, //3
            -0.5,-0.5,0.5, //4
            0.5,-0.5,0.5, //5
            -0.5,0.5,0.5, //6
            0.5,0.5,0.5,  //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1,
			1, 2, 3,
            4, 5, 6,
            5, 7, 6,
			//
            8, 13, 12,//
            8, 9, 13,//
            10, 14, 15,//
            10, 15, 11,//
			//
            17, 19, 21,
            19, 23, 21,
            16, 20, 18,
            18, 20, 22
		];

		this.normals = [
			0, 0, -1, //0
			0, 0, -1, //1
			0, 0, -1, //2
			0, 0, -1, //3
			0, 0, 1, //4
			0, 0, 1, //5
			0, 0, 1, //6
			0, 0, 1, //7
			//
			0, -1, 0, //8
			0, -1, 0, //9
			0, 1, 0, //10
			0, 1, 0, //11
			0, -1, 0, //12
			0, -1, 0, //13
			0, 1, 0, //14
			0, 1, 0, //15
			//
			-1, 0, 0, //16
			1, 0, 0, //17
			-1, 0, 0, //18
			1, 0, 0, //19
			-1, 0, 0, //20
			1, 0, 0, //21
			-1, 0, 0, //22
			1, 0, 0 //23
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

