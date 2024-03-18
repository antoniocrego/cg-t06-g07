import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
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

		this.texCoords = [
			1,1,
			0.5,1,
			0.25,0.75,
			0.75,0.75,
			1,1,
			0.5,1,
			0.25,0.75,
			0.75,0.75,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

