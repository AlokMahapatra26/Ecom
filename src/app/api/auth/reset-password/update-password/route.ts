import { connectDB } from "@/lib/databaseConnection";
import { catchError } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import { response } from "@/lib/helperFunction";
import UserModel from "@/models/User.model";

export async function PUT(request:Request){
    try{
        await connectDB()
        const payload = await request.json()
        const validationSchema = zSchema.pick({
            email: true,
            password: true
        })

        const validatedData = validationSchema.safeParse(payload)
        if(!validatedData.success){
            return response(false , 401 , 'Invalid or missing input filed' , validatedData.error)
        }

        const {email , password} = validatedData.data;

        const getUser = await UserModel.findOne({deleteAt:null , email}).select("+password")

        if(!getUser){
            return response(false , 404 , 'user not found')
        }
        
        getUser.password = password;

        await getUser.save()
        
        return response(true , 200 , 'Password updated successfully')
    }catch(error){
        catchError(error)
    }
}