import presetScene, { consulters } from 'scene-preset'

export default id => presetScene({
    animate({ scene, canvasSelector }) {
        const canvasState = consulters.getCanvasState(canvasSelector)

        canvasState.presetConfiguration.camera.cameraVectorsState.position.min.y = -Infinity

        if (scene.getObjectByName('SimpleCube').visible) {
            scene.getObjectByName('SimpleCube').visible = false
            scene.getObjectByName('SimpleFloor').visible = false
        }
    }
}, `#${id}`)