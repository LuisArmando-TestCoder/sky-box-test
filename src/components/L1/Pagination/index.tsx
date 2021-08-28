import React from 'react'
import Pagination from './Pagination'
import * as Components from '../..'
import './style.scss'

interface Properties {
    className?: string
    pagesAmount: number
    currentPage: number | React.Dispatch<
        React.SetStateAction<
            number
        >
    >
    onChange: Function
}

export default ({
    className = '',
    pagesAmount,
    currentPage,
    onChange
}: Properties) => {
    const pagination = new Pagination({
        pagesAmount,
        currentPage,
        onChange
    })

    return (
        <ul className={`pagination ${className}`}>
            {
                pagination
                .getItems()
                .map(paginationItem => {
                    return (
                        <li
                            className={`pagination__item ${
                                pagination
                                .getPaginationEllipsisSideClass
                                .call(
                                    pagination,
                                    paginationItem
                                )
                            }`}
                            key={paginationItem.number}
                        >
                            <button
                                className={`pagination__button ${
                                    pagination
                                    .getPaginationCurrentClass
                                    .call(
                                        pagination,
                                        paginationItem
                                    )
                                }`}
                                onClick={
                                    pagination
                                    .sendOnChangeUpdate
                                    .bind(pagination)
                                }
                            >
                                <Components.L0.Copy type='small'>
                                    {paginationItem.number}
                                </Components.L0.Copy>
                            </button>
                        </li>
                    )
                })
            }
        </ul>
    )
}