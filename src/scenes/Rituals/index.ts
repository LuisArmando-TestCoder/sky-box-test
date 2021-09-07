import * as THREE from 'three'

import presetScene, { actions } from 'scene-preset'

import pulseMaterial from '../../materials/pulse'
import simpleMaterial from '../../materials/simple'

import { getRitual, getColorfulBall } from '../../meshes/colorfulBall'
import { getSimpleRitual, getSimpleBall } from '../../meshes/simpleBall'
import { getWalkPath } from '../../meshes/walkPath'
import { getCubesCube } from '../../meshes/cubesCube'
import { getCustomGeometry } from '../../meshes/customGeometry'

import { setGravityOfGroupAroundPosition } from '../../frame/gravity'

const position = {x: 582 / 10, y: 0, z: 1000 / 10}

const simpleRitual = getSimpleRitual({
    amount: 100,
    material: simpleMaterial,
    ...position,
    scale: 1
})

const destinations = [
	{
		properties: {
			material: simpleMaterial,
			position,
			scale: 10,
		},
		factories: [getSimpleBall, getWalkPath]
	},
	{
		properties: {
			position: {x: 10, z: -30, y: 0},
		},
		factories: [getWalkPath, getCubesCube]
	},
	{
		properties: {
			position: {x: -50, z: -50, y: 0},
		},
		factories: [getWalkPath, getCustomGeometry]
	},
].map(({properties, factories}) => (
	factories.map(factory => factory(properties))
)).flat()

export default id => presetScene({
    setup({ scene }) {
        scene.add(
			getRitual({
				material: pulseMaterial,
				scale: 3,
				offset: 0.575,
				y: 5
			})
		)
        scene.add(simpleRitual)
		destinations.forEach(destination => {
			scene.add(destination as any)
		})
        scene.add(getColorfulBall({
			material: pulseMaterial,
			scale: 1750
		}))
        actions.setUniforms( pulseMaterial as any )
    },
	animate() {
		setGravityOfGroupAroundPosition(simpleRitual, {
			position, radius: .01
		})
	}
}, `#${id}`)