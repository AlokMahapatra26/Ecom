import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

export function response<T = any>(
  success: boolean,
  statusCode: number,
  message: string,
  data: T = {} as T
) {
  return NextResponse.json<ApiResponse<T>>({
    success,
    statusCode,
    message,
    data,
  });
}

export const catchError = (error:any , customMessage?:any) => {
  //handling duplicate key error
  if(error.code === 11000){
    const keys = Object.keys(error.keyPattern).join(",")
    error.message = `Duplicate field: ${keys}. These field value must be  unique`
  }

  let errorObj = {
    message : customMessage,
    error
  }

  if(process.env.NODE_ENV === "development"){
    errorObj = {
      message: error.message,
      error
    }
  }else{
    errorObj= {
      message: customMessage || 'Internal server error' ,
      error
    }
  }

  return response(false , error.code , errorObj.message)
}

export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
}

export const isAuthenticated = async (role: unknown) => {
  try{
    const cookieStore = await cookies();
    if(!cookieStore.has("access_token")){
      return {
        isAuth : false
      }
    }

    const access_token = cookieStore.get("access_token")
    if (!access_token || !access_token.value) {
      return {
        isAuth: false
      }
    }
    const {payload} = await jwtVerify(access_token.value , new TextEncoder().encode(process.env.SECRET_KEY) )

    if(payload.role !== role){
      return {
        isAuth : false
      }
    }

    return {
      isAuth : true,
      userId: payload._id
    }

  }catch(error){
    return {
      isAuth : false,
      error
    }
  }
}