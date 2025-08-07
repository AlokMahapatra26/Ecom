"use client"
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { IoShirtOutline } from 'react-icons/io5'
import { MdOutlineShoppingBag } from 'react-icons/md'
import LogoutButton from '@/components/Application/Admin/LogoutButton'

const UserDropdown = () => {

  

  const auth = useSelector((store:any) => store.authStore.auth)

  return (
    <DropdownMenu>
  <DropdownMenuTrigger asChild className='cursor-pointer '>
    <Avatar>
  <AvatarImage src="" />
  <AvatarFallback>R</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent className='me-6 w-44 p-2'>
    <DropdownMenuLabel>
      <p className='font-semibold'>Admin</p>
    
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem asChild>
      <Link href="" className='cursor-pointer'>
      <IoShirtOutline/>
      New Product
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem asChild>
      <Link href="" className='cursor-pointer'>
      <MdOutlineShoppingBag/>
      Orders
      </Link>
    </DropdownMenuItem>
    <LogoutButton/>

  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default UserDropdown