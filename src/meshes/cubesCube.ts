import * as THREE from 'three'
import {consulters} from 'scene-preset'

export const getCubesCube = ({position}) => {
    const cubesCube = consulters.getProceduralGroup([
        {
            geometry: new THREE.BoxBufferGeometry(.5, .5, .5) as any,
            getIntersectionMesh(indices, mesh) {
                mesh.position.set(
                    indices[0],
                    indices[1],
                    indices[2]
                )

                return mesh
            },
            dimensions: [3, 3, 3]
        }
    ])

    cubesCube.position.set(
        position.x, position.y, position.z
    )

    return cubesCube
}