import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            0,0,0, // 0
            2,0,0, // 1
            3,1,0, // 2
            1,1,0, // 3
			//
			0,0,0, // 0
            2,0,0, // 1
            3,1,0, // 2
            1,1,0, // 3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            1,3,0,
            2,3,1,
			1,0,3,
			2,1,3,
			//
			4,5,7,
			5,6,7,
		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

