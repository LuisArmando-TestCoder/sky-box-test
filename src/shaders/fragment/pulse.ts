export default `
uniform float iTime;
uniform vec3 iResolution;
varying vec3 fragCoord;

float getHillPattern(float x) {
    return -(sin(-x)+2.)*log(abs(abs(mod(x,2.)) - 1.)) / 100.;
}
 
void main() {
    vec2 uv = fragCoord.xy/vec2(1680., 1050.)-.5;

    vec3 col = (
        getHillPattern((uv.x/uv.y+iTime/10.)*10.)
    )*vec3(0,2,4);

    gl_FragColor = vec4(col,1.0);
}
`