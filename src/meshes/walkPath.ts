import generator from '../utils/generator'

interface Vector3D {
    x?: number
    y?: number
    z?: number
}

function getWobbledPosition({
    amount,
    index,
    wobbleScale,
    distance,
    distances,
}: {
    amount: number
    index: number
    wobbleScale: number
    distance: number
    distances: Vector3D
}) {
    const mainAngle = Math.atan2(distances.x, distances.z)
    const currentDistance = (index / amount * distance)
    const wobble = Math.sin(index / amount * 2 * Math.PI) * wobbleScale

    return {
        x: Math.sin(mainAngle + wobble) * currentDistance,
        y: index / amount * distances.y,
        z: Math.cos(mainAngle + wobble) * currentDistance
    }
}

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
        y: position.y - center.y,
        z: position.z - center.z,
    }
    const distance = Math.sqrt(distances.x ** 2 + distances.z ** 2)
    const spacing = 2 // * times size of element -> unless size is 1
    const wobbleScale = 0.1

    const {group: walkPath} = generator({
        size: {y: .1},
        amount: Math.floor(distance) / spacing,
        setupChildPosition(index, amount) {
            const getCurrentPosition = index => getWobbledPosition({
                amount, index, wobbleScale, distance, distances,
            })
            const currentPosition = getCurrentPosition(index)
            const nextPosition = getCurrentPosition(index + 1)
            

            return {
                position: currentPosition,
                rotation: {
                    y: Math.atan2(
                        currentPosition.x - nextPosition.x,
                        currentPosition.z - nextPosition.z
                    )
                }
            }
        },
    })

    return walkPath
}