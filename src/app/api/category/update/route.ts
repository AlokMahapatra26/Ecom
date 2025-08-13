import { connectDB } from "@/lib/databaseConnection";
import { catchError , response } from "@/lib/helperFunction";
import { isAuthenticated } from "@/lib/authentication";
import { zSchema } from "@/lib/zodSchema";
import CategoryModel from "@/models/Category.model";

export async function PUT(request:Request){
    try{
        const auth = await isAuthenticated('admin')
        if(!auth.isAuth){
            return response(false , 403 , 'Unauthorized')
        }

        await connectDB();
        const payload = await request.json();

        const schema = zSchema.pick({
            _id:true , name : true , slug : true
        })

        const validate = schema.safeParse(payload);

        if(!validate.success){
            return response(false , 400 , 'invalid or missing fields', validate.error)
        }

        const {_id , name , slug} = validate.data

        const getCategory = await CategoryModel.findOne({deletedAt : null, _id})
        if(!getCategory){
            return response(false , 404 , 'data not found')
        }

        getCategory.name = name;
        getCategory.slug = slug;

        await getCategory.save()


        return response(true , 200 , 'Category Updated successfully')

        
    }catch(error){
        catchError(error)
    }
}