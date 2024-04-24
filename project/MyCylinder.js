import {CGFobject} from '../lib/CGF.js';

function vectorLength(x,y,z){
	return Math.sqrt(x*x + y*y + z*z);
}

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		let stackSize = 1/this.stacks;

		for (var i = 0; i <= this.stacks; i++) {
			for (var j = 0; j < this.slices; j++) {
				const Qx = Math.cos(j * 2 * Math.PI / this.slices);
				const Qy = Math.sin(j * 2 * Math.PI / this.slices);
				const Qz = i*stackSize;
				this.vertices.push(Qx, Qy, Qz);
				const vectorSize = vectorLength(2*Qx, 2*Qy, 0);
				this.normals.push(2*Qx/vectorSize, 2*Qy/vectorSize, 0);
				if (i!=this.stacks){
					this.indices.push(i*this.slices + j, i*this.slices + (j+1)%this.slices, (i+1)*this.slices + j);
					this.indices.push(i*this.slices + (j+1)%this.slices, (i+1)*this.slices + (j+1)%this.slices, (i+1)*this.slices + j);
				}
			}
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

