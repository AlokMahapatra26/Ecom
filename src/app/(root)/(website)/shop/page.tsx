"use client"
import Filter from '@/components/Application/Website/Filter'
import Sorting from '@/components/Application/Website/Sorting'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import useWindowSize from '@/hooks/useWindowSize'


const breadcrumb = {
  title: 'Shop',
  links: [
    { label: 'Shop', href: WEBSITE_SHOP }
  ]
}

const Shop = () => {


  const [limit, setLimit] = useState(9)
  const [sorting, setSorting] = useState('default_sorting')
  const windowSize = useWindowSize();
  const [isMobileFilter , setIsMobileFilter] = useState(false);

  return (
    <div>
      <WebsiteBreadcrumb title={breadcrumb.title} links={breadcrumb.links} />
      <section className='lg:flex lg:px-32 px-4 my-20'>
        {windowSize.width > 1024 ?

          <div className="w-72 me-4">
            <div className='sticky top-0 p-4 rounded bg-accent'>
              <Filter/>
            </div>
          </div> :
          <Sheet  open={isMobileFilter} onOpenChange={()=> setIsMobileFilter(false)}>
            
            <SheetContent side='left' className='block'>
              <SheetHeader className='border-b'>
                <SheetTitle>Filter</SheetTitle>
              </SheetHeader>
              <div className='p-5 overflow-auto h-[calc(100vh-80px)]'>
                <Filter/>
              </div>
            </SheetContent>
          </Sheet>

        }
        <div className='lg:w-[calc(100%-18rem)]'>
          <Sorting limit={limit} setLimit={setLimit} sorting={sorting} setSorting={setSorting} mobileFilterOpen={isMobileFilter} setMobileFilterOpen={setIsMobileFilter} />
        </div>
      </section>
    </div>
  )
}

export default Shop