'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="p-4 md:p-6">
      <div className="mb-8 space-y-4">
        <h1 className="font-semibold text-lg md:text-2xl">
          An error occurred
        </h1>
        <p>
          Something went wrong while fetching the data. Please try again later.
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
