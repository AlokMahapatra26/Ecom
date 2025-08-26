import MainSlider from '@/components/Application/Website/MainSlider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import banner1 from '../../../../public/banner1.png'
import banner2 from '../../../../public/banner2.png'
import FeaturedProduct from '@/components/Application/Website/FeaturedProduct'
import Testimonial from '@/components/Application/Website/Testimonial'

const Home = () => {
  return (
    <div className='min-h-screen'>
      <section>
        <MainSlider/>
      </section>
      <section className='lg:px-32 px-4 sm:pt-29 pt-5 pb-10'>
        <div className='grid grid-cols-2 sm:gap-10 gap-2'>
            <div className='border rounded-lg overflow-hidden'>
              <Link href="">
                <Image 
                
                src={banner1.src}
                width={banner1.width}
                height={banner1.height}
                alt='banner - 1'
                className='transition-all hover:scale-110'
                />
              </Link>
            </div>
             <div className='border rounded-lg overflow-hidden'>
              <Link href="">
                <Image 
                
                src={banner2.src}
                width={banner2.width}
                height={banner2.height}
                alt='banner - 2'
                className='transition-all hover:scale-110'
                />
              </Link>
            </div>
        </div>
      </section>
      <FeaturedProduct/>
      <Testimonial/>
      
    </div>
  )
}

export default Home