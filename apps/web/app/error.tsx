'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-bg text-custom-primary p-4 selection:bg-emerald-500/20 selection:text-emerald-400">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-extrabold text-rose-500/20 tracking-tighter">
          500
        </h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Something went wrong!
          </h2>
          <p className="text-zinc-400 max-w-[500px] mx-auto">
            An unexpected error has occurred. We apologize for the inconvenience.
          </p>
        </div>
        <div className="pt-4 flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-700 disabled:pointer-events-none disabled:opacity-50"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
