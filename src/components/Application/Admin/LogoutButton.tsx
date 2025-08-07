"use client"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React from 'react'
import { LogOut } from 'lucide-react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/reducer/authReducer'
import { useRouter } from 'next/navigation'
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'


const LogoutButton = () => {

    const dispatch = useDispatch();
    const router = useRouter()

    const handleLogout = async () => {
        try{
            const {data: logoutResponse} = await axios.post("/api/auth/logout");

            if(!logoutResponse){
                throw new Error(logoutResponse.messsage)
            }

            dispatch(logout())
            alert(logoutResponse.message)
            router.push(WEBSITE_LOGIN)

        }catch(error:any){
           alert(error.message)
        }
    }

  return (
     <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
      <LogOut color='red'/>
      Logout
     
    </DropdownMenuItem>
  )
}

export default LogoutButton