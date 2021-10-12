export default `
uniform float iTime;
uniform vec3 iResolution;
varying vec3 fragCoord;

float squared(float value) { return value * value; }

void main()
{    
	vec2 uvTrue = fragCoord.xy / iResolution.xy;
    vec2 uv = -1.0 + 2.0 * uvTrue;
    
	float lineIntensity;
    float glowWidth;
    vec3 color = vec3(0.0);
    
	for(float i = 0.0; i < 5.0; i++) {
        
		uv.y += (0.25 * sin(uv.x + i - iTime * 0.6));
        lineIntensity = 0.4 + squared(1.6 * abs(mod(uvTrue.x + i / 1.3 + iTime,2.0) - 1.0));
		glowWidth = abs(lineIntensity / (150.0));
		color += vec3(glowWidth * (2.0 + sin(iTime * 0.13)),
                      glowWidth * (2.0 - sin(iTime * 0.23)),
                      glowWidth * (2.0 - cos(iTime * 0.19)));
	}	
	
	gl_FragColor = vec4(color, 1.0);
}
`