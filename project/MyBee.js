import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
import {MyCone} from './MyCone.js';
import {MyCylinder} from './MyCylinder.js';
import {MyPollen} from './MyPollen.js';

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
        this.wing = new MySphere(scene, 2, 20, 1);
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

        this.eyeTexture = new CGFtexture(scene, 'images/bee-eye.jpg');
        this.eyeAppearance = new CGFappearance(scene);
        this.eyeAppearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.eyeAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eyeAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.eyeAppearance.setShininess(10.0);
        this.eyeAppearance.setTexture(this.eyeTexture);

        this.furTexture = new CGFtexture(scene, 'images/bee-fur.jpg');
        this.furAppearance = new CGFappearance(scene);
        this.furAppearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.furAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.furAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.furAppearance.setShininess(10.0);
        this.furAppearance.setTexture(this.furTexture);

        this.furLightTexture = new CGFtexture(scene, 'images/bee-fur1.jpg');
        this.furLightAppearance = new CGFappearance(scene);
        this.furLightAppearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.furLightAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.furLightAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.furLightAppearance.setShininess(10.0);
        this.furLightAppearance.setTexture(this.furLightTexture);

        this.furDarkTexture = new CGFtexture(scene, 'images/bee-fur2.jpg');
        this.furDarkAppearance = new CGFappearance(scene);
        this.furDarkAppearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.furDarkAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.furDarkAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.furDarkAppearance.setShininess(10.0);
        this.furDarkAppearance.setTexture(this.furDarkTexture);

        this.wingLTexture = new CGFtexture(scene, 'images/bee-wingl.jpg');
        this.wingLAppearance = new CGFappearance(scene);
        this.wingLAppearance.setAmbient(0.9, 0.9, 0.9, 0.4);
        this.wingLAppearance.setDiffuse(0.1, 0.1, 0.1, 0.4);
        this.wingLAppearance.setSpecular(0.1, 0.1, 0.1, 0.4);
        this.wingLAppearance.setShininess(10.0);
        this.wingLAppearance.setTexture(this.wingLTexture);

        this.wingRTexture = new CGFtexture(scene, 'images/bee-wingr.jpg');
        this.wingRAppearance = new CGFappearance(scene);
        this.wingRAppearance.setAmbient(0.9, 0.9, 0.9, 0.4);
        this.wingRAppearance.setDiffuse(0.1, 0.1, 0.1, 0.4);
        this.wingRAppearance.setSpecular(0.1, 0.1, 0.1, 0.4);
        this.wingRAppearance.setShininess(10.0);
        this.wingRAppearance.setTexture(this.wingRTexture);
        
        this.carryingPolen1 = new MyPollen(scene, 10, 10, 0.1, false);
        this.carryingPolen2 = new MyPollen(scene, 10, 10, 0.1, false);
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
    }
    
    reset(){
        this.x = 0;
        this.y = 3;
        this.z = 0;
        this.speed = [0,0];
        this.direction = 0;
    }

    carryPolen(polen){
        if (this.carryingPolen1 == null) this.carryingPolen1 = polen;
        else if (this.carryingPolen2 == null) this.carryingPolen2 = polen;
        else return false;
        return true;
    }

    display(scale){
        this.scene.pushMatrix();

        this.scene.translate(this.x, this.y, this.z);

        this.scene.rotate(this.direction, 0, 1, 0);

        this.scene.scale(scale, scale, scale);

        this.scene.pushMatrix(); // head

        this.furDarkAppearance.apply();
        
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
        this.eyeAppearance.apply();
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix(); // eye
        this.scene.translate(-this.head.radius*0.8, 0, -0.2);
        this.scene.scale(0.5, 0.5, 0.5);
        this.eyeAppearance.apply();
        this.eye.display();
        this.scene.popMatrix();

        this.furLightAppearance.apply();

        this.head.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); // body

        this.scene.translate(0, -0.5, -this.head.radius*2);

        this.scene.pushMatrix(); // wing

        this.scene.translate(this.body.radius,0.1,0.5);
        this.scene.rotate(this.wingRotation, 0, 0, 1);
        this.scene.translate(this.body.radius,0,0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);

        this.wingLAppearance.apply();

        this.scene.pushMatrix();

        this.scene.translate(-0.05, 0, -1*this.body.radius);

        this.scene.rotate(Math.PI/6, 1, 0, 0);

        this.scene.scale(1, -1, -0.8);

        this.wing.display();

        this.scene.popMatrix();


        this.scene.scale(1, -2.2, -0.8);

        this.wing.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); // wing

        this.scene.translate(-this.body.radius,0.1,0.5);
        this.scene.rotate(-this.wingRotation, 0, 0, 1);
        this.scene.translate(-this.body.radius,0,0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);

        this.wingRAppearance.apply();

        this.scene.pushMatrix();

        this.scene.translate(0.05, 0, -1*this.body.radius);

        this.scene.rotate(Math.PI/6, 1, 0, 0);

        this.scene.scale(1, -1, -0.8);

        this.wing.display();

        this.scene.popMatrix();

        this.scene.scale(1, -2.2, -0.8);

        this.wing.display();

        this.scene.popMatrix();

        this.furDarkAppearance.apply();

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

        this.furLightAppearance.apply();

        this.body.display();

        this.scene.popMatrix();


        this.scene.pushMatrix(); // bottom

        this.scene.translate(0, -2.5*this.bottom.radius, -this.head.radius*4.5);

        this.scene.pushMatrix(); // sting

        this.scene.rotate(-3*Math.PI/4, 1, 0, 0);

        this.scene.translate(0, this.bottom.radius+1, 0);

        this.scene.scale(0.1, 0.5, 0.1);

        this.furDarkAppearance.apply();

        this.sting.display();

        this.scene.popMatrix();

        this.scene.rotate(Math.PI/4, 1, 0, 0);

        this.scene.scale(1.5, 2, 1.5);

        this.furAppearance.apply();

        this.bottom.display();

        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}

