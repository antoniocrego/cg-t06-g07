import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import {MyCone} from './MyCone.js';
import {MyCylinder} from './MyCylinder.js';

export class MyBee extends CGFobject {
	constructor(scene, x, y, z, speed) {
		super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.lastUpdate = new Date().getTime();
        this.speed = speed;
        this.direction = [0,0,1];
        this.head = new MySphere(scene, 20, 20, 1);
        this.body = new MySphere(scene, 20, 20, 1);
        this.bottom = new MySphere(scene, 20, 20, 1);
        this.eye = new MySphere(scene, 20, 20, 1);
        this.wing = new MySphere(scene, 20, 20, 1);
        this.sting = new MyCone(scene, 20, 20);
        this.leg = new MySphere(scene, 20, 20, 1);
        this.cylinder = new MyCylinder(scene, 20, 20, 1, 0.025);
        this.cap = new MySphere(scene, 20, 20, 0.025);
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
        this.scene.pushMatrix();

        this.scene.translate(this.x, this.y, this.z);

        this.scene.pushMatrix(); // head
        
        this.scene.rotate(Math.PI/4, 1, 0, 0);

        this.scene.pushMatrix();

        this.scene.translate(this.head.radius*0.25, this.head.radius+0.3, 0);

        this.cap.display();

        this.scene.pushMatrix();

        this.scene.rotate(Math.PI/12, 0, 1, 0)

        this.cylinder.display();

        this.scene.translate(0, 0, 1);

        this.cap.display();

        this.scene.popMatrix();

        this.scene.scale(1,0.5,1);

        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.cylinder.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(this.head.radius*-0.25, this.head.radius+0.3, 0);

        this.cap.display();

        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/12, 0, 1, 0)

        this.cylinder.display();

        this.scene.translate(0, 0, 1);

        this.cap.display();

        this.scene.popMatrix();

        this.scene.scale(1,0.5,1);

        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.cylinder.display();

        this.scene.popMatrix();

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

        this.scene.translate(this.body.radius*2,0.1,0.5);
        this.scene.rotate(Math.PI/12, 1, 0, 0);

        this.scene.scale(1.5, 0.1, 0.8);

        this.wing.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); // wing

        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(this.body.radius*2,0.1,-0.5);
        this.scene.rotate(-Math.PI/12, 1, 0, 0);

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

        this.scene.translate(0, 0.2, -this.bottom.radius*1.9);

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

