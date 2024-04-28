import {CGFobject} from '../lib/CGF.js';

function vectorLength(x,y,z){
	return Math.sqrt(x*x + y*y + z*z);
}

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
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
		this.texCoords = [];

		let stackSize = 1/this.stacks;

		var startNormals = [];
		var endNormals = [];

		for (var i = 0; i <= this.stacks; i++) {
			for (var j = 0; j < this.slices; j++) {
				const Qx = Math.cos(j * 2 * Math.PI / this.slices);
				const Qy = Math.sin(j * 2 * Math.PI / this.slices);
				const Qz = i*stackSize;
				this.vertices.push(Qx, Qy, Qz);
				if (i == 0){
					const vectorSize = vectorLength(2*Qx, 2*Qy, -2);
					this.normals.push(2*Qx/vectorSize, 2*Qy/vectorSize, -2/vectorSize);
					startNormals.push(2*Qx/vectorSize, 2*Qy/vectorSize, -2/vectorSize);
				}
				else if (i == this.stacks){
					const vectorSize = vectorLength(2*Qx, 2*Qy, 2);
					this.normals.push(2*Qx/vectorSize, 2*Qy/vectorSize, 2/vectorSize);
					endNormals.push(2*Qx/vectorSize, 2*Qy/vectorSize, 2/vectorSize);
				}
				else{
					const vectorSize = vectorLength(2*Qx, 2*Qy, 0);
					this.normals.push(2*Qx/vectorSize, 2*Qy/vectorSize, 0);
				}
				this.texCoords.push(j/this.slices, i*stackSize);
				if (i!=this.stacks){
					this.indices.push(i*this.slices + j, i*this.slices + (j+1)%this.slices, (i+1)*this.slices + j);
					this.indices.push(i*this.slices + (j+1)%this.slices, (i+1)*this.slices + (j+1)%this.slices, (i+1)*this.slices + j);
				}
			}
		}

		this.vertices.push(0, 0, 2);
		this.normals.push(0, 0, 1);

		for (var j = 0; j < this.slices; j++) {
			const Qx = Math.cos(j * 2 * Math.PI / this.slices);
			const Qy = Math.sin(j * 2 * Math.PI / this.slices);
			this.vertices.push(Qx, Qy, 1);
			this.texCoords.push(Qx/2 + 0.5, Qy/2 + 0.5);
			this.indices.push((this.stacks+1)*this.slices+1+(j+1)%this.slices, (this.stacks+1)*this.slices, (this.stacks+1)*this.slices+1+j);
		}
		this.normals = this.normals.concat(endNormals);

		this.vertices.push(0, 0, -1);
		this.normals.push(0, 0, -1);

		for (var j = 0; j < this.slices; j++) {
			const Qx = Math.cos(j * 2 * Math.PI / this.slices);
			const Qy = Math.sin(j * 2 * Math.PI / this.slices);
			this.vertices.push(Qx, Qy, 0);
			this.texCoords.push(Qx/2 + 0.5, Qy/2 + 0.5);
			this.indices.push((this.stacks+2)*this.slices+1, (this.stacks+2)*this.slices+2+(j+1)%this.slices, (this.stacks+2)*this.slices+2+j);
		}

		this.normals = this.normals.concat(startNormals);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

