"use client"
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zSchema } from '@/lib/zodSchema'
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from '@/routes/AdminPanleRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import slugify from "slugify"
import axios from 'axios'


const AddCategory = () => {


  const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: 'Home' },
    { href: ADMIN_CATEGORY_SHOW, label: 'Category' },
    { href: "", label: 'Add category' }
  ]


  const [loading, setLoading] = useState(false);
    
      const formSchema = zSchema.pick({
        name : true,
        slug : true
      });
    
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name : "",
          slug : ""
        },
      });

      useEffect(()=>{
        const name = form.getValues('name')
        if(name){
          form.setValue('slug' , slugify(name).toLowerCase())
        }
      },[form.watch('name')])


      const onSubmit = async (values:any) => {
        setLoading(true)
        try{
          const {data : response} = await axios.post("/api/category/create" , values)
          if(!response.success){
            throw new Error(response.message);
          }
          form.reset();
          alert(response.message)
        }catch(error){

        }finally{
          setLoading(false);
        }
      }


  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData}/>
      <Card className="py-0 rounded shadow-none w-full lg:w-1/2">
        <CardHeader className="border-b-1 py-2 px-3">
          <h4 className="text-xl font-semibold">Add Category</h4>
        </CardHeader>
        <CardContent className="pb-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter Category Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter slug"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <ButtonLoading
                  type="submit"
                  text="Add Category"
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

export default AddCategory

