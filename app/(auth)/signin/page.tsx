import React from 'react'
import SignInform from '@/components/signin/signInForm'
export default function pags() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-y-4'>
      <p className='text-xl'>Sign In</p>
      <SignInform />
    </div>
  )
}
