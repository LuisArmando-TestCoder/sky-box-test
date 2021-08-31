export function getNewGravityVelocity(reference, particle) {
    const distance = {
      x: reference.position.x - particle.position.x,
      y: reference.position.y - particle.position.y,
      z: reference.position.z - particle.position.z,
    }

    const gravityCalculation =
        reference.radius /
        // radius is taken as a mass
        // if the mass is too big it wont be too diminished
        // ... by the distance 

        particle.radius /
        // if the particle mass is alike it will diminish
        // ... the reference influence,
        // ... or increase it if it is too little

        Math.sqrt(
            distance.x ** 2 + distance.y ** 2 + distance.z ** 2
        )

    const angleXY = Math.atan2(distance.x, distance.y)
    const angleXZ = Math.atan2(distance.x, distance.z)

    return {
        x: Math.sin(angleXZ) * gravityCalculation,
        y: Math.cos(angleXY) * gravityCalculation,
        z: Math.sin(angleXZ) * gravityCalculation,
    }
}

export function setGravityOfGroupAroundPosition(group, {position, radius}) {
    group.children.forEach(child => {
        child.position.x += child.velocity.x
        child.position.y += child.velocity.y
        child.position.z = position.z + child.velocity.z

        const {
            x, y, z
        } = getNewGravityVelocity({position, radius}, child)

        child.velocity.x += x
        child.velocity.y += y
        child.velocity.z += z
    })
}

// /*
//     arccos[
//         (xa * xb + ya * yb + za * zb) / (
//             √(xa^2 + ya^2 + za^2) * √(xb^2 + yb^2 + zb^2)
//         )
//     ]
// */
//     const angle = Math.acos(
//         (
//             reference.position.x * particle.position.x +
//             reference.position.y * particle.position.y +
//             reference.position.z * particle.position.z
//         ) / (
//             Math.sqrt(
//                 particle.position.x ** 2 +
//                 particle.position.y ** 2 +
//                 particle.position.z ** 2
//             ) * Math.sqrt(
//                 reference.position.x ** 2 +
//                 reference.position.y ** 2 +
//                 reference.position.z ** 2
//             ) 
//         )
//     )
