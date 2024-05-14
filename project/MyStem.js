import {CGFobject} from '../lib/CGF.js';
import { MyCylinder} from './MyCylinder.js';
import { MyLeaf } from './MyLeaf.js';

function randomRotateStem(){
	return Math.random()*Math.PI/6 - Math.PI/12;	
}

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
	constructor(scene, slices, cylinderCount, stemRadius) {
		super(scene);

		this.slices = slices;
		this.cylinderCount = cylinderCount;
		this.stemRadius = stemRadius;
		this.cylinders = [];
		this.randomRotations = [];
		this.leaves = [];

		this.initBuffers();
	}
	
	initBuffers() {
		for (var i = 0; i < this.cylinderCount; i++) {
			var randomHeight = Math.random()*0.5 + 1;
			this.cylinders.push(new MyCylinder(this.scene, this.slices, 1, randomHeight, this.stemRadius));
		}

		for (var i = 0; i < this.cylinderCount; i++) {
			this.randomRotations.push(randomRotateStem());
		}

		for (var i = 1; i < this.cylinderCount; i++) {
			this.leaves.push(new MyLeaf(this.scene, 10, 10));
		}
	}

	display(){
		var height = 0;
		var dist = 0;

		this.scene.pushMatrix();

		for (var i = 0; i < this.cylinderCount; i++) {
			var ang = this.randomRotations[i];
			var cylinder = this.cylinders[i];
			this.scene.pushMatrix();
			this.scene.translate(-dist, height, 0);
			this.scene.rotate(ang, 0, 0, 1);
			this.scene.rotate(-Math.PI/2, 1, 0, 0);
			cylinder.display();
			this.scene.popMatrix();
			if(i > 0){
				this.scene.pushMatrix();
				var leave = this.leaves[i-1];
				this.scene.translate(-dist, height, 0);
				if(ang < this.randomRotations[i-1]){
					this.scene.rotate(Math.PI, 0, 1, 0);
				}
				if(i%2 == 0){
					this.scene.translate(0.4*this.stemRadius,0,0);
				}
				this.scene.translate(this.stemRadius,0,0);
				this.scene.rotate(Math.PI/2, 0, 1, 0);
				this.scene.scale(this.stemRadius, this.stemRadius, this.stemRadius);
				this.scene.scale(1.7,1.7,1.7);
				leave.display();
				this.scene.popMatrix();
			}
			height += cylinder.height * Math.cos(ang) - this.stemRadius/2 * Math.cos(ang);
			dist += cylinder.height * Math.sin(ang) - this.stemRadius/2 * Math.sin(ang);
		}

		this.height = height;
		this.dist = -dist;

		this.scene.popMatrix();
	}
}

