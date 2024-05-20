
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;
uniform float random;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main() {
	vTextureCoord = aTextureCoord;
	
	vec3 offset=vec3(0.0,0.0, aVertexPosition[1] * aVertexPosition[1] * random *(sin(timeFactor*100.0)*0.01));

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

