import React from 'react'

const PageNotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center p-8">
            <h1 className="page-title">404</h1>
            <h2 className="text-3xl mt-4">Oops! Page not found.</h2>
            <p className="mt-4 text-lg">Sorry, the page you're looking for doesn't exist.</p>
            <a href="/" className="mt-6 text-blue-500 text-xl underline">
                Go back to Home
            </a>
        </div>
    )
}

export default PageNotFound
