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
import { WEBSITE_LOGIN} from '@/routes/WebsiteRoute'
import axios from 'axios'


const RegisterPage = () => {

  const [loading , setLoading] = useState(false);
  const [isTypePassword , setIsTypePassword] = useState(true);

  const formSchema = zSchema.pick({
    name:true,
    email: true,
    password:true,
  }).extend({
    confirmPassword : z.string()
  }).refine((data) => data.password === data.confirmPassword , {
    message : "Password must be same",
    path:['confirmPassword']
  })


    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     name : "",
     email:"",
     password:"",
     confirmPassword : ""
    },
  })

  type RegisterFormValues = {
    name : string,
    email: string;
    password: string;
    confirmPassword: string
  };

  const handleRegisterSubmit = async (values:RegisterFormValues) => {
    try{
      setLoading(true)
      const {data: registerResponse} = await axios.post('/api/auth/register' , values);
      if(!registerResponse.success){
        throw new Error(registerResponse.message)
      }

      form.reset()
      alert(registerResponse.message)
    }catch(error:any){
      alert(error.message)
    }finally{
      setLoading(false);
    }
  }


  return (
    <Card className='w-[400px]'>
      <CardContent>
        <div className='flex justify-center'>
          <Image src="/images/logo-white-1.png" width={150} height={150} alt='logo' className='max-w-[150px]'></Image>
        </div>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>Create Account</h1>
        </div>
        <br />
        <div className='mt-5'>
           <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
        <div className='mb-5'>
          <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='mb-5'>
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
          <div className='mb-5'>
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
                
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
         <div className='mb-5'>
          <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Confirm Password</FormLabel>
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
          <ButtonLoading type='submit' text="Create Account" loading={loading}  className='w-full cursor-pointer'/>
        </div>
        <div className='text-center gap-1'>
          <div className='flex justify-center'>
            <p>Already have an account?</p>
            <Link href={WEBSITE_LOGIN} className='text-primary underline'>Login</Link>
          </div>
          
        </div>
      </form>
    </Form>
        </div>
      </CardContent>
    </Card>
  )
}

export default RegisterPage