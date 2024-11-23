import React, { lazy } from 'react'
const PageNotFound = lazy(() => import('./PageNotFound'))

const CheckPage = (Component) => {
    return (props) => {
        try {
            if (!Component) <PageNotFound />
            return <Component {...props} />
        } catch (error) {
            return <PageNotFound />
        }
    }
}

export default CheckPage
