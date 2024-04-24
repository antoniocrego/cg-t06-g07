import {CGFappearance, CGFobject} from '../lib/CGF.js';

export class MyBee extends CGFobject {
	constructor(scene, x, y, z, speed, direction) {
		super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.lastUpdate = new Date().getTime();
        this.speed = speed;
        this.direction = direction;
	}

    initMaterials() {
        
    }

    update(time) {
        let deltaTime = time - this.lastUpdate;
        this.lastUpdate = time;

        let deltaPos = [
            this.direction[0] * this.speed * deltaTime,
            this.direction[1] * this.speed * deltaTime,
            this.direction[2] * this.speed * deltaTime
        ];

        this.x += deltaPos[0];
        this.y += deltaPos[1];
        this.z += deltaPos[2];

    }
    

    display(){

    }
}

