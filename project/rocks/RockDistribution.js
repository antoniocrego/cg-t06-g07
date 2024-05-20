import { CGFobject } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockDistribution extends CGFobject {
    constructor(scene, numRocks) {
        super(scene);
        this.numRocks = numRocks;
        this.rocks = [];
        this.randomScales = [];
        this.randomPositions = [];
        this.initBuffers();
    }

    initBuffers() {
        // Initialize rocks, their random scales, and random positions
        for (let i = 0; i < this.numRocks; i++) {
            const rock = new MyRock(this.scene, 10, 10, 1);
            this.rocks.push(rock);
            
            // Random scale for each rock
            const randomScale = [Math.random() * 0.7 + 0.7, Math.random() * 0.2 + 0.4, Math.random() * 0.7 + 0.7];
            this.randomScales.push(randomScale);

            // Random position for each rock
            const randomPosition = [
                Math.random()*100,
                0,
                Math.random()*100
            ];
            this.randomPositions.push(randomPosition);
        }
    }

    display() {
        for (let i = 0; i < this.numRocks; i++) {
            this.scene.pushMatrix();
            
            const randomPosition = this.randomPositions[i];
            this.scene.translate(randomPosition[0], randomPosition[1], randomPosition[2]);

            const randomScale = this.randomScales[i];
            this.scene.scale(randomScale[0], randomScale[1], randomScale[2]);

            this.rocks[i].display();

            this.scene.popMatrix();
        }
    }
}
