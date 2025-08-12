"use client"
import React from 'react'
import ThemeSwitch from '@/components/Application/Admin/ThemeSwitch'
import UserDropdown from './UserDropdown'
import { Button } from '@/components/ui/button'
import { RiMenu4Fill } from 'react-icons/ri'
import { useSidebar } from '@/components/ui/sidebar'


const Topbar = () => {


  const {toggleSidebar} = useSidebar();

  return (
    <div className="fixed top-0 left-0 z-30 w-full h-14 border-b px-4 flex items-center justify-between bg-primary-foreground ">
      <div className=" text-base ml-[260px]">
        Search Component
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitch />
        <UserDropdown />
        <Button type="button" size="icon" className='md:hidden' onClick={toggleSidebar}>
          <RiMenu4Fill className="text-xl" />
        </Button>
        
      </div>
    </div>
  )
}


export default Topbar
