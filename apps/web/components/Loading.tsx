'use client'

import { useEffect, useState } from 'react'

const Loading = () => {
  const [rotation, setRotation] = useState(0)

  const list = [1, 2, 3, 4]
  const colors = ['blue', 'red', 'green', 'yellow']

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 1)
    }, 10)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className='w-full h-16 flex justify-center items-center relative'
      style={{ perspective: '120px' }}
    >
      <div
        className='w-14 aspect-square flex items-center justify-center relative transition-transform duration-500 ease-out'
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {list.map((l) => {
          return (
            <div
              key={l}
              className='absolute w-full h-full transition-all duration-300 bg-purple-800'
              style={{
                transform: `rotateY(${(l - 1) * 90}deg) translateZ(30px)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'visible',
                // backgroundColor: colors[l - 1],
              }}
            >
              <div className='w-full h-full flex justify-center items-center'>
                {/* {l} */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Loading
