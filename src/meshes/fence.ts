import * as THREE from 'three'
import {consulters} from 'scene-preset'

const getFenceTables = width => ({
    geometry: new THREE.CylinderBufferGeometry(.1, .1, width, 20),
    getIntersectionMesh(indices, mesh) {
        mesh.position.y = indices[0] / 1.5 - .5
        mesh.rotation.x = Math.PI / 2

        return mesh
    },
    dimensions: [3]
})

const getFencePoles = width => ({
    geometry: new THREE.CylinderBufferGeometry(.1, .1, 3, 20),
    getIntersectionMesh(indices, mesh) {
        mesh.position.z = width / 2 - indices

        return mesh
    },
    dimensions: [width + 1]
})

export const getFence = ({position, width}) => {
    const group = consulters.getProceduralGroup([
        getFenceTables(width) as any,
        getFencePoles(width)
    ])

    group.position.set(
        position.x, position.y, position.z
    )

    return group
}