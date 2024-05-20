import {CGFobject} from '../../lib/CGF.js';

/**
 * MyGrassBlade
 * @constructor
 * @param scene - Reference to MyScene object
 * @param numTriangles - Number of triangles in the blade
 * @param width - Width of the blade
 */
export class MyGrassBlade extends CGFobject {

    constructor(scene, numTriangles, width) {
        super(scene);
        this.numTriangles = numTriangles;
        this.width = width;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let v1 = [0, 0, 0];
        let v2 = [this.width, 0, 0];
        let v3 = [this.width/(this.numTriangles*2), this.width, 0];

        for(let i = 0; i < this.numTriangles; i++){

            let sign = i % 2 === 0 ? -1 : 1;

            this.vertices.push(v1[0], v1[1], v1[2]);
            this.vertices.push(v2[0], v2[1], v2[2]);
            this.vertices.push(v3[0], v3[1], v3[2]);

            this.vertices.push(v1[0], v1[1], v1[2]);
            this.vertices.push(v2[0], v2[1], v2[2]);
            this.vertices.push(v3[0], v3[1], v3[2]);

            this.normals.push(0, 0, -1*sign);
            this.normals.push(0, 0, -1*sign);
            this.normals.push(0, 0, -1*sign);

            this.normals.push(0, 0, 1*sign);
            this.normals.push(0, 0, 1*sign);
            this.normals.push(0, 0, 1*sign);

            v1 = v2;
            v2 = v3;
            v3 = [v1[0] + sign*this.width/this.numTriangles, v1[1] + this.width*2, 0];

            this.indices.push(i*6, i*6 + 1, i*6 + 2);
            this.indices.push(i*6 + 3, i*6 + 5, i*6 + 4);

            this.texCoords.push(v1[0]/this.width,v1[1]/(this.width*this.numTriangles));
            this.texCoords.push(v2[0]/this.width,v2[1]/(this.width*this.numTriangles));
            this.texCoords.push(v3[0]/this.width,v3[1]/(this.width*this.numTriangles));

            this.texCoords.push(v1[0]/this.width,v1[1]/(this.width*this.numTriangles));
            this.texCoords.push(v2[0]/this.width,v2[1]/(this.width*this.numTriangles));
            this.texCoords.push(v3[0]/this.width,v3[1]/(this.width*this.numTriangles));

        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();


    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(1, 1/(2*this.width) , 1);
        super.display();
        this.scene.popMatrix();
    }

}

