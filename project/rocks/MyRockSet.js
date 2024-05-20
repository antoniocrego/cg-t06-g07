import { CGFobject } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
    constructor(scene, height) {
        super(scene);
        this.height = height;
        this.rocks = [];
        this.randomScales = [];
        this.initBuffers();
    }

    initBuffers() {
        // Initialize rocks and their random scales
        for (let i = 0; i < this.height; i++) {
            this.rocks[i] = [];
            this.randomScales[i] = [];
            for (let j = 0; j < (this.height - i); j++) {
                this.rocks[i][j] = [];
                this.randomScales[i][j] = [];
                for (let k = 0; k < (this.height - i); k++) {
                    const rock = new MyRock(this.scene, 10, 10, 1);
                    this.rocks[i][j].push(rock);
                    const randomScale = [Math.random() * 0.7 + 0.7, Math.random() * 0.2 + 0.4, Math.random() * 0.7 + 0.7];
                    this.randomScales[i][j].push(randomScale);
                }
            }
        }
    }

    display() {
        for (let i = 0; i < this.height; i++) {
            let layerSize = this.height - i;
            let rockDistance = 1.5;
            let offset = ((rockDistance-1)*i + i) * 0.5; // Calculate offset to center the layer

            for (let j = 0; j < layerSize; j++) {
                for (let k = 0; k < layerSize; k++) {
                    this.scene.pushMatrix();
                    
                    // Calculate the position for the rock
                    const x = j * rockDistance + offset;
                    const y = i*0.75    ;
                    const z = k * rockDistance + offset;

                    // Apply translation
                    this.scene.translate(x, y, z);

                    // Apply scaling
                    const randomScale = this.randomScales[i][j][k];
                    this.scene.scale(randomScale[0], randomScale[1], randomScale[2]);

                    // Display the rock
                    this.rocks[i][j][k].display();

                    this.scene.popMatrix();
                }
            }
        }
    }
}
