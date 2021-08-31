import * as THREE from 'three'

export function getSimpleBall({
    material,
    x, y, z,
    velocity = {x: 0, y: 0, z: 0},
    scale = 1
}) {
    const geometry = new THREE.SphereBufferGeometry(scale, scale, scale)
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(x, y, z)

    mesh['velocity'] = velocity
    mesh['radius'] = scale

    return mesh
}

export function getSimpleRitual({
    material,
    scale = 1,
    amount = 7,
    x = 0, y = 0, z = 0
}): any {
    const group = new THREE.Group()

    for (let index = 0; index < amount; index++) {
        const getWave = waveFunction => Math[waveFunction](
            index / amount * Math.PI * 2
        ) * 500

        group.add(
            getSimpleBall({
                material,
                scale,
                x: getWave('sin') + x,
                y: getWave('cos') + y,
                z,
            })
        )
    }

    return group
}