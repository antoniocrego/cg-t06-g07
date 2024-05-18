import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import {MyCone} from './MyCone.js';

export class MyBee extends CGFobject {
	constructor(scene, x, y, z, speed) {
		super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.speed = speed;
        this.direction = 0;
        this.head = new MySphere(scene, 20, 20, 1);
        this.body = new MySphere(scene, 20, 20, 1);
        this.bottom = new MySphere(scene, 20, 20, 1);
        this.eye = new MySphere(scene, 20, 20, 1);
        this.wing = new MySphere(scene, 20, 20, 1);
        this.sting = new MyCone(scene, 20, 20);
        this.leg = new MySphere(scene, 20, 20, 1);

        this.amplitude = 0.1;
        this.frequency = 1;
        this.initialY = y;

        this.wingRotation = 0;
        this.legRotation = 0;
        this.wholeRotation = 0;
	}

    initMaterials() {
        
    }

    turn(v){
        this.direction += v;

        let movementVector = Math.sqrt(this.speed[0]**2 + this.speed[1]**2);
        this.speed= [movementVector * Math.cos(this.direction), movementVector * Math.sin(this.direction)];
    }

    accelerate(v){
        var movementVector = Math.sqrt(this.speed[0]**2 + this.speed[1]**2) + v; // get the norm of the current speed and split the additional speed evenly
        this.speed = [movementVector * Math.cos(this.direction), movementVector * Math.sin(this.direction)];
    }

    deaccelerate(v){
        var movementVector = Math.sqrt(this.speed[0]**2 + this.speed[1]**2); // get the norm of the current speed
        if (movementVector < 0.08 && movementVector > -0.08){
            this.speed = [0,0];
            return;
        }
        movementVector -= v; // remove the speed
        this.speed = [movementVector * Math.cos(this.direction), movementVector * Math.sin(this.direction)];
    }

    update(time) {
        this.legRotation = Math.sin(2 * Math.PI * this.frequency * time) * this.amplitude;
        this.y = this.initialY + this.legRotation;
        this.wingRotation = Math.sin(2 * Math.PI * 2.5 * time) * 0.6;

        this.z += this.speed[0];
        this.x += this.speed[1];
        //this.x += this.speed * Math.cos(this.direction);
        //this.wholeRotation += this.speed * this.currentSpeeds[1];
    }
    
    reset(){
        this.x = 0;
        this.y = 3;
        this.z = 0;
        this.speed = [0,0];
        this.direction = 0;
    }

    display(scale){
        this.scene.pushMatrix();

        this.scene.translate(this.x, this.y, this.z);

        this.scene.rotate(this.direction, 0, 1, 0);

        this.scene.scale(scale, scale, scale);

        this.scene.pushMatrix(); // head
        
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.scene.scale(1,1,1.5);

        this.scene.pushMatrix(); // eye
        this.scene.translate(this.head.radius*0.8, 0, -0.2);
        this.scene.scale(0.5, 0.5, 0.5);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix(); // eye
        this.scene.translate(-this.head.radius*0.8, 0, -0.2);
        this.scene.scale(0.5, 0.5, 0.5);
        this.eye.display();
        this.scene.popMatrix();

        this.head.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); // body

        this.scene.translate(0, -0.5, -this.head.radius*2);

        this.scene.pushMatrix(); // wing

        this.scene.translate(this.body.radius,0.1,0.5);
        this.scene.rotate(Math.PI/12, 1, 0, 0);
        this.scene.rotate(this.wingRotation, 0, 0, 1);
        this.scene.translate(this.body.radius,0,0);

        this.scene.scale(1.5, 0.1, 0.8);

        this.wing.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); // wing

        this.scene.translate(-this.body.radius,0.1,0.5);
        this.scene.rotate(Math.PI/12, 1, 0, 0);
        this.scene.rotate(-this.wingRotation, 0, 0, 1);
        this.scene.translate(-this.body.radius,0,0);

        this.scene.scale(1.5, 0.1, 0.8);

        this.wing.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); //leg

        this.scene.translate(0.5, -this.body.radius, 0.5);

        this.scene.rotate(-Math.PI/4, 0, 0, 1);

        this.scene.scale(0.5, 0.1, 0.1);

        this.leg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        
        this.scene.translate(0.5, -this.body.radius, 0.5);

        this.scene.translate(0.1,-0.7,0);

        this.scene.rotate(Math.PI/3, 0, 0, 1);

        this.scene.scale(0.5, 0.1, 0.1);

        this.leg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); //leg

        this.scene.translate( 0, 0, -this.body.radius/2);

        this.scene.translate(0.5, -this.body.radius, 0.5);

        this.scene.rotate(-Math.PI/4, 0, 0, 1);

        this.scene.scale(0.5, 0.1, 0.1);

        this.leg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate( 0, 0, -this.body.radius/2);

        this.scene.translate(0.5, -this.body.radius, 0.5);

        this.scene.translate(0.1,-0.7,0);

        this.scene.rotate(Math.PI/3, 0, 0, 1);

        this.scene.scale(0.5, 0.1, 0.1);

        this.leg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); //leg

        this.scene.translate( 0, 0, -this.body.radius);

        this.scene.translate(0.5, -this.body.radius, 0.5);

        this.scene.rotate(-Math.PI/4, 0, 0, 1);

        this.scene.scale(0.5, 0.1, 0.1);

        this.leg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate( 0, 0, -this.body.radius);

        this.scene.translate(0.5, -this.body.radius, 0.5);

        this.scene.translate(0.1,-0.7,0);

        this.scene.rotate(Math.PI/3, 0, 0, 1);

        this.scene.scale(0.5, 0.1, 0.1);

        this.leg.display();

        this.scene.popMatrix();

        ///////////////////////////////////////////////////////////

        this.scene.pushMatrix();

        this.scene.rotate(Math.PI, 0, 1, 0);

        this.scene.pushMatrix(); //leg

        this.scene.translate(0.5, -this.body.radius, 0.5);

        this.scene.rotate(-Math.PI/4, 0, 0, 1);

        this.scene.scale(0.5, 0.1, 0.1);

        this.leg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        
        this.scene.translate(0.5, -this.body.radius, 0.5);

        this.scene.translate(0.1,-0.7,0);

        this.scene.rotate(Math.PI/3, 0, 0, 1);

        this.scene.scale(0.5, 0.1, 0.1);

        this.leg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); //leg

        this.scene.translate( 0, 0, -this.body.radius/2);

        this.scene.translate(0.5, -this.body.radius, 0.5);

        this.scene.rotate(-Math.PI/4, 0, 0, 1);

        this.scene.scale(0.5, 0.1, 0.1);

        this.leg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate( 0, 0, -this.body.radius/2);

        this.scene.translate(0.5, -this.body.radius, 0.5);

        this.scene.translate(0.1,-0.7,0);

        this.scene.rotate(Math.PI/3, 0, 0, 1);

        this.scene.scale(0.5, 0.1, 0.1);

        this.leg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); //leg

        this.scene.translate( 0, 0, -this.body.radius);

        this.scene.translate(0.5, -this.body.radius, 0.5);

        this.scene.rotate(-Math.PI/4, 0, 0, 1);

        this.scene.scale(0.5, 0.1, 0.1);

        this.leg.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate( 0, 0, -this.body.radius);

        this.scene.translate(0.5, -this.body.radius, 0.5);

        this.scene.translate(0.1,-0.7,0);

        this.scene.rotate(Math.PI/3, 0, 0, 1);

        this.scene.scale(0.5, 0.1, 0.1);

        this.leg.display();

        this.scene.popMatrix();

        this.scene.popMatrix();


        this.scene.scale(1.2, 1, 1.5);


        this.body.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); // bottom

        this.scene.translate(0, -this.bottom.radius, -this.head.radius*5);
        this.scene.rotate(-Math.PI/4, 1, 0, 0);

        this.scene.pushMatrix(); // sting

        this.scene.translate(0, 0.2, -this.bottom.radius*2);

        this.scene.scale(0.1, 0.1, 0.5);

        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.sting.display();

        this.scene.popMatrix();

        this.scene.scale(1.5, 1.5, 2);

        this.bottom.display();

        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}

