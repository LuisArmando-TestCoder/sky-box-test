type ParsedNumbers = {[index: string]: number}

export default class Pagination {
    lowerBoundary: number = 1
    centerValue: number
    parsed: ParsedNumbers
    onChange: Function

    constructor({
        pagesAmount,
        currentPage,
        onChange,
    }) {
        this.onChange = onChange

        this.parsed = {
            pagesAmount: Number(pagesAmount),
            currentPage: Number(currentPage),
        }

        this.centerValue = this.parsed.currentPage
        + +(this.parsed.currentPage === this.lowerBoundary)
        - +(this.parsed.currentPage === this.parsed.pagesAmount)
    }

    getItems() {
        return this.getDefaultPaginationItems( 
            this.getFilteredPaginationConditionalSteps({
                initial: {
                    number: this.lowerBoundary,
                    ellipsisSide: this.getEllipsisSide('right', this.lowerBoundary)
                },
                before: this.getCurrentStep(-1),
                center: this.getCurrentStep(0),
                after: this.getCurrentStep(1),
                final: {
                    number: this.parsed.pagesAmount,
                    ellipsisSide: this.getEllipsisSide('left', this.parsed.pagesAmount)
                },
            })
        )
    }

    getEllipsisSide(direction, comparison) {
        const directions = {right: 2, left: -2}

        return this.parsed.currentPage !== comparison + directions[direction] && direction
    }

    getPaginationEllipsisSideClass(paginationItem) {
        return paginationItem?.ellipsisSide && `pagination__item--${
            paginationItem?.ellipsisSide
        }`
    }

    getPaginationCurrentClass(paginationItem) {
        return paginationItem?.current && `pagination__button--${
            paginationItem?.current
        }`
    }

    sendOnChangeUpdate(event) {
        const newValue = Number(event.target.innerText)
        const isUpdateInBoundaries = newValue < this.parsed.pagesAmount + 1
                                  && newValue > 0
        const isOnChangeFunction = typeof this.onChange === 'function'
    
        if (isUpdateInBoundaries && isOnChangeFunction) {
            this.onChange(newValue)
        }
    }

    getCurrentStep(direction) {
        const number = this.centerValue + direction
        const havingCurrentPage = number === this.parsed.currentPage
    
        return {
            number,
            current: havingCurrentPage && 'current'
        }
    }

    getDefaultPaginationItems(paginationItems) {
        return this.parsed.pagesAmount > this.lowerBoundary - 1
            && this.parsed.currentPage <= this.parsed.pagesAmount
            && this.parsed.currentPage >= this.lowerBoundary
            ? paginationItems : []
    }

    getFilteredPaginationConditionalSteps({
        initial, before, center, after, final
    }) {
        const isFarInitial = this.parsed.currentPage - 1 > this.lowerBoundary
        const isFarFinal = this.parsed.currentPage < this.parsed.pagesAmount - 1
        const initialStep = isFarInitial && this.getComparedOutcome(initial, before)
        const beforeStep = before.number >= this.lowerBoundary && before
        const centerStep = this.getInclusiveLowerOutcome(center)
        const afterStep = this.getInclusiveLowerOutcome(after)
        const finalStep = isFarFinal && this.getComparedOutcome(final, after)
    
        return [
            initialStep,
            beforeStep,
            centerStep,
            afterStep,
            finalStep,
        ].filter(item => Object.keys(item).length)
    }

    getComparedOutcome(firstValue, secondValue) {
        return firstValue.number !== secondValue.number ? firstValue : {}
    }

    getInclusiveLowerOutcome(value) {
        return value.number <= this.parsed.pagesAmount ? value : {}
    }
}