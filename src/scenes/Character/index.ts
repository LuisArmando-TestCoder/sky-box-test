import * as THREE from 'three'
import presetScene from 'scene-preset'
import getThreeJSModelObject from './getThreeJSModelObject'
import model from './model.json'

export default id => presetScene({
    setup({ scene, canvasSelector }) {
        const object = getThreeJSModelObject(model)
        console.log(object, scene, THREE)
        // scene.add(object as any)
    }
}, `#${id}`)