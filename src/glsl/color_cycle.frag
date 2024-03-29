#define PI 3.14

uniform vec4 LMa; // Light-Material ambient
uniform vec4 LMd; // Light-Material diffuse
uniform vec4 LMs; // Light-Material specular
uniform float shininess;

uniform vec2 uvs; // in
uniform vec3 lightPosition; // Object-space
uniform vec3 eyePosition; // Object-space

varying vec2 normalMapTexCoord; // out
varying vec3 lightDirection; // out
varying vec3 eyeDirection; // out
varying vec3 normal; // out

uniform float timePreviousFrame; // in
uniform float timeCurrentFrame; // in

uniform sampler2D normalMap;
uniform sampler2D texture;
uniform sampler2D heightField;
uniform samplerCube envmap;

float frequency = 0.75;
float phaseR = 0.0;
float phaseG = PI/3.0;
float phaseB = 2.0*PI/3.0;


void main() {

	float red = sin(frequency*timeCurrentFrame + phaseR);
	float green = sin(frequency*timeCurrentFrame + phaseG);
	float blue = sin(frequency*timeCurrentFrame + phaseB);

	float diffuse = dot(lightDirection, normal);

	float amountLightToEye = dot(reflect(lightDirection, normal), eyeDirection);
	float specular = pow(amountLightToEye, shininess);

	vec4 phong = clamp(LMa + LMd*diffuse + specular*LMs, 0.0, 1.0);

	gl_FragColor = clamp(vec4(phong.r + red, phong.g + green, phong.b + blue, 1.0), 0.0, 1.0);
}
