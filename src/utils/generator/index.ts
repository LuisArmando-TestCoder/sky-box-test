import * as THREE from 'three'

import defaultFragmentShader from '../../shaders/fragment/default'
import defaultVertexShader from '../../shaders/vertex/default'

export default (
    {
        amount = 1,
        setupChildPosition,
        setupGroup,
        material,
        geometry,
        name = 'generated',
        vertexShader = defaultVertexShader,
        fragmentShader = defaultFragmentShader
    }: {
        amount?: number
        setupChildPosition?: (
            index: number,
            amount: number,
            mesh: THREE.Object3D
        ) => ({
            position?: {
                x?: number
                y?: number
                z?: number
            }
            rotation?: {
                x?: number
                y?: number
                z?: number
            }
        })
        setupGroup?: (
            group: THREE.Group,
            mesh: THREE.Object3D
        ) => void
        material?: THREE.Material
        vertexShader?: string
        fragmentShader?: string
        geometry?: THREE.BufferGeometry
        name?: string
    }
) => {
    const group = new THREE.Group()

    group.name = name

    const currentGeometry = geometry ?? new THREE.BoxBufferGeometry(
        1, 1, 1
    )
    const currentMaterial = material ?? new THREE.ShaderMaterial({
        fragmentShader, vertexShader
    })
    const mesh = new THREE.Mesh(currentGeometry, currentMaterial)

    if (setupChildPosition && amount >= 1) {
        for (let index = 0; index < amount; index++) {
            const childMesh = mesh.clone()

            childMesh.name = `${name}-child`

            const {position, rotation} =(
                setupChildPosition?.(
                    index, amount, childMesh
                ) || {
                    position: {x: 0, y: 0, z: 0},
                    rotation: {x: 0, y: 0, z: 0}
                }
            )

            childMesh.position.set(
                position.x || 0,
                position.y || 0,
                position.z || 0,
            )

            childMesh.rotation.set(
                rotation.x || 0,
                rotation.y || 0,
                rotation.z || 0,
            )

            group.add(childMesh)
        }
    }

    setupGroup?.(group, mesh)

    return {
        group,
        frame(
            callback: (
                value: THREE.Object3D,
                index: number,
                array: THREE.Object3D[]
            ) => void
        ) {
            group.children.forEach(callback)
        }
    }
}