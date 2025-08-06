"use client"
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import Image from 'next/image'
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
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
import axios from 'axios'
import OTPVerification from '@/components/Application/OTPVerification'
import { zSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import UpdatePassword from '@/components/Application/UpdatePassword'

const ResetPassword = () => {

    const [emailVerificationLoading , setEmailVerificationLoading ] = useState(false)
    const [otpVerificationLoading , setOtpVerificationLoading] = useState(false);
    const [otpEmail , setOtpEmail] = useState("");
    const [isOtpVerified , setIsOtpVerified] = useState(false);


    const formSchema = zSchema.pick({
        email : true,
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues : {
            email: ""
        }
    })


    const handleEmailVerification = async (values:any) => {
         try{
      setEmailVerificationLoading(true)
      const {data: sendOtpResponse} = await axios.post('/api/auth/reset-password/send-otp' , values);
      if(!sendOtpResponse.success){
        throw new Error(sendOtpResponse.message)
      }
      
      setOtpEmail(values.email)
      alert(sendOtpResponse.message)

    }catch(error:any){
      alert(error.message)
    }finally{
      setEmailVerificationLoading(false);
    }
    }



    const handleOtpVerification = async (values:any) => {
         try{
      setOtpVerificationLoading(true)
      const {data: otpResponse} = await axios.post('/api/auth/reset-password/verify-otp' , values);
      if(!otpResponse.success){
        throw new Error(otpResponse.message)
      }
      alert(otpResponse.message)
      setIsOtpVerified(true);
    }catch(error:any){
      alert(error.message)
    }finally{
      setOtpVerificationLoading(false);
    }
    }





  return (
       <Card className='w-[400px]'>
      <CardContent>
        <div className='flex justify-center'>
          <Image src="/images/logo-white-1.png" width={150} height={150} alt='logo' className='max-w-[150px]'></Image>
        </div>

        {
          !otpEmail 
            ?
            <>
            <div className='text-center'>
          <h1 className='text-3xl font-bold'>Reset Password</h1>
          <p>Enter your email for password reset</p>
        </div>
        <br />
        <div className='mt-5'>
           <Form {...form}>
      <form onSubmit={form.handleSubmit(handleEmailVerification)}>
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
          <ButtonLoading type='submit' text="Send OTP" loading={emailVerificationLoading}  className='w-full cursor-pointer'/>
        </div>
        <div className='text-center gap-1'>
          <div className='flex justify-center'>
            <Link href={WEBSITE_LOGIN} className='text-primary underline'>Back to login</Link>
          </div>
        </div>
      </form>
    </Form>
        </div>
            </> 
            :

            <>
             {
                !isOtpVerified ?  <OTPVerification email={otpEmail} loading={otpVerificationLoading} onSubmit={handleOtpVerification}/> : 
                <UpdatePassword email={otpEmail}/>
            }
            </>
           
            
           
           
            
        }

        
      </CardContent>
    </Card>
  )
}

export default ResetPassword