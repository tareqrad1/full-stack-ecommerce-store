import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-8">
                <h1 className="text-5xl font-extrabold text-red-500">404</h1>
                <h2 className="text-2xl font-semibold mt-4 text-gray-700">
                Oops! Page not found.
                </h2>
                <p className="text-lg text-gray-500 mt-2">
                The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="mt-6">
                <Link to="/" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                    Go to Homepage
                </Link>
                </div>
            </div>
            </div>
    );
};

export default NotFoundPage;
