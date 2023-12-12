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
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <>
      <div className="container">
        <h1>ERROR !!</h1>
        {error.name === 'NotFoundUserError' ? (
          <h2>존재하지 않는 유저입니다.</h2>
        ) : (
          <h2>잘못된 접근입니다.</h2>
        )}
      </div>
    </>
  )
}
