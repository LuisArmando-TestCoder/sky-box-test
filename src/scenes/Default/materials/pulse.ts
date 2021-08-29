import * as THREE from 'three'

import fragmentShader from '../shaders/fragment/pulse'
import vertexShader from '../shaders/vertex/base'

export default new THREE.ShaderMaterial({
    fragmentShader,
    vertexShader,
    side: THREE.DoubleSide
})
