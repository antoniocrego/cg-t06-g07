import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MySphere} from './basicShapes/MySphere.js';

export class MyPanorama extends CGFobject {
	constructor(scene,texture) {
        super(scene);
        this.texture = texture;
        this.appearance = new CGFappearance(scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setEmission(1,1,1,1);
        this.sphere = new MySphere(scene,40,40,200,true);
        
        this.cloudMap = new CGFtexture(scene,'images/cloudMap.png');
        this.cloudShader = new CGFshader(scene.gl,'shaders/cloud.vert','shaders/cloud.frag');

        this.cloudShader.setUniformsValues({uSampler2: 1});
	}

    update(t){
        this.cloudShader.setUniformsValues({timeDelta: t});
    }

    display(){
        this.scene.setActiveShader(this.cloudShader);
        this.cloudMap.bind(1);
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0],this.scene.camera.position[1],this.scene.camera.position[2]);
        this.appearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }


}


