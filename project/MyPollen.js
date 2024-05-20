import {CGFobject} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';

export class MyPollen extends CGFobject {
	constructor(scene, slices, stacks, radius, inside) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.inside = inside;
        this.topHALF = new MySphere(scene, slices, stacks, radius, inside, false);
        this.bottomHALF = new MySphere(scene, slices, stacks, radius, inside, false, true);
        this.rotation = Math.random()*2*Math.PI;
	}

	display(){
        this.scene.pushMatrix();
        this.scene.rotate(this.rotation, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.pushMatrix();
        this.scene.scale(1, 1.5, 1);
        this.topHALF.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        //this.scene.scale(0.5, 0.5, 0.5);
        this.bottomHALF.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}


