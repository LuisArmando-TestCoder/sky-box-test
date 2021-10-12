import presetScene, { consulters, actions } from 'scene-preset'
import { getColorfulBall } from '../../meshes/colorfulBall'


import pulseMaterial from '../../materials/pulse'

export default id => presetScene({
    setup({scene}) {
        actions.setUniforms( pulseMaterial as any )
        scene.add(
            getColorfulBall({ material: pulseMaterial, scale: 1750 })
        )
    },
    animate({ scene, canvasSelector }) {
        const canvasState = consulters.getCanvasState(canvasSelector)

        canvasState.presetConfiguration.camera.cameraVectorsState.position.min.y = -Infinity

        if (scene.getObjectByName('SimpleCube').visible) {
            scene.getObjectByName('SimpleCube').visible = false
            scene.getObjectByName('SimpleFloor').visible = false
        }
    }
}, `#${id}`)