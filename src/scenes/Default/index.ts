import presetScene, { actions } from 'scene-preset'

export default id => presetScene({
    setup() {
        actions.blacklistControls([
            'setFirstPersonZoom',
            'setCanvasAutoFocus',
        ], `#${id}`)
    },
}, `#${id}`)