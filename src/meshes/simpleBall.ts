import * as THREE from 'three'

export function getSimpleBall({
    material,
    position,
    velocity = {x: 0, y: 0, z: 0},
    scale = 1
}) {
    const geometry = new THREE.SphereBufferGeometry(scale, scale, scale)
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(
        position.x,
        position.y,
        position.z
    )

    mesh['velocity'] = velocity
    mesh['radius'] = scale

    return mesh
}

export function getSimpleRitual({
    material,
    scale = 1,
    amount = 7,
    distanceFromCenter = 50,
    x = 0, y = 0, z = 0
}): any {
    const group = new THREE.Group()

    for (let index = 0; index < amount; index++) {
        const getWave = waveFunction => Math[waveFunction](
            index / amount * Math.PI * 2
        ) * distanceFromCenter

        group.add(
            getSimpleBall({
                material,
                scale,
                position: {
                    x: getWave('sin') + x,
                    y: getWave('cos') + y,
                    z,
                }
            })
        )
    }

    return group
}