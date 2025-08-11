import { catchError } from "@/lib/helperFunction";
import { NextResponse } from "next/server";
import cloudinary  from "@/lib/cloudinary"

export async function POST(request:Request){
    try{
        const payload = await request.json()
        const {paramsToSign} = payload

        const secretKey = process.env.CLOUDINARY_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json({
                success: false,
                error: "CLOUDINARY_SECRET_KEY is not set in environment variables."
            });
        }

        const signature = cloudinary.utils.api_sign_request(paramsToSign, secretKey);

        return NextResponse.json({signature})
    }catch(error){
        return catchError(error)
    }
}