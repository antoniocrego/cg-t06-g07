import {CGFobject} from '../lib/CGF.js';

function vectorLength(x,y,z){
	return Math.sqrt(x*x + y*y + z*z);
}

function vectorProduct(x1,y1,z1,x2,y2,z2){
	return [y1*z2 - z1*y2, z1*x2 - x1*z2, x1*y2 - y1*x2];
}

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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
				// vertex and normal for the first plane
				this.vertices.push(Qx, Qy, Qz);
				const Rx = Qx;
				const Ry = Qy;
				const Rz = i*stackSize + stackSize;
				const QRx = Rx - Qx;
				const QRy = Ry - Qy;
				const QRz = Rz - Qz;
				let Sx = Math.cos((j+1)%this.slices*2*Math.PI/this.slices);
				let Sy = Math.sin((j+1)%this.slices*2*Math.PI/this.slices);
				let Sz = i*stackSize;
				let QSx = Sx - Qx;
				let QSy = Sy - Qy;
				let QSz = Sz - Qz;
				let normal = vectorProduct(QSx, QSy, QSz, QRx, QRy, QRz);
				let vectorSize1 = vectorLength(normal[0], normal[1], normal[2]);
				this.normals.push(normal[0]/vectorSize1, normal[1]/vectorSize1, normal[2]/vectorSize1);
				// vertex and normal for the second plane
				Sx = Math.cos((j+this.slices-1)%this.slices*2*Math.PI/this.slices);
				Sy = Math.sin((j+this.slices-1)%this.slices*2*Math.PI/this.slices);
				Sz = i*stackSize;
				QSx = Sx - Qx;
				QSy = Sy - Qy;
				QSz = Sz - Qz;
				normal = vectorProduct(QRx, QRy, QRz, QSx, QSy, QSz);
				vectorSize1 = vectorLength(normal[0],normal[1],normal[2]);
				this.normals.push(normal[0]/vectorSize1, normal[1]/vectorSize1, normal[2]/vectorSize1);
				this.vertices.push(Qx, Qy, Qz);
				if (i!=this.stacks){
					this.indices.push(2*(i*this.slices + j), 2*(i*this.slices + (j+1)%this.slices)+1, 2*((i+1)*this.slices + j));
					this.indices.push(2*(i*this.slices + (j+1)%this.slices)+1, 2*((i+1)*this.slices + (j+1)%this.slices)+1, 2*((i+1)*this.slices + j));
				}
			}
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

