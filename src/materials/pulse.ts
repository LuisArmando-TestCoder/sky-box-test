import * as THREE from 'three'

import fragmentShader from '../shaders/fragment/pulse'
import vertexShader from '../shaders/vertex/default'

export default new THREE.ShaderMaterial({
    fragmentShader,
    vertexShader,
    side: THREE.DoubleSide
})
