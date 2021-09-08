import * as THREE from 'three'

import presetScene, { actions } from 'scene-preset'

import pulseMaterial from '../../materials/pulse'
import simpleMaterial from '../../materials/simple'

import { getRitual, getColorfulBall } from '../../meshes/colorfulBall'
import { getSimpleRitual, getSimpleBall } from '../../meshes/simpleBall'
import { getWalkPath } from '../../meshes/walkPath'
import { getCubesCube } from '../../meshes/cubesCube'
import { getCustomGeometry } from '../../meshes/customGeometry'
import { getFence } from '../../meshes/fence'

import { setGravityOfGroupAroundPosition } from '../../frame/gravity'

const position = {x: 582 / 10, y: 0, z: 1000 / 10}

const gravityParticles = getSimpleRitual({
    amount: 100,
    material: simpleMaterial,
    ...position,
    scale: 1
})

const destinations = [
	{
		properties: {
			position: {x: -50, z: 0, y: 0},
			width: 10
		},
		factories: [getFence, getWalkPath]
	},
	{
		properties: {
			material: pulseMaterial,
			scale: 1,
			offset: 0.575,
			position: {x: 50, z: -10, y: 0}
		},
		factories: [getRitual, getWalkPath]
	},
	{
		properties: {
			material: simpleMaterial,
			position,
			scale: 3,
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
	{
		properties: {
			material: pulseMaterial,
			scale: 1750
		},
		factories: [getColorfulBall]
	}
].map(({properties, factories}) => (
	factories.map(factory => factory(properties))
)).flat()

export default id => presetScene({
    setup({ scene }) {
        scene.add(gravityParticles)
		destinations.forEach(destination => {
			scene.add(destination as any)
		})
        actions.setUniforms( pulseMaterial as any )
    },
	animate() {
		setGravityOfGroupAroundPosition(gravityParticles, {
			position, radius: .01
		})
	}
}, `#${id}`)