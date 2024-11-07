'use client'
import { lazy, Suspense } from 'react'

const SkeletonCard = lazy(() => import('@/components/v1/skeletonCard'))

export default function LoadingTemplate() {
  return (

    <main className="flex min-h-screen flex-col p-10">
      <div role="status" className="animate-pulse flex sm:flex md:flex md:items-center">
        <div className="flex items-center justify-center w-screen h-72 bg-skeletonColor rounded dark:bg-detailsbordercolor">
          <svg
            className="w-10 h-20 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </Suspense>
    </main>


  );
}
