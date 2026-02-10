'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1876D2]/20 to-[#00B0FF]/20 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1876D2] mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading 3D Experience...</p>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onError={() => {
          console.warn('Spline scene failed to load, showing fallback');
        }}
      />
    </Suspense>
  )
}
