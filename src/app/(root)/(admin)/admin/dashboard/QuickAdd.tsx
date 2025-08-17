import { ADMIN_CATEGORY_ADD, ADMIN_COUPON_ADD, ADMIN_MEDIA_EDIT, ADMIN_MEDIA_SHOW, ADMIN_PRODUCT_ADD } from '@/routes/AdminPanleRoute'
import Link from 'next/link'
import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { IoShirtOutline } from 'react-icons/io5'
import { LuUserRound } from 'react-icons/lu'
import { MdOutlinePermMedia, MdOutlineShoppingBag } from 'react-icons/md'
import { RiCoupon2Fill, RiCoupon2Line } from 'react-icons/ri'

const QuickAdd = () => {
  return (
    <div
    className='grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-10 gap-5 mt-10'
    >
        <Link href={ADMIN_CATEGORY_ADD}>
            <div className='flex items-center justify-between p-3 rounded-lg bg-card border' >
              <h4 className='font-medium'>Add Category</h4>
              <span className='w-12 h-12 border rounded-full flex justify-center items-center'>
                <BiCategory size={20}/>
              </span>
            </div>
        </Link>
        <Link href={ADMIN_PRODUCT_ADD}>
            <div className='flex items-center justify-between p-3 rounded-lg bg-card border' >
              <h4 className='font-medium'>Add Product</h4>
              <span className='w-12 h-12 border rounded-full flex justify-center items-center'>
                <IoShirtOutline size={20}/>
              </span>
            </div>
        </Link>
        <Link href={ADMIN_COUPON_ADD}>
            <div className='flex items-center justify-between p-3 rounded-lg bg-card border' >
              <h4 className='font-medium'>Add Coupon</h4>
              <span className='w-12 h-12 border rounded-full flex justify-center items-center'>
                <RiCoupon2Line size={20}/>
              </span>
            </div>
        </Link>
        <Link href={ADMIN_MEDIA_SHOW}>
            <div className='flex items-center justify-between p-3 rounded-lg bg-card border' >
              <h4 className='font-medium'>Upload Media</h4>
              <span className='w-12 h-12 border rounded-full flex justify-center items-center'>
                <MdOutlinePermMedia size={20}/>
              </span>
            </div>
        </Link>
    </div>
  )
}

export default QuickAdd