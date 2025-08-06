"use client"
import {use, useEffect, useState} from "react"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"
import Link from "next/link"
import { WEBSITE_HOME } from "@/routes/WebsiteRoute"
import { Button } from "@/components/ui/button"

const EmailVarification = ({params}) => {
  const {token} = use(params)
  const [isVerified , setIsVerified] = useState(false);
  

  useEffect(()=>{
    const varify = async () => {
      const {data: verificationResponse} = await axios.post('/api/auth/verify-email' , {token})

      if(verificationResponse.success){
        setIsVerified(true)
      }
     
    }
    varify();
  },[token])

  console.log(token);
  return (
    <Card className="w-[400px]">
      <CardContent>
        {
          isVerified ?
           <div className="">
                <h1 className="text-2xl text-green-500 my-4">Email verification success</h1>
                <Button asChild>
                  <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                </Button>
           </div> :
           <div className="">
                <h1 className="text-2xl text-red-500 my-4">Email verification failed</h1>
                 <Button asChild>
                  <Link href={WEBSITE_HOME}>Continue Shopping </Link>
                 </Button>
           </div>
        }
      </CardContent>
    </Card>
  )
  

}

export default EmailVarification;