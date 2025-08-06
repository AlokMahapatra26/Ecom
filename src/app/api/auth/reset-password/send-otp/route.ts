import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import { response } from "@/lib/helperFunction";
import UserModel from "@/models/User.model";
import OTPModel from "@/models/Otp.model";
import { sendMail } from "@/lib/sendMail";
import { otpEmail } from "@/email/otpEmail";

export async function POST(request:Request) { 
    try{
        await connectDB();
        const payload = await request.json();
        const validationSchema = zSchema.pick({
            email : true,
        })

        const validatedData = validationSchema.safeParse(payload);
        if(!validatedData.success){
            return response(false , 401 , 'Invalid or missing input fields',  validatedData.error)
        }

        const {email} = validatedData.data;

        const getUser = await UserModel.findOne({deleteAt:null , email}).lean()

        if(!getUser){
            return response(false , 401 , 'Invalid or missing input field' , validatedData.error)
        }

        //removing old otp
        await OTPModel.deleteMany({email})
        const otp = generateOTP()
        const newOtpData = new OTPModel({
            email , otp
        })

        await newOtpData.save()

        const otpSendStatus = await sendMail("Your login verification code" , email , otpEmail(otp))

        if(!otpSendStatus.success){
            return response(false , 400 , 'faild to resend otp')
        }

        return response(true , 200 , 'Please verify your account' )        


    }catch(error){
        catchError(error)
    }
}