import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { USER_SHOP } from '@/routes/WebsiteRoute'
import React from 'react'


const breadcrumb = {
    title : 'Shop',
    links : [
        {label : 'Shop' , href : USER_SHOP}
    ]
}

const Shop = () => {
  return (
    <div>
          <WebsiteBreadcrumb title={breadcrumb.title} links={breadcrumb.links} />
    </div>
  )
}

export default Shop