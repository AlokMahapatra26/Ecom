"use client"
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import Image from 'next/image'
import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { zSchema } from '@/lib/zodSchema'
import z from 'zod'
import { FaRegEyeSlash } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'
import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ButtonLoading from '@/components/Application/ButtonLoading'
import { WEBSITE_REGISTER } from '@/routes/WebsiteRoute'


const LoginPage = () => {

  const [loading , setLoading] = useState(false);
  const [isTypePassword , setIsTypePassword] = useState(true);

  const formSchema = zSchema.pick({
    email: true,
  }).extend({
    password:z.string().min(8 , "Password field is required")
  })


    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     email:"",
     password:""
    },
  })

  type LoginFormValues = {
  email: string;
  password: string;
  };

  const handleLoginSubmit = async (values:LoginFormValues) => {
    console.log(values)
  }


  return (
    <Card className='w-[400px]'>
      <CardContent>
        <div className='flex justify-center'>
          <Image src="/images/logo-white-1.png" width={150} height={150} alt='logo' className='max-w-[150px]'></Image>
        </div>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Login Into Account</h1>
        </div>
        <br />
        <div className='mt-5'>
           <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
        <div className='mb-3'>
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
          <div className='mb-3'>
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type={isTypePassword ? "password" : "text"} placeholder="********" {...field} />
                
              </FormControl>
              <button className="absolute top-1/2 right-2 cursor-pointer" type='button' onClick={()=> setIsTypePassword(!isTypePassword)}>
                  {isTypePassword ?  <FaRegEyeSlash/> : <FaRegEye/>}
                   
                </button>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='mb-3'>
          <ButtonLoading type='submit' text="Login" loading={loading}  className='w-full cursor-pointer'/>
        </div>
        <div className='text-center gap-1'>
          <div className='flex justify-center'>
            <p>Don't have account?</p>
            <Link href={WEBSITE_REGISTER} className='text-primary underline'>Create account</Link>
          </div>
          <div className='mt-3'>
            <Link href="" className='text-primary underline'>Forgot password?</Link>
          </div>
        </div>
      </form>
    </Form>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginPage