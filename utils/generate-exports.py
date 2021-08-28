import os
import fnmatch
import re

def getIndexExportContent(directories, additional):
    importPrefix = ''
    exportSuffix = 'export {\n'
 
    for directory in directories:
        importPrefix += f'import {additional} {directory} from \'./{directory}\'\n'
        exportSuffix += f'   {directory},\n'
 
    exportSuffix += '}\n'
 
    content = f'{importPrefix}\n{exportSuffix}'
 
    return content

def createIndexExportFile(folderPath, additional):
    for _, directories, _ in os.walk(folderPath):
        if len(directories) > 0:
 
            file = open(f'{folderPath}/index.ts',"w+")
 
            file.write(getIndexExportContent(directories, additional))
 
            file.close()
        break

def setFolderExports(folderNames, additional = ''):
    print('Automatic export defaults: ', folderNames)
 
    for folderName in folderNames:
        folderPath = f'../src/{folderName}'
 
        createIndexExportFile(folderPath, additional)

setFolderExports([
    'utils',
    'state',
    'scenes',
    'objects/L0',
    'objects/L1',
    'objects/L2',
    'objects/L3',
    'objects/L4',
    'components/L0',
    'components/L1',
    'components/L2',
    'components/L3',
    'components/L4',
])

setFolderExports([
    'components',
    'objects',
], '* as')