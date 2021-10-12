import * as THREE from 'three'

function getMaterialsMap(model) {
    return new Map(
        model.materials.map(materialObject => {
            return [
                materialObject.uuid,
                new THREE[materialObject.type]({
                    color: materialObject.color,
                })
            ]
        })
    )
}

function getGeometriesMap(model) {
    const firstValueIndex = 2

    return new Map(
        model.geometries.map(geometryObject => {
            return [
                geometryObject.uuid,
                new THREE[geometryObject.type](
                    Object.values(
                        geometryObject
                    ).slice(firstValueIndex)
                )
            ]
        })
    )
}

function addChildrenToObject({
    modelTree,
    materialsMap,
    geometriesMap,
}) {
    // need the object to be wrapped
    // ... a group before hand

    const element = new THREE[modelTree.type]()

    modelTree.children.forEach(modelElement => {
        let object3D

        if (modelElement.children) {
            object3D = addChildrenToObject({
                modelTree: modelElement,
                materialsMap,
                geometriesMap,
            })
        } else if (modelElement.geometry && modelElement.material) {
            const material = materialsMap.get(modelElement.material)
            const geometry = geometriesMap.get(modelElement.geometry)

            object3D = new THREE[modelElement.type](material, geometry)
        }

        object3D.name = modelElement.name

        element.add(object3D)
    })

    element.name = modelTree.name

    return element
}

export default model => {
    const materialsMap = getMaterialsMap(model)
    const geometriesMap = getGeometriesMap(model)
    const object = addChildrenToObject({
        modelTree: model.object,
        materialsMap,
        geometriesMap,
    })

    return object
}