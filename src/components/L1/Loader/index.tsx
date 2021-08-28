import React from 'react'
import * as Components from '../..'
import './style.scss'

export default ({
    className = ''
}) => {

    return (
        <div className={`loader ${className}`}>
            <div className='loader__wrapper'>
                <div className='loader__spinner'>
                    <Components.L0.Copy type='small'>
                        Cargando
                    </Components.L0.Copy>
                </div>
            </div>
        </div>
    )
}