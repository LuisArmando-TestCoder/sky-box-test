import presetScene, { actions } from 'scene-preset'

import pulseMaterial from './materials/pulse'
import simpleMaterial from './materials/simple'

import { getRitual, getColorfulBall } from './meshes/colorfulBall'
import { getSimpleRitual, getSimpleBall } from './meshes/simpleBall'
import { setGravityOfGroupAroundPosition } from './frame/gravity'

const position = {y: 0, x: 100, z: 1000}

const simpleBall = getSimpleBall({
    material: simpleMaterial,
    ...position,
    scale: 10,
}) as any

const simpleRitual = getSimpleRitual({
    amount: 1000,
    material: simpleMaterial,
    ...position,
    scale: 1
})

export default id => presetScene({
    setup({ scene }) {
        scene.add(getRitual({ material: pulseMaterial, scale: 1 }))
        scene.add(simpleRitual)
        scene.add(simpleBall)
        scene.add(getColorfulBall({ material: pulseMaterial, scale: 1750 }))
        actions.setUniforms( pulseMaterial as any )
    },
    animate({ scene }) {
        if (scene.getObjectByName('SimpleCube').visible) {
            scene.getObjectByName('SimpleCube').visible = false
            scene.getObjectByName('SimpleFloor').visible = false
        }

        setGravityOfGroupAroundPosition(simpleRitual, {position, radius: 10})
    }
}, `#${id}`)