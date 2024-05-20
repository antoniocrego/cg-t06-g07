#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

uniform float timeDelta;

void main() {
    vec4 color;

	vec4 panorama = texture2D(uSampler, vTextureCoord);
	vec4 clouds = texture2D(uSampler2, vTextureCoord+vec2(0.005*timeDelta, 0.0));

    color = 1.0*panorama + 0.3*clouds;

	gl_FragColor = color;
}
