import { zSchema } from '@/lib/zodSchema'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import ButtonLoading from './ButtonLoading'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import axios from 'axios'

const OTPVerification = ({email , onSubmit , loading }:{email:any , onSubmit:any , loading : any}) => {

  const [isResendingOtp , setIsResendingOtp] = useState(false)

  const formSchema = zSchema.pick({
    otp:true,email:true
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues : {
        otp : "",
        email : email
    }
  })



  const handleOtpVerification = async (values:any) => {
    onSubmit(values)
  }

  const resendOTP = async () => {
     try{
      setIsResendingOtp(true)
      const {data: resendOtpResponse} = await axios.post('/api/auth/resend-otp' , {email});
      if(!resendOtpResponse.success){
        throw new Error(resendOtpResponse.message)
      }
      
      alert(resendOtpResponse.message)
    }catch(error:any){
      alert(error.message)
    }finally{
      setIsResendingOtp(false);
    }
  }

  return (
    <div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOtpVerification)}>
        <div className='text-center mb-4'>
            <h1 className='text-2xl font-bold mb-2'>Please complete verification</h1>
            <p className='text-md opacity-80'>We have sent an OTP to your registered email address. The OTP is valid for 10 minute only</p>
        </div>
        
        <div className='mb-5 mt-5 flex justify-center'>
          <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-semibold'>One-time Password (OTP)</FormLabel>
              <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot  className="text-xl size-10" index={0} />
                    <InputOTPSlot className="text-xl size-10" index={1} />
                    <InputOTPSlot className="text-xl size-10" index={2} />
                    <InputOTPSlot className="text-xl size-10" index={3} />
                    <InputOTPSlot className="text-xl size-10" index={4} />
                    <InputOTPSlot className="text-xl size-10" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='mb-3'>
          <ButtonLoading type='submit' text="Verify" loading={loading}  className='w-full cursor-pointer'/>
          <div className='text-center mt-5'>
            {
                !isResendingOtp ?
                <div>
                    <button  onClick={resendOTP} type='button' className='cursor-pointer hover:underline'>Resend OTP</button>
                </div> :
                <span className='text-md'>Resending...</span>
            }
          </div>
        </div>
      </form>
    </Form>
    </div>
  )
}

export default OTPVerification