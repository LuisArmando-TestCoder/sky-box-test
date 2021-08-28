import React from 'react'

import {
    Helmet,
} from 'react-helmet'
import {
    RecoilRoot,
} from 'recoil'
import RecoilOutside from 'recoil-outside'
import './styles.scss'

export default ({ children, title, className = '' }) => {
    const HelmetWrapper = Helmet as any

    return (
        <RecoilRoot>
            <RecoilOutside/>
            <HelmetWrapper title={title}/>
            <main className={`global-wrapper ${className}`}>
                {children}
            </main>
        </RecoilRoot>
    )
}