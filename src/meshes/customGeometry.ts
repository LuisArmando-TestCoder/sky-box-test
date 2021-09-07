import * as THREE from 'three'

export const getCustomGeometry = ({position}) => {
    const geometry = new THREE.BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    const vertices = new Float32Array( [
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,

        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0, -1.0,  1.0,
        
        -3.0, -3.0,  3.0,
        3.0, -3.0,  3.0,
        3.0,  3.0,  3.0,

        3.0,  3.0,  3.0,
        -3.0,  3.0,  3.0,
        -3.0, -3.0,  3.0,
        
        -5.0, -5.0,  5.0,
        5.0, -5.0,  5.0,
        5.0,  5.0,  5.0,

        5.0,  5.0,  5.0,
        -5.0,  5.0,  5.0,
        -5.0, -5.0,  5.0,
    ] );

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

    const material = new THREE.MeshBasicMaterial( { color: '#fff', side: THREE.DoubleSide} );
    const mesh = new THREE.Mesh( geometry, material );

    mesh.position.set(
        position.x, position.y, position.z
    )

    return mesh
} 