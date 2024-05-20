import {CGFobject} from '../lib/CGF.js';

export class MyRock extends CGFobject {
	constructor(scene, slices, stacks, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.initBuffers();
	}

	initBuffers(){
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        var i,j = 0;
        var delta_alpha = Math.PI / (2*this.stacks);
        var delta_beta = 2 * Math.PI / this.slices;

        var startRandom = 0;

        for (i = 0; i <= 2*this.stacks; i++) {
            var alpha = i * delta_alpha;
            for (j = 0; j <= this.slices; j++) {
                var random = Math.random()*0.2 - 0.1;
                if(j == 0){
                    startRandom = random;
                }

                if(j == this.slices){
                    random = startRandom;
                }

                if(i == 0 || i == 2*this.stacks){
                    random = startRandom;
                }
                var beta = j * delta_beta;
                var z = Math.sin(alpha) * Math.cos(beta);
                var x = Math.sin(alpha) * Math.sin(beta);
                var y = Math.cos(alpha);

                this.vertices.push(this.radius*x*(1+random), this.radius*y*(1+random), this.radius*z*(1+random));

                if(this.inside){
                    this.normals.push(-x, -y, -z);
                }else{
                    this.normals.push(x, y, z);
                }
                this.texCoords.push(j / this.slices, i / (2*this.stacks));
            }
        }

        for (i = 0; i < 2*this.stacks; i++) {
            for (j = 0; j < this.slices; j++) {
                if(i == 0){
                    this.indices.push(j, j+(i+1)*(this.slices+1),(j+1)+(i+1)*(this.slices+1));
                }else if (i == 2*this.stacks - 1){
                    this.indices.push(j + i*(this.slices+1), (j+1) + (i+1)*(this.slices+1), (j+1) + (i)*(this.slices+1));
                }else{
                    this.indices.push(j + i*(this.slices+1), j+(i+1)*(this.slices+1), (j+1) + (i)*(this.slices+1));
                    this.indices.push(j+(i+1)*(this.slices+1),(j+1)+(i+1)*(this.slices+1), (j+1)+(i)*(this.slices+1));
                }
            }
        }

        

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();

    }
}


