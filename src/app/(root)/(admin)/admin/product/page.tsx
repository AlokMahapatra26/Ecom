"use client"
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import DatatableWrapper from '@/components/Application/Admin/DatatableWrapper'
import DeleteAction from '@/components/Application/Admin/DeleteAction'
import EditAction from '@/components/Application/Admin/EditAction'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DT_PRODUCT_COLUMN } from '@/lib/column'
import { columnConfig } from '@/lib/helperFunction'
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_EDIT, ADMIN_PRODUCT_SHOW, ADMIN_TRASH } from '@/routes/AdminPanleRoute'
import { FilePlus } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'


const ShowProduct = () => {

  const columns = useMemo(()=>{
    return columnConfig(DT_PRODUCT_COLUMN)
  },[])

  const action = useCallback((row:any , deleteType:any , handleDelete:any) => {
    let actionMenu:any = []
    actionMenu.push(<EditAction key="edit" href={ADMIN_PRODUCT_EDIT(row.original._id)}/>)
    actionMenu.push(<DeleteAction key="delete" handleDelete={handleDelete} row={row} deleteType={deleteType}/>)
    return actionMenu
  } , [])

  const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: 'Home' },
    { href: ADMIN_PRODUCT_SHOW, label: 'Product' },
  ]

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className="py-0 rounded shadow-none w-full gap-0">
        <CardHeader className="border-b-1 py-2 px-3">
          <div className='flex justify-between items-center'>
            <h4 className="text-xl font-semibold">Show Products</h4>
            <Button>
              <FilePlus />
              <Link href={ADMIN_PRODUCT_ADD}>
                New Product
              </Link>
            </Button>
          </div>

        </CardHeader>
        <CardContent className=" px-0 ">
              <DatatableWrapper
              queryKey="product-data"
              fetchUrl="/api/product"
              initialPageSize={10}
              columnsConfig={columns}
              exportEndpoint="/api/product/export"
              deleteEndpoint="/api/product/delete"
              deleteType="SD"
              trashView={`${ADMIN_TRASH}?trashof=product`}
              createAction={action}
              />
        </CardContent>
      </Card>
    </div>
  )
}

export default ShowProduct