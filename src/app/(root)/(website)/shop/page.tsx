"use client"
import Filter from '@/components/Application/Website/Filter'
import Sorting from '@/components/Application/Website/Sorting'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import React, { useState } from 'react'


const breadcrumb = {
    title : 'Shop',
    links : [
        {label : 'Shop' , href : WEBSITE_SHOP}
    ]
}

const Shop = () => {


  const [limit , setLimit] = useState(9)

  return (
    <div>
          <WebsiteBreadcrumb title={breadcrumb.title} links={breadcrumb.links} />
          <section className='lg:flex lg:px-32 px-4 my-20'>
            <div className="w-72 me-4">
                <div className='sticky top-0 p-4 rounded bg-accent'>
                    <Filter/>
                </div>
            </div>


            <div className='lg:w-[calc(100%-18rem)]'>
              <Sorting limit={limit} setLimit={setLimit}/>
            </div>
          </section>
    </div>
  )
}

export default Shop