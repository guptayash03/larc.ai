import Link from "next/link"
import { IoHome } from "react-icons/io5";
import Image from "next/image";
import { HistoryList } from './history-list'
import { HistoryIcon } from "lucide-react";
import { HiPencilAlt } from "react-icons/hi";

export function Sidebar() {
  return (
    <div className="md:flex flex-col hidden h-[100%] relative p-2.5 ">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-2">
          <Link href={'/'} className="border dark:border-border text-base p-1.5 md:p-2 rounded-md dark:text-primary text-input">
            <IoHome />
          </Link>
          <a href="/">
            <Image src='/logo.png' className='opacity-85' alt='Larc AI' width={80} height={80} />
            <span className="sr-only">Larc AI</span>
          </a>
        </div>
        <Link href={'/'} className="border dark:border-border text-base p-1.5 md:p-2 rounded-md dark:text-primary text-input">
          <HiPencilAlt size={18} />
        </Link>
      </div>
      <div className="flex flex-col h-full justify-center overflow-y-scroll scrollbar-hide">
        <div className="flex items-center gap-1 p-1 mt-8 mb-2">
          <HistoryIcon size={16} />
          <p className="font-semibold text-sm font-sans "> History </p>
        </div>
        <HistoryList userId="anonymous" />
      </div>
    </div>
  )
}
