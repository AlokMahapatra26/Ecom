import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";

export async function POST(request:Request){
    try{
        await connectDB()
        const payload = await request.json()
        const validationSchema = zSchema.pick({
            otp:true, email:true,
        })

        const validatedData = validationSchema.safeParse(payload);
        if(!validatedData.success){
            return response(false , 401 , 'Invalid or missing input field', validatedData.error)
        }

        const {email , otp} = validatedData.data

        const getOtpData = await OTPModel.findOne({email , otp})
        if(!getOtpData){
            return response(false, 404 , 'Invalid or expired otp' , validatedData.error)
        }

        const getUser = await UserModel.findOne({deletedAt:null , email}).lean()

        if(!getUser){
            return response(false , 404 , 'User not found')
        }

        //remove otp after validation

        await getOtpData.deleteOne();

        return response(true , 200 , 'OTP verified')

    }catch(error){
        return catchError(error)
    }
}