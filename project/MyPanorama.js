import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';

export class MyPanorama extends CGFobject {
	constructor(scene,texture) {
        super(scene);
        this.texture = texture;
        this.appearance = new CGFappearance(scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setEmission(1,1,1,1);
        this.sphere = new MySphere(scene,40,40,200,true);
	}

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0],this.scene.camera.position[1],this.scene.camera.position[2]);
        this.appearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }


}


