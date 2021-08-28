import React from 'react'
import {
    Icons as IconsState
} from '../../../state'
import {
    useRecoilValue
} from '../../../utils'

interface Properties {
    name: 'magnifying-glass' | 'back' | 'sleep-mode'
        | 'shopping-cart' | 'settings' | 'sunny-day'
    className?: string
}

const Icon = ({
    name,
    className = ''
}: Properties) => {
    const icon = useRecoilValue(IconsState, {
        transform: icons => icons[name]
    })

    return (
        <span
            className={`icon ${className}`}
            dangerouslySetInnerHTML={{__html: icon as any}}
        />
    )
}

export default (properties: Properties) => {
    return (
        <Icon {...properties}/>
    )
}