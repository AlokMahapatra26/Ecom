import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import { response } from "@/lib/helperFunction";
import z from "zod";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import { sendMail } from "@/lib/sendMail";
import { emailVerificationLink } from "@/email/emailVerifictionLink";
import OTPModel from "@/models/Otp.model";
import { otpEmail } from "@/email/otpEmail";

export async function POST(request:Request){
    try{
        await connectDB()
        const payload = await request.json();

        const validationSchema = zSchema.pick({
            email:true,
        }).extend({
            password:z.string()
        })

        const validatedData = validationSchema.safeParse(payload)
        if(!validatedData.success){
            return response(false , 401 , 'Invalid or missing input field' , validatedData.error)
        }

        const {email , password} = validatedData.data;

        const getUser = await UserModel.findOne({deletedAt: null, email}).select("+password")
        if(!getUser){
            return response(false , 400 , 'Invalid login credentials')
        }


        //resend email verification link
        if(!getUser.isEmailVerified){
                const secret = new TextEncoder().encode(process.env.SECRET_KEY);
            
                const token = await new SignJWT({ userId: getUser._id.toString() })
                  .setIssuedAt()
                  .setExpirationTime("1h")
                  .setProtectedHeader({ alg: "HS256" })
                  .sign(secret);
            
                await sendMail("Email Verification from Rudra Silk Saree" , 
                    email , emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`)
                )

                return response(false , 401 , 'your email is not verified , we have sent a verification lin to your registered email address')
        }

        //password verification
        const isPasswordVerified = await getUser.comparePassword(password)

        if(!isPasswordVerified){
            return response(false , 400 , 'Invalid login credentials'  )
        }

        //otp generation
        await OTPModel.deleteMany({email}) //deleteing old otps

        const otp = generateOTP();

        //storing otp into database

        const newOtpData = new OTPModel({
            email , otp
        })

        await newOtpData.save();

        const otpEmailStatus = await sendMail('Your login verification code' , email , otpEmail(otp))

        if(!otpEmailStatus.success){
            return response(false , 400 , 'faild to send otp')
        }

         return response(true , 200 , 'otp send , please veirfy your account')

    }catch(error){
        return catchError(error);
    }
}