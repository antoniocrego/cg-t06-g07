
import {CGFobject} from '../lib/CGF.js';
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
        for (let i = 0; i < 50; i+= this.grassRow){
            var grassList = [];
            for (let j = 0; j < 50; j+= this.grassColumn){
                let randomTriangles = Math.floor(Math.random() * 3) + 4;
                let blade = new MyGrassBlade(this.scene, randomTriangles, this.grassRow);
                grassList.push(blade);
            }
            this.grass.push(grassList);
        }
    }

    display(){
        for (let i = 0; i < this.grass.length; i++){
            for (let j = 0; j < this.grass[i].length; j++){
                this.scene.pushMatrix();
                this.scene.translate(i*this.grassRow, 0, j*this.grassColumn);
                this.grass[i][j].display();
                this.scene.popMatrix();
            }
        }
    }
}

