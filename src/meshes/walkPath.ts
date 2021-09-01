import generator from '../utils/generator'

export function getWalkPath(
    position: {
        x: number,
        y: number,
        z: number
    }
) {
    const center = {x: 0, y: 0, z: 0}
    const distances = {
        x: position.x - center.x,
        z: position.z - center.z,
    }
    const mainAngle = Math.atan2(distances.x, distances.z)
    const distance = Math.sqrt(distances.x ** 2 + distances.z ** 2)
    const spacing = 2 // * times size of element -> unless size is 1
    const wobbleScale = 0.1

    const {group: walkPath} = generator({
        amount: Math.floor(distance) / spacing,
        setupChildPosition(index, amount) {
            const currentDistance = (index / amount * distance)
            const wobble = Math.sin(index / amount * 2 * Math.PI) * wobbleScale
            const position = {
                x: Math.sin(mainAngle + wobble) * currentDistance,
                z: Math.cos(mainAngle + wobble) * currentDistance
            }

            return {
                position: {
                    x: position.x,
                    y: center.y,
                    z: position.z
                },
                rotation: {
                    y: Math.sin(mainAngle + wobble)
                }
            }
        },
    })

    return walkPath
}