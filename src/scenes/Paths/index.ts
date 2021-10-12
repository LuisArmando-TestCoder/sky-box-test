import presetScene, { actions } from 'scene-preset'

import pulseMaterial from '../../materials/pulse'

import { getWalkPath } from '../../meshes/walkPath'
import { getCubesCube } from '../../meshes/cubesCube'

let destinations = [
    [30, 0, 0],
    [0, 0, 30],

    [30, 0, 30],

    [0, 0, -30],
    [-30, 0, 0],

    [-30, 0, -30],
]

const meshes = destinations.map(
    ([x, y, z], index) => ({
        properties: {
			position: {x, y, z},
            origin: (
                index ? (() => {
                    const [x, y, z] = destinations[index - 1]

                    return {x, y, z}
                })() : {
                    x: 0, z: 0, y: 0
                }
            )
		},
		factories: [getWalkPath, getCubesCube]
    })
).map(({properties, factories}) => (
	factories.map(factory => factory(properties))
)).flat()

export default id => presetScene({
    setup({ scene }) {
		meshes.forEach(mesh => {
			scene.add(mesh as any)
		})
        actions.setUniforms( pulseMaterial as any )
    }
}, `#${id}`)