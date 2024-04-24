import {CGFobject} from '../lib/CGF.js';
import { MyCylinder} from './MyCylinder.js';

function randomRotateStem(){
	return Math.random()*Math.PI/6 - Math.PI/12;	
}

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
	constructor(scene, slices, cylinderCount) {
		super(scene);

		this.slices = slices;
		this.cylinderCount = cylinderCount;
		this.cylinders = [];
		this.randomRotations = [];

		this.initBuffers();
	}
	
	initBuffers() {
		for (var i = 0; i < this.cylinderCount; i++) {
			this.cylinders.push(new MyCylinder(this.scene, this.slices, 1));
		}

		for (var i = 0; i < this.cylinderCount; i++) {
			this.randomRotations.push(randomRotateStem());
		}
	}

	display(){
		var height = 0;
		var dist = 0;
		for (var i = 0; i < this.cylinderCount; i++) {
			var ang = Math.PI/2 - this.randomRotations[i];
			height += 0.9*Math.sin(ang);
		}

		this.scene.pushMatrix();

		height = 0;

		for (var i = 0; i < this.cylinderCount; i++) {
			var ang = Math.PI/2 - this.randomRotations[i];
			this.scene.pushMatrix();
			this.scene.translate(dist, height, 0);
			this.scene.rotate(this.randomRotations[i], 0, 0, 1);
			this.scene.translate(0, 1, 0);
			this.scene.rotate(Math.PI/2, 1, 0, 0);
			this.scene.scale(0.1, 0.1, 1);
			this.cylinders[i].display();
			this.scene.popMatrix();
			height += 0.95*Math.sin(ang);
			dist -= 0.95*Math.cos(ang);
		}

		this.height = height;
		this.dist = dist;

		this.scene.popMatrix();
	}
}

