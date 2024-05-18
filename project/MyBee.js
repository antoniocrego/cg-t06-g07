import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
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
        this.wing = new MySphere(scene, 2, 20, 1);
        this.sting = new MyCone(scene, 20, 20);
        this.leg = new MySphere(scene, 20, 20, 1);
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

        this.fur21Texture = new CGFtexture(scene, 'images/bee-fur21.jpg');
        this.fur21Appearance = new CGFappearance(scene);
        this.fur21Appearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.fur21Appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.fur21Appearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.fur21Appearance.setShininess(10.0);
        this.fur21Appearance.setTexture(this.fur21Texture);

        this.fur2Texture = new CGFtexture(scene, 'images/bee-fur2.jpg');
        this.fur2Appearance = new CGFappearance(scene);
        this.fur2Appearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.fur2Appearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.fur2Appearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.fur2Appearance.setShininess(10.0);
        this.fur2Appearance.setTexture(this.fur2Texture);

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

        this.fur2Appearance.apply();
        
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

        this.fur21Appearance.apply();

        this.head.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); // body

        this.scene.translate(0, -0.5, -this.head.radius*2);

        this.scene.pushMatrix(); // wing

        this.scene.translate(this.body.radius*2,0.1,0.5);
        this.scene.rotate(Math.PI/12, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);

        this.scene.scale(1, -2.2, -0.8);

        this.wingLAppearance.apply();

        this.wing.display();

        this.scene.popMatrix();

        this.scene.pushMatrix(); // wing

        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.translate(this.body.radius*2,0.1,-0.5);
        this.scene.rotate(-Math.PI/12, 1, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);

        this.scene.scale(1, -2.2, -0.8);

        this.wingRAppearance.apply();

        this.wing.display();

        this.scene.popMatrix();

        this.fur2Appearance.apply();

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

        this.fur21Appearance.apply();

        this.body.display();

        this.scene.popMatrix();


        this.scene.pushMatrix(); // bottom

        this.scene.translate(0, -2.5*this.bottom.radius, -this.head.radius*4.5);

        this.scene.pushMatrix(); // sting

        this.scene.rotate(-3*Math.PI/4, 1, 0, 0);

        this.scene.translate(0, this.bottom.radius+1, 0);

        this.scene.scale(0.1, 0.5, 0.1);


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

