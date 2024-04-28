
import {CGFobject} from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
	constructor(scene, height) {
        super(scene);
        this.height = height;
        this.rocks = [];
        this.randomScales = [];
        this.initBuffers();
	}

	initBuffers(){
        var currentHeight = this.height;

        while(currentHeight > 0){
            var line = [];
            var randomScale = Math.random()*0.2+0.2;
            for(var i = 0; i < currentHeight; i++){
                var rock = new MyRock(this.scene, 6, 6, 4);
                line.push(rock);
            }
            this.rocks.push(line);
            this.randomScales.push(randomScale);
            currentHeight--;
        }
    }

    display(){
        var height = 0;
        for(var i = 0; i < this.rocks.length; i++){
            this.scene.pushMatrix();
            this.scene.translate(i*4+4,0,0);
            var randomScale = this.randomScales[i];
            for(var j = 0; j < this.rocks[i].length; j++){
                this.scene.pushMatrix();
                this.scene.translate(8*j,height,0);
                this.scene.scale(1,randomScale,1);
                this.rocks[i][j].display();
                this.scene.popMatrix();
            }
            height += 4*randomScale;
            this.scene.popMatrix();
        }
    }
}
