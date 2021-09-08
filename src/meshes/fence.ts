import * as THREE from 'three'
import getProceduralGroup from '../utils/getProceduralGroup'

const getFenceTables = width => ({
    geometry: new THREE.CylinderBufferGeometry(.1,.1,width,20),
    getPropertiesFactory: () => ({
        position: {
            y: indices => indices[0] / 1.5 - .5,
        },
        rotation: {
            x: () => Math.PI / 2
        }
    }),
    dimensions: [3]
})

const getFencePoles = width => ({
    geometry: new THREE.CylinderBufferGeometry(.1,.1,3,20),
    getPropertiesFactory: () => ({
        position: {
            z: indices => (width / 2) - indices,
        }
    }),
    dimensions: [width + 1]
})

export const getFence = ({position, width}) => {
    const group = getProceduralGroup([
        getFenceTables(width),
        getFencePoles(width)
    ])

    group.position.set(
        position.x, position.y, position.z
    )

    return group
}