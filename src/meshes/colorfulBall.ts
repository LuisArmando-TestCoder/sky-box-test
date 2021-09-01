import * as THREE from 'three'

export function getColorfulBall({
    x = 0, y = 0, z = 0, scale = 1, material
}): any {
    const geometry = new THREE.SphereBufferGeometry( scale, 100, 100 )
    const mesh = new THREE.Mesh( geometry, material )

    mesh.position.set( x, y, z )

    return mesh
}

export function getRitual({
    material,
    scale = 100,
    amount = 7,
    offset = 0
}): any {
    const group = new THREE.Group()

    for (let index = 0; index < amount; index++) {
        const getWave = waveFunction => Math[waveFunction](
            index / amount * Math.PI * 2 + offset
        ) * (scale * (amount / 2))

        group.add(
            getColorfulBall({
                material,
                scale,
                y: scale,
                z: getWave('sin'),
                x: getWave('cos')
            })
        )
    }

    return group
}