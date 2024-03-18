import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, top, front, right, back, left, bottom) {
		super(scene);
        this.quad =  new MyQuad(scene);
        this.top = top;
        this.front = front;
        this.right = right;
        this.back = back;
        this.left = left;
        this.bottom = bottom;
        this.quadMaterial = new CGFappearance(this.scene);
        this.quadMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.quadMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setShininess(10.0);
        this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(changeFiltering){

        this.scene.pushMatrix();

        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.translate(0,0,0.5);
        if (this.top != undefined){
            this.topMaterial = new CGFappearance(this.scene);
            this.topMaterial.setAmbient(0.1, 0.1, 0.1, 1);
            this.topMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
            this.topMaterial.setSpecular(0.1, 0.1, 0.1, 1);
            this.topMaterial.setShininess(10.0);
            this.topMaterial.setTexture(this.top);
            this.topMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.topMaterial.apply();
            if (changeFiltering) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        else this.quadMaterial.apply();
        this.quad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0,0,0.5);
        
        if (this.front != undefined){
            this.frontMaterial = new CGFappearance(this.scene);
            this.frontMaterial.setAmbient(0.1, 0.1, 0.1, 1);
            this.frontMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
            this.frontMaterial.setSpecular(0.1, 0.1, 0.1, 1);
            this.frontMaterial.setShininess(10.0);
            this.frontMaterial.setTexture(this.front);
            this.frontMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.frontMaterial.apply();
            if (changeFiltering) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        else this.quadMaterial.apply();
        this.quad.display();

        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.translate(0,0,0.5);
        if (this.right != undefined){
            this.rightMaterial = new CGFappearance(this.scene);
            this.rightMaterial.setAmbient(0.1, 0.1, 0.1, 1);
            this.rightMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
            this.rightMaterial.setSpecular(0.1, 0.1, 0.1, 1);
            this.rightMaterial.setShininess(10.0);
            this.rightMaterial.setTexture(this.right);
            this.rightMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.rightMaterial.apply();
            if (changeFiltering) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        else this.quadMaterial.apply();
        this.quad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.rotate(Math.PI,0,1,0);
        this.scene.translate(0,0,0.5);
        if (this.back != undefined){
            this.backMaterial = new CGFappearance(this.scene);
            this.backMaterial.setAmbient(0.1, 0.1, 0.1, 1);
            this.backMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
            this.backMaterial.setSpecular(0.1, 0.1, 0.1, 1);
            this.backMaterial.setShininess(10.0);
            this.backMaterial.setTexture(this.back);
            this.backMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.backMaterial.apply();
            if (changeFiltering) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        else this.quadMaterial.apply();
        this.quad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.rotate(3*Math.PI/2,0,1,0);
        this.scene.translate(0,0,0.5);
        if (this.left != undefined){
            this.leftMaterial = new CGFappearance(this.scene);
            this.leftMaterial.setAmbient(0.1, 0.1, 0.1, 1);
            this.leftMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
            this.leftMaterial.setSpecular(0.1, 0.1, 0.1, 1);
            this.leftMaterial.setShininess(10.0);
            this.leftMaterial.setTexture(this.left);
            this.leftMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.leftMaterial.apply();
            if (changeFiltering) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        else this.quadMaterial.apply();
        this.quad.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.translate(0,0,0.5);
        if (this.bottom != undefined){
            this.bottomMaterial = new CGFappearance(this.scene);
            this.bottomMaterial.setAmbient(0.1, 0.1, 0.1, 1);
            this.bottomMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
            this.bottomMaterial.setSpecular(0.1, 0.1, 0.1, 1);
            this.bottomMaterial.setShininess(10.0);
            this.bottomMaterial.setTexture(this.bottom);
            this.bottomMaterial.setTextureWrap('REPEAT', 'REPEAT');
            this.bottomMaterial.apply();
            if (changeFiltering) this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            else this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        }
        else this.quadMaterial.apply();
        this.quad.display();

        this.scene.popMatrix();

    }
}

