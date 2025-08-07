"use client"
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import { LuChevronRight } from 'react-icons/lu';
import {IoMdClose} from "react-icons/io"
import { adminAppSidebarMenu } from '@/lib/adminSidebarMenu';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import Link from 'next/link';
import { CollapsibleContent } from '@/components/ui/collapsible';

const AppSidebar = () => {

    const {toggleSidebar} = useSidebar();

  return (
    <Sidebar className='z-50'>
      <SidebarHeader className='border-b h-14 p-0'>
        <div className='flex justify-between items-center px-4'>
            <h2>Rudra silk saree</h2>
            <Button type='button' size="icon" className='md:hidden' onClick={toggleSidebar}>
                <IoMdClose/>
            </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
            {adminAppSidebarMenu.map((menu ,index)=>(
                <Collapsible key={index} className='group/collapsible'>
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton asChild className='font-semibold px-2 py-5'>
                                <Link href={menu?.url}>
                                    <menu.icon />
                                    {menu.title}

                                    {menu.submenu && menu.submenu.length > 0 && 
                                     <LuChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90'/>
                                    }
                                </Link>
                            </SidebarMenuButton>
                        </CollapsibleTrigger>

                        {menu.submenu && menu.submenu.length > 0 && 
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {menu.submenu.map((submenuItem , submenuIndex)=>(
                                    <SidebarMenuSubItem key={submenuIndex}>
                                        <SidebarMenuSubButton asChild className='px-2 py-2'>
                                            <Link href={submenuItem.url}>{submenuItem.title}</Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent> }
                    </SidebarMenuItem>
                </Collapsible>
            ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar