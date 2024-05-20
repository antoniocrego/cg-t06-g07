
import {CGFobject, CGFshader, CGFtexture} from '../../lib/CGF.js';
import {MyGrassBlade} from './MyGrassBlade.js';

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrass extends CGFobject {

    constructor(scene, rows, columns) {
        super(scene);
        this.grassRow = 50 / rows;
        this.grassColumn = 50 / columns;
        this.grass = [];
        this.random = [];
        for (let i = 0; i < 50; i+= this.grassRow){
            var grassList = [];
            var randomList = [];
            for (let j = 0; j < 50; j+= this.grassColumn){
                let r = Math.random();
                let randomTriangles = Math.floor(r * 3) + 4;
                let blade = new MyGrassBlade(this.scene, randomTriangles, this.grassColumn);
                grassList.push(blade);
                randomList.push((r+1)*0.5);
            }
            this.grass.push(grassList);
            this.random.push(randomList);
        }

        this.shader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");
        this.shader.setUniformsValues({uSampler: 1});

        this.texture = new CGFtexture(this.scene, "images/grass.jpg");
    }

    update(t){
        this.shader.setUniformsValues({timeFactor: t / 100 % 100});
    }

    display(){
        this.scene.setActiveShader(this.shader);
        for (let i = 0; i < this.grass.length; i++){
            for (let j = 0; j < this.grass[i].length; j++){
                this.shader.setUniformsValues({random: this.random[i][j]});
                this.scene.pushMatrix();
                this.scene.translate(i*this.grassRow, 0, j*this.grassColumn);
                this.grass[i][j].display();
                this.scene.popMatrix();
            }
        }
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}

