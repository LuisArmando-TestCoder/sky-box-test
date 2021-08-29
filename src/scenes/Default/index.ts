import presetScene, { actions } from 'scene-preset'

import pulseMaterial from './materials/pulse'
import {
    getRitual, getColorfulBall
} from './meshes/colorfulBall'

export default id => presetScene({
    setup({ scene }) {
        scene.add(getRitual({ material: pulseMaterial }))
        scene.add(getColorfulBall({ material: pulseMaterial, scale: 100 }))
        actions.setUniforms( pulseMaterial as any )
    },
}, `#${id}`)