import {CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyReceptacle extends CGFobject {
	constructor(scene, slices, stacks, radius, inside) {
        super(scene);
        this.sphere = new MySphere(scene, slices, stacks, radius, inside);
        this.initBuffers();
	}

	display(){
        this.sphere.display();
    }
}


