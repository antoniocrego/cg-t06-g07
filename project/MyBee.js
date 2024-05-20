import {CGFappearance, CGFobject} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import {MyCone} from './MyCone.js';
import {MyCylinder} from './MyCylinder.js';
import {MyPollen} from './MyPollen.js';

const state = Object.freeze({
    BASIC: 0,
    DESCENDING: 1,
    FLOWER: 2,
    ASCENDING: 3,
    DELIVERING: 4,
    EXITING: 5
});

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
        this.cylinder = new MyCylinder(scene, 20, 20, 1, 0.025);
        this.cap = new MySphere(scene, 20, 20, 0.025);


        this.beeState = state.DELIVERING;
        this.exit();
        this.flower = null;
        this.carryingPolen1 = null;
        this.carryingPolen2 = null;

        this.angleToHive = this.getAngleToPosition(0, 0);
	}

    initMaterials() {
        
    }

    turn(v){
        if (this.beeState != state.BASIC) return;
        this.direction += v;
        if (this.direction < 0) this.direction += 2*Math.PI;
        else if (this.direction >= 2*Math.PI) this.direction -= 2*Math.PI;

        let movementVector = Math.sqrt(this.speed[0]**2 + this.speed[1]**2);
        this.speed= [movementVector * Math.cos(this.direction), movementVector * Math.sin(this.direction)];
    }

    accelerate(v){
        if (this.beeState != state.BASIC) return;
        var movementVector = Math.sqrt(this.speed[0]**2 + this.speed[1]**2) + v; // get the norm of the current speed and split the additional speed evenly
        this.speed = [movementVector * Math.cos(this.direction), movementVector * Math.sin(this.direction)];
    }

    deaccelerate(v){
        if (this.beeState != state.BASIC) return;
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
        this.wingRotation = Math.sin(2 * Math.PI * 2.5 * time) * 0.6;

        switch(this.beeState){
            case state.BASIC:
                this.z += this.speed[0];
                this.x += this.speed[1];
                this.y = this.initialY + this.legRotation;
                break;
            case state.DESCENDING:
                if (this.y-this.flower.y < 0.05 && this.y-this.flower.y > -0.05){
                    this.y = this.flower.y;
                    this.beeState = state.FLOWER;
                }
                if (this.y > this.flower.y){
                    this.y -= 0.05;
                }
                else if (this.y < this.flower.y){
                    this.y += 0.05;
                }
                break;
            case state.FLOWER:
                this.y = this.y + this.legRotation;
                if (this.carryPolen(this.flower.pollen)) this.flower.pollen = null;
                break;
            case state.ASCENDING:
                if (this.y-this.initialY < 0.05 && this.y-this.initialY > -0.05){
                    this.y = this.initialY;
                    this.beeState = state.BASIC;
                }
                if (this.y > this.initialY){
                    this.y -= 0.05;
                }
                else if (this.y < this.initialY){
                    this.y += 0.05;
                }
                break;
            case state.DELIVERING:
                if (this.angleToHive < 0.1 && this.angleToHive > -0.1){
                    this.direction += this.angleToHive
                    this.angleToHive = 0;
                    if (!(this.x+7.7 < 0.3 && this.x+7.7 > -0.3)){
                        this.speed[1] = 0.5*Math.sin(this.direction);
                        this.x += this.speed[1];
                    }
                    else this.x = -7.7;
                    if (!(this.z+7.7 < 0.3 && this.z+7.7 > -0.3)){
                        this.speed[0] = 0.5*Math.cos(this.direction);
                        this.z += this.speed[0];
                    }
                    else this.z = -7.7;
                    if (7-this.initialY<0.15 && 7-this.initialY > -0.15){
                        this.initialY = 7;
                    }
                    if (7-this.initialY > 0){
                        this.initialY += 0.15;
                    }
                    else if (7-this.initialY < 0){
                        this.initialY -= 0.15;
                    }
                    if (this.x==-7.7 && this.z == -7.7 && this.initialY == 7){
                        this.carryingPolen1 = null;
                        this.carryingPolen2 = null;
                        this.exit();
                        break;
                    }
                }
                else if (this.angleToHive > 0){
                    this.angleToHive -= 0.1;
                    this.direction -= 0.1;
                }
                else if (this.angleToHive < 0){
                    this.angleToHive += 0.1;
                    this.direction += 0.1;
                }
                this.y = this.initialY + this.legRotation;
                break;
            case state.EXITING:
                if (this.angleToHive < 0.1 && this.angleToHive > -0.1){
                    this.direction -= this.angleToHive
                    this.angleToHive = 0;
                    if (!(this.x < 0.5 && this.x > -0.5)){
                        this.speed[1] = 0.5*Math.sin(this.direction);
                        this.x += this.speed[1];
                    }
                    else this.x = 0;
                    if (!(this.z < 0.5 && this.z > -0.5)){
                        this.speed[0] = 0.5*Math.cos(this.direction);
                        this.z += this.speed[0];
                    }
                    else this.z = 0;
                    if (3-this.initialY<0.15 && 3-this.initialY > -0.15){
                        this.initialY = 3;
                    }
                    if (3-this.initialY > 0){
                        this.initialY += 0.15;
                    }
                    else if (3-this.initialY < 0){
                        this.initialY -= 0.15;
                    }
                    if (this.x == 0 && this.z == 0 && this.initialY == 3){
                        this.beeState = state.BASIC;
                        break;
                    }
                }
                else if (this.angleToHive > 0){
                    this.angleToHive -= 0.1;
                    this.direction -= 0.1;
                }
                else if (this.angleToHive < 0){
                    this.angleToHive += 0.1;
                    this.direction += 0.1;
                }
                this.y = this.initialY + this.legRotation;
                break;
        }
    }
    
    reset(){
        this.x = 0;
        this.y = 3;
        this.z = 0;
        this.speed = [0,0];
        this.direction = 0;
    }

    carryPolen(polen){
        if (polen == null) return false;
        if (this.carryingPolen1 == null) this.carryingPolen1 = polen;
        else if (this.carryingPolen2 == null) this.carryingPolen2 = polen;
        else return false;
        return true;
    }

    ascend(){
        if (this.beeState != state.FLOWER) return;
        this.beeState = state.ASCENDING;
        this.flower = null;
    }

    descend(flower){
        if (this.beeState != state.BASIC) return;
        this.speed = [0,0];
        this.beeState = state.DESCENDING;
        this.flower = flower;
    }

    deliver(){
        if (this.beeState != state.BASIC) return;

        this.angleToHive = this.getAngleToPosition(-7.7, -7.7);
        
        this.beeState = state.DELIVERING;
    }

    exit(){
        if (this.beeState != state.DELIVERING) return;
        this.angleToHive = this.getAngleToPosition(0, 0);
        this.beeState = state.EXITING;
    }

    getAngleToPosition(x, z){
        var movementVector = [Math.sin(this.direction), Math.cos(this.direction)];
        var movementVectorNorm = Math.sqrt(movementVector[0]**2 + movementVector[1]**2);
        movementVector = [movementVector[0]/movementVectorNorm, movementVector[1]/movementVectorNorm];

        var vectorToDest = [x-this.x, z-this.z];
        var vectorToDestNorm = Math.sqrt(vectorToDest[0]**2 + vectorToDest[1]**2);
        vectorToDest = [vectorToDest[0]/vectorToDestNorm, vectorToDest[1]/vectorToDestNorm];

        var crossProduct = movementVector[0] * vectorToDest[1] - movementVector[1] * vectorToDest[0];

        if (crossProduct > 0) return Math.acos(movementVector[0]*vectorToDest[0] + movementVector[1]*vectorToDest[1]);
        else return -Math.acos(movementVector[0]*vectorToDest[0] + movementVector[1]*vectorToDest[1]);
    }

    display(scale){
        this.scene.pushMatrix();

        this.scene.translate(this.x, this.y, this.z);

        this.scene.rotate(this.direction, 0, 1, 0);

        this.scene.scale(scale, scale, scale);

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

