# CG 2023/2024

## Group T06G07

## TP 3 Notes

- In exercise 1 we learned how to define the normal vectors for the objects
. 
- We also learned how to create different materials, with different colors and effects.

![Wood Cube](tp3/screenshots/cg-t06g07-tp3-1.png)

- We learned how to apply different materials to different objects in the scene.

- The major difficulty in this exercise was to declare different normal vectors in the same vertice, wich we solved by creating points with the same coordinates as the original one and apply the normal vectors in the auxiliary points

![Tangram](tp3/screenshots/cg-t06g07-tp3-2.png)

- In exercise 2, we learned to find patterns in defining shapes, such as in the index list and the vertex positions, and utilized them to make an infinitely scalable prism shape through loops.

- Also in exercise 2, we learned how to calculate the normals needed for Constant Shading, which are the normals for each individual polygon that consitutes the overall shape, causing the same shading per polygon, which ends up being a very "flat" and "edgy" type of shading.

- In this exercise, we had difficulties obtaining the actually expected shading, as despite having the correct normals, the shading was still very smooth, due to the indexes, however we managed to fix this by correcting the indexes to correspond to the same polygon's vertices.

![](tp3/screenshots/cg-t06g07-tp3-3.png)

- In exercise 3, we learned how to apply Gouraud Shading and to simplify index/vertex lists.

- This exercise was relatively simple, and was executed without much difficulty.

![](tp3/screenshots/cg-t06g07-tp3-4.png)
