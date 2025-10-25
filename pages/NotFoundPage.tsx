
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-9xl font-black text-sky-500">404</h1>
      <p className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
        Page Not Found
      </p>
      <p className="mt-4 text-slate-400">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 inline-block rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
