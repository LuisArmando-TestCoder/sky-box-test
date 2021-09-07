import * as THREE from 'three'
import getProceduralGroup from '../utils/getProceduralGroup'

export const getCubesCube = ({position}) => {
    const cubesCube = getProceduralGroup([
        {
            geometry: new THREE.BoxBufferGeometry(.5, .5, .5),
            getPropertiesFactory: () => ({
                position: {
                    x: indices => indices[0],
                    y: indices => indices[1],
                    z: indices => indices[2],
                }
            }),
            dimensions: [3, 3, 3]
        }
    ])

    cubesCube.position.set(
        position.x, position.y, position.z
    )

    return cubesCube
}