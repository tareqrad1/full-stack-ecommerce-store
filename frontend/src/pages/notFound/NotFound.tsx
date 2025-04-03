import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
            <div className="flex items-center justify-center min-h-screen">
            <div className="text-center p-8">
                <h1 className="text-5xl font-extrabold text-red-500">404</h1>
                <h2 className="text-2xl font-semibold mt-4">
                Oops! Page not found.
                </h2>
                <p className="text-lg text-gray-400 mt-2">
                The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="mt-6">
                <Link to="/" className="px-6 py-2 text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition">
                    Go to Homepage
                </Link>
                </div>
            </div>
            </div>
    );
};

export default NotFoundPage;
