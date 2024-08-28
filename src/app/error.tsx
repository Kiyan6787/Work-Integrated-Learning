"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <div className="flex justify-center align-bottom h-screen">
        <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 grid place-items-center lg:px-8">
          <div className="mx-auto max-w-max">
            <main className="sm:flex">
              <p className="bg-gradient-to-br from-blue-900 to-cyan-600 bg-clip-text md:text-7xl font-bold tracking-tight text-transparent text-6xl">
                OOPS
              </p>
              <div className="sm:ml-6">
                <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                    Something Went Wrong
                  </h1>
                  <p className="mt-1 text-base text-gray-500">Try again, if this happens again contact support</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
