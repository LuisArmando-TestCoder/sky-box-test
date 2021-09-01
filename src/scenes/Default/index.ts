import * as THREE from 'three'

import presetScene, { actions } from 'scene-preset'

export default id => presetScene({
    animate({ scene, camera }) {
        if (scene.getObjectByName('SimpleCube').visible) {
            scene.getObjectByName('SimpleCube').visible = false
            scene.getObjectByName('SimpleFloor').visible = false
        }
    }
}, `#${id}`)