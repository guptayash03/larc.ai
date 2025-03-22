
import React from 'react'
import HistoryContainer from './history-container'
import { ModeToggle } from './mode-toggle'

import Login from './login'
import Image from 'next/image'

export const Header: React.FC = async () => {
  return (
    <header className="absolute  w-full p-2 flex justify-between items-center z-10 backdrop-blur lg:backdrop-blur-none bg-background/80 lg:bg-transparent">
      <div className="flex gap-0.5 items-center">
          <HistoryContainer />
        <div className='md:hidden'>
          <a href="/">
            <Image src='/logo.png' className='opacity-85' alt='Larc AI' width={80} height={80} />
            <span className="sr-only">Larc AI</span>
          </a>
        </div>
      </div>
      <div className='flex gap-1.5 items-center'>
        <Login />
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
