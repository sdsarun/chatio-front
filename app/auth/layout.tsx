import React from 'react'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div
      className='min-h-dvh flex flex-col bg-gradient-to-bl from-white to-gray-300 dark:bg-gradient-to-bl dark:from-gray-800 dark:to-black'
    >{children}</div>
  )
}
