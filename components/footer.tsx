import Link from 'next/link'
import React from 'react'
import { SiInstagram, SiLinkedin, SiYoutube } from 'react-icons/si'
import { Button } from './ui/button'

const Footer: React.FC = () => {
  return (
    <footer className="w-fit p-1 md:p-2 fixed bottom-0 right-0 hidden lg:block">
      <div className="flex justify-end">
        <Button
          variant={'ghost'}
          size={'icon'}
          className="text-muted-foreground/50"
        >
          <Link
            href="https://www.linkedin.com/company/the-larc-ai/"
            target="_blank"
          >
            <SiInstagram size={18} />
          </Link>
        </Button>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="text-muted-foreground/50"
        >
          <Link
            href="https://www.linkedin.com/company/the-larc-ai/"
            target="_blank"
          >
            <SiLinkedin size={18} />
          </Link>
        </Button>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="text-muted-foreground/50"
        >
          <Link
            href="https://www.linkedin.com/company/the-larc-ai/"
            target="_blank"
          >
            <SiYoutube size={20} />
          </Link>
        </Button>
      </div>
    </footer>
  )
}

export default Footer
