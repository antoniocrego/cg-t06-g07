import {CGFobject} from '../lib/CGF.js';

export class MySphere extends CGFobject {
	constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
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

        for (i = 0; i <= 2*this.stacks; i++) {
            var alpha = i * delta_alpha;
            for (j = 0; j <= this.slices; j++) {
                var beta = j * delta_beta;
                var z = Math.sin(alpha) * Math.cos(beta);
                var x = Math.sin(alpha) * Math.sin(beta);
                var y = Math.cos(alpha);

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);

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


