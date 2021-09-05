import * as THREE from 'three'

import presetScene, { actions } from 'scene-preset'

import pulseMaterial from '../../materials/pulse'
import simpleMaterial from '../../materials/simple'

import { getRitual, getColorfulBall } from '../../meshes/colorfulBall'
import { getSimpleRitual, getSimpleBall } from '../../meshes/simpleBall'
import { getWalkPath } from '../../meshes/walkPath'

import { setGravityOfGroupAroundPosition } from '../../frame/gravity'

const position = {x: 582 / 4, y: 0, z: 1000 / 4}

const simpleBall = getSimpleBall({
    material: simpleMaterial,
    ...position,
    scale: 10,
}) as any

const simpleRitual = getSimpleRitual({
    amount: 100,
    material: simpleMaterial,
    ...position,
    scale: 1
})

const destinations = [
	position,
	{x: -10, z: -30, y: 0},
	{x: 0, z: 300, y: 0},
	{x: 50, z: -50, y: 0},
	{x: -50, z: 50, y: 0},
].map(position => (
	getWalkPath({position})
))

export default id => presetScene({
    setup({ scene }) {
		console.log(scene)
        scene.add(
			getRitual({
				material: pulseMaterial,
				scale: 3,
				offset: 0.575,
				y: 5
			})
		)
        scene.add(simpleRitual)
        scene.add(simpleBall)
		destinations.forEach(destination => {
			scene.add(destination as any)
		})
        scene.add(getColorfulBall({
			material: pulseMaterial,
			scale: 1750
		}))
        actions.setUniforms( pulseMaterial as any )
    },
	animate({ scene }) {
		setGravityOfGroupAroundPosition(simpleRitual, {
			position, radius: .01
		})
	}
}, `#${id}`)