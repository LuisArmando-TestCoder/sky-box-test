import React, { useEffect } from 'react'
import * as Components from '../..'
import { callScenes3D } from '../../../utils'

export default ({ scenes, className = '', id }) => {
    useEffect(() => callScenes3D(scenes, id), [])

    return (
        <Components.L0.CanvasContainer
            className={`canvas-3d ${className}`}
            id={id}
        />
    )
}