  
import React from 'react'

import './style.scss'

export default ({ id, className = '', reference = null }) => {
    return (
        <div className={`canvas-container ${className}`}>
            <canvas
                className='canvas-container__canvas'
                ref={reference}
                id={id}
                tabIndex={0}
            />
        </div>
    )
}