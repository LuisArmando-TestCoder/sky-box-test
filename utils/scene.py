import os
import sys

def executeConditionalPath(path, callback):
    if not os.path.exists(path):
        print("Proceeding to create: ", path)

        callback(path)

def createFile(path, contents):
    file = open(path, "w")
    file.write(contents)
    file.close()

sceneName = input("Scene name: ")
folderPath = f"../src/scenes/{sceneName}"

executeConditionalPath(
    folderPath,
    lambda path: os.makedirs(path)
)

executeConditionalPath(
    f"{folderPath}/index.ts",
    lambda path: createFile(
        path,
        "import * as THREE from 'three'\n\n" +

        "import presetScene, { actions } from 'scene-preset'\n\n" +

        "export default id => presetScene({\n" +
            "\tsetup({ scene }) {},\n" +
            "\tanimate({ scene }) {}\n" +
        "}, `#${id}`)"
    )
)
