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
export class MyPetal extends CGFobject {
	constructor(scene, petalAngle) {
		super(scene);
		this.petalAngle = Math.PI/2 - petalAngle;

		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [
		];
		this.indices = [
		];
		this.normals = [
		];

		for (var j = 0; j < 4; j++){
			let Qx, Qy, Qz, Rx, Ry, Rz;
			if (j % 2 == 0){
				Qx = 0.5/Math.tan(this.petalAngle) * Math.cos(j * 2 * Math.PI / 4);
				Qy = Math.sin(j * 2 * Math.PI / 4)/2;
				Qz = 0.5;
	
				Rx = Math.cos((j+1)%4 * 2 * Math.PI / 4)/2;
				Ry = 0.5/Math.tan(this.petalAngle) * Math.sin((j+1)%4 * 2 * Math.PI / 4);
				Rz = 0.5;
			}
			else{
				Qx = Math.cos(j * 2 * Math.PI / 4)/2;
				Qy = 0.5/Math.tan(this.petalAngle) * Math.sin(j * 2 * Math.PI / 4);
				Qz = 0.5;
	
				Rx = 0.5/Math.tan(this.petalAngle) * Math.cos((j+1)%4 * 2 * Math.PI / 4);
				Ry = Math.sin((j+1)%4 * 2 * Math.PI / 4)/2;
				Rz = 0.5;
			}

			const normal = vectorProduct(Rx, Ry, Rz, Qx, Qy, Qz);
			const vectorSize = vectorLength(normal[0], normal[1], normal[2]);
			this.vertices.push(0, 0, 0);
			this.vertices.push(Qx, Qy, Qz);
			this.vertices.push(Rx, Ry, Rz);
			this.normals.push(normal[0]/vectorSize, normal[1]/vectorSize, normal[2]/vectorSize);
			this.normals.push(normal[0]/vectorSize, normal[1]/vectorSize, normal[2]/vectorSize);
			this.normals.push(normal[0]/vectorSize, normal[1]/vectorSize, normal[2]/vectorSize);

			this.indices.push(j*3, j*3+2, j*3+1);
		}

		for (var j = 0; j < 4; j++){
			let Qx, Qy, Qz, Rx, Ry, Rz;
			if (j % 2 == 0){
				Qx = 0.5/Math.tan(this.petalAngle) * Math.cos(j * 2 * Math.PI / 4);
				Qy = Math.sin(j * 2 * Math.PI / 4)/2;
				Qz = 0.5;
	
				Rx = Math.cos((j+1)%4 * 2 * Math.PI / 4)/2;
				Ry = 0.5/Math.tan(this.petalAngle) * Math.sin((j+1)%4 * 2 * Math.PI / 4);
				Rz = 0.5;
			}
			else{
				Qx = Math.cos(j * 2 * Math.PI / 4)/2;
				Qy = 0.5/Math.tan(this.petalAngle) * Math.sin(j * 2 * Math.PI / 4);
				Qz = 0.5;
	
				Rx = 0.5/Math.tan(this.petalAngle) * Math.cos((j+1)%4 * 2 * Math.PI / 4);
				Ry = Math.sin((j+1)%4 * 2 * Math.PI / 4)/2;
				Rz = 0.5;
			}

			const normal = vectorProduct(Qx, Qy, Qz-1, Rx, Ry, Rz-1);
			const vectorSize = vectorLength(normal[0], normal[1], normal[2]);
			this.vertices.push(0, 0, 1);
			this.vertices.push(Qx, Qy, Qz);
			this.vertices.push(Rx, Ry, Rz);
			this.normals.push(normal[0]/vectorSize, normal[1]/vectorSize, normal[2]/vectorSize);
			this.normals.push(normal[0]/vectorSize, normal[1]/vectorSize, normal[2]/vectorSize);
			this.normals.push(normal[0]/vectorSize, normal[1]/vectorSize, normal[2]/vectorSize);

			this.indices.push(3*4+(j*3), 3*4+(j*3+1), 3*4+(j*3+2));
		}


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

