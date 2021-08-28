import React from 'react'
import * as Components from '../components'

export default () => {
  return (
    <Components.L0.GlobalWrapper title='Home'>
      <Components.L1.Canvas3D
        scenes={['Default']}
        id='MainScene'
      />
    </Components.L0.GlobalWrapper>
  )
}
