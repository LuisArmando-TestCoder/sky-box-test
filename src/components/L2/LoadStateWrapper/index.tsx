import React from 'react'
import {
    useRecoilValueLoadable
} from 'recoil'
import * as Components from '../..'

export default ({
    className = '',
    recoilState,
    loaded,
}) => {
    const valueLoadable = useRecoilValueLoadable(recoilState)
    const Loaded = loaded
    
    return (
        <div className={`load-state-wrapper ${className}`}>
            {{
                hasValue: () => <Loaded content={valueLoadable.contents}/>,
                loading: () => <Components.L1.Loader/>,
                hasError: () => <Components.L1.Loader/>,
            }[valueLoadable.state]()}
        </div>
    )
}