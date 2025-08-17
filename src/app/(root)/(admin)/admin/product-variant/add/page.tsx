"use client"
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zSchema } from '@/lib/zodSchema'
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW, ADMIN_PRODUCT_VARIANT_SHOW } from '@/routes/AdminPanleRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import slugify from "slugify"
import axios from 'axios'
import useFetch from '@/hooks/useFetch'
import Select from '@/components/Application/Select'
import Editor from '@/components/Application/Admin/Editor'
import MediaModal from '@/components/Application/Admin/MediaModal'
import Image from 'next/image'
import { sizes } from '@/lib/utils'


const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_PRODUCT_VARIANT_SHOW, label: 'Products Variants' },
  { href: "", label: 'Add Product Variants' }
]



const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [productOption, setProductOption] = useState([])
  const { data: getProduct } = useFetch("/api/product?deleteType=SD&&size=10000")

  // media model 
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([])



  useEffect(() => {
    if (getProduct && getProduct.success) {
      const data = getProduct.data
      const options = data.map((product: any) => ({ label: product.name, value: product._id }))
      setProductOption(options);
    }
  }, [getProduct])

  const formSchema = zSchema.pick({
    product: true,
    sku: true,
    color: true,
    size: true,
    mrp: true,
    sellingPrice: true,
    discountPercentage: true,

  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      sku: "",
      color: "",
      size: "",
      mrp: 0,
      sellingPrice: 0,
      discountPercentage: 0,
    },
  });





  // discount calculate
  useEffect(() => {
    const mrp = form.getValues('mrp') || 0
    const sellingPrice = form.getValues('sellingPrice') || 0

    if (mrp > 0 && sellingPrice > 0) {
      const discountPercentage = ((mrp - sellingPrice) / mrp) * 100
      form.setValue('discountPercentage', Math.round(discountPercentage))
    }

  }, [form.watch("mrp"), form.watch('sellingPrice')])




  const onSubmit = async (values: any) => {
    setLoading(true)
    try {
      if (selectedMedia.length <= 0) {
        return alert("please select media")
      }

      const mediaIds = selectedMedia.map(media => media._id)
      values.media = mediaIds;
      const { data: response } = await axios.post("/api/product-variant/create", values)
      if (!response.success) {
        throw new Error(response.message);
      }
      form.reset();
      alert(response.message)
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className="py-0 rounded shadow-none w-full">
        <CardHeader className="border-b-1 py-2 px-3">
          <h4 className="text-xl font-semibold">Add Product Variant</h4>
        </CardHeader>
        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >




              <div className='grid md:grid-cols-2'>


                <div className="m-3">
                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product</FormLabel>
                        <FormControl>
                          <Select
                            options={productOption}
                            selected={field.value}
                            setSelected={field.onChange}
                            isMulti={false}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>



                <div className="m-3">
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Enter SKU Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="m-3">
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter color"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="m-3">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <Select
                            options={sizes}
                            selected={field.value}
                            setSelected={field.onChange}
                            isMulti={false}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="m-3">
                  <FormField
                    control={form.control}
                    name="mrp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MRP</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter MRP"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>


                <div className="m-3">
                  <FormField
                    control={form.control}
                    name="sellingPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selling Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter Selling Price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="m-3">
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Percentage</FormLabel>
                        <FormControl>
                          <Input
                            readOnly
                            type="number"
                            placeholder="Enter Discount Percentage"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>




              </div>


              <div className='md:col-span-2 border border-dashed rounded p-5 text-center m-3'>
                <MediaModal open={open} setOpen={setOpen} selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} isMultiple={true} />

                {
                  selectedMedia.length > 0
                  &&
                  <div className='flex justify-center items-center flex-wrap mb-3 gap-2'>{
                    selectedMedia.map((media => (
                      <div key={media._id} className='h-24 w-24 border'>
                        <Image src={media.url} height={100} width={100} className='size-full object-cover' alt='' />
                      </div>
                    )))
                  }</div>


                }
                <div onClick={() => setOpen(true)} className='bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer'>
                  <span className='font-semibold'>Select Media</span>
                </div>
              </div>




              <div className="m-3">
                <ButtonLoading
                  type="submit"
                  text="Add Product Variant"
                  loading={loading}
                  className="cursor-pointer"
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProduct

