"use client"
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zSchema } from '@/lib/zodSchema'
import { ADMIN_COUPON_SHOW, ADMIN_DASHBOARD } from '@/routes/AdminPanleRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import axios from 'axios'


const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_COUPON_SHOW, label: 'Coupons' },
  { href: "", label: 'Add Coupon' }
]



const AddCoupon = () => {
  const [loading, setLoading] = useState(false);


  const formSchema = zSchema.pick({
    code: true,
    discountPercentage: true,
    minShoppingAmount: true,
    validity: true,

  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      discountPercentage: 0,
      minShoppingAmount: 0,
      validity:0,

    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true)
    try {
      const { data: response } = await axios.post("/api/coupon/create", values)
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
          <h4 className="text-xl font-semibold">Add Coupon</h4>
        </CardHeader>
        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >

              <div className='grid md:grid-cols-2'>
                <div className="m-3">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Enter Code" {...field} />
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




                <div className="m-3">
                  <FormField
                    control={form.control}
                    name="minShoppingAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Shopping Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter Minimum Shopping Amount"
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
                    name="validity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Validity</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>



              



              <div className="m-3">
                <ButtonLoading
                  type="submit"
                  text="Add Coupon"
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

export default AddCoupon

