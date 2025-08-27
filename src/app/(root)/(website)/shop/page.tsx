import Filter from '@/components/Application/Website/Filter'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import React from 'react'


const breadcrumb = {
    title : 'Shop',
    links : [
        {label : 'Shop' , href : WEBSITE_SHOP}
    ]
}

const Shop = () => {
  return (
    <div>
          <WebsiteBreadcrumb title={breadcrumb.title} links={breadcrumb.links} />
          <section className='lg:flex lg:px-32 px-4 my-20'>
            <div className="w-72 me-4">
                <div className='sticky top-0 p-4 rounded bg-accent'>
                    <Filter/>
                </div>
            </div>
          </section>
    </div>
  )
}

export default Shop