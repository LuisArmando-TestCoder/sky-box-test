
import React from 'react'
import './styles.scss'

type Copy = 'small'
          |'normal'
          | 'title'
          | 'subtitle'
interface Properties {
    children
    type: Copy
    className?: string
}

export default ({
    children,
    type,
    className = ''
}: Properties) => {

    return (
        <span className={`copy copy--${
            type
        } ${className}`}>
            {children}
        </span>
    )
}