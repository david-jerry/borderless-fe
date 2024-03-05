/* eslint-disable @next/next/no-img-element */
import Button from '@/components/ui/Button'
import React from 'react'

export default function Home() {

  return (
    <>
      <div className="w-screen h-screen padding-x pt-24 bg-primary/30 relative z-10">
        <img src="/hero/background-image.jpg" alt="borderless" width="100" height="100" className="w-screen h-screen absolute top-0 left-0 right-0 object-cover z-0" />
        {/* <img src="/hero/borderless-clip.png" className={`mx-auto h-24 md:h-36 flex object-fill`} alt="borderless clipart relative z-10" /> */}
      </div>
    </>
  )
}
