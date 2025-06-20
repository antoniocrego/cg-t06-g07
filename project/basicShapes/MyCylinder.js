import {CGFobject} from '../../lib/CGF.js';

function vectorLength(x,y,z){
	return Math.sqrt(x*x + y*y + z*z);
}

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks, height, radius) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		this.height = height;
		this.radius = radius;

		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let stackSize = this.height/this.stacks;

		for (var i = 0; i <= this.stacks; i++) {
			for (var j = 0; j <= this.slices; j++) {
				const Qx = this.radius*Math.cos(j * 2 * Math.PI / this.slices);
				const Qy = this.radius*Math.sin(j * 2 * Math.PI / this.slices);
				const Qz = i*stackSize;
				this.vertices.push(Qx, Qy, Qz);
				const vectorSize = vectorLength(2*Qx, 2*Qy, 0);
				this.normals.push(2*Qx/vectorSize, 2*Qy/vectorSize, 0);
				this.texCoords.push(j/this.slices, i*stackSize);
				if (i!=this.stacks){
					this.indices.push(i*(this.slices+1) + j, i*(this.slices+1) + (j+1)%(this.slices+1), (i+1)*(this.slices+1) + j);
					this.indices.push(i*(this.slices+1) + (j+1)%(this.slices+1), (i+1)*(this.slices+1) + (j+1)%(this.slices+1), (i+1)*(this.slices+1) + j);
				}
			}
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

