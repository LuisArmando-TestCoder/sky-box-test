import * as THREE from 'three'

import presetScene, { actions } from 'scene-preset'

import pulseMaterial from '../../materials/pulse'
import simpleMaterial from '../../materials/simple'

import { getRitual, getColorfulBall } from '../../meshes/colorfulBall'
import { getSimpleRitual, getSimpleBall } from '../../meshes/simpleBall'
import { getWalkPath } from '../../meshes/walkPath'

import { setGravityOfGroupAroundPosition } from '../../frame/gravity'

const position = {x: 582, y: 365, z: 1000}

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

const walkPath = getWalkPath(position)

export default id => presetScene({
    setup({ scene }) {
        scene.add(
			getRitual({
				material: pulseMaterial,
				scale: 3,
				offset: 0.575
			})
		)
        scene.add(simpleRitual)
        scene.add(simpleBall)
		console.log(simpleBall)
        scene.add(walkPath as any)
        scene.add(getColorfulBall({
			material: pulseMaterial, scale: 1750
		}))
        actions.setUniforms( pulseMaterial as any )
    },
	animate({ scene }) {
		setGravityOfGroupAroundPosition(simpleRitual, {
			position, radius: .01
		})
	}
}, `#${id}`)