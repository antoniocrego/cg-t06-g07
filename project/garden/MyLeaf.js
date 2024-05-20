import {CGFobject} from '../../lib/CGF.js';

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
			for (var j = 0; j <= this.slices; j++) {
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
				this.texCoords.push(0.33+(i*stackSize*0.33), j/this.slices);
				if (i!=this.stacks){
					this.indices.push(i*(this.slices+1) + j, i*(this.slices+1) + (j+1)%(this.slices+1), (i+1)*(this.slices+1) + j);
					this.indices.push(i*(this.slices+1) + (j+1)%(this.slices+1), (i+1)*(this.slices+1) + (j+1)%(this.slices+1), (i+1)*(this.slices+1) + j);
				}
			}
		}

		this.vertices.push(0, 0, 2);
		this.normals.push(0, 0, 1);
		this.texCoords.push(1, 0.5);

		for (var j = 0; j <= this.slices; j++) {
			const Qx = Math.cos(j * 2 * Math.PI / this.slices);
			const Qy = Math.sin(j * 2 * Math.PI / this.slices);
			this.vertices.push(Qx, Qy, 1);
			this.texCoords.push(0.66,j/this.slices);
			this.indices.push((this.stacks+1)*(this.slices+1)+1+(j+1)%(this.slices+1), (this.stacks+1)*(this.slices+1), (this.stacks+1)*(this.slices+1)+1+j);
		}
		this.normals = this.normals.concat(endNormals);

		this.vertices.push(0, 0, -1);
		this.normals.push(0, 0, -1);
		this.texCoords.push(0, 0.5);

		for (var j = 0; j <= this.slices; j++) {
			const Qx = Math.cos(j * 2 * Math.PI / this.slices);
			const Qy = Math.sin(j * 2 * Math.PI / this.slices);
			this.vertices.push(Qx, Qy, 0);
			this.texCoords.push(0.33,j/this.slices);
			this.indices.push((this.stacks+2)*(this.slices+1)+1, (this.stacks+2)*(this.slices+1)+2+(j+1)%(this.slices+1), (this.stacks+2)*(this.slices+1)+2+j);
		}

		this.normals = this.normals.concat(startNormals);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

