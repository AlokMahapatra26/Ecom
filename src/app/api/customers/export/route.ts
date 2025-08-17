import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { isAuthenticated } from "@/lib/authentication";
import UserModel from "@/models/User.model";


export async function GET(request: Request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    

    const filter = {
        deletedAt : null
    }


    const getCustomes = await UserModel.find(filter).sort({createdAt : -1}).lean();

    if(!getCustomes){
          return response(false, 404, "Collection empty");
    }


    return response(true , 200 , "Data found" , getCustomes)

  } catch (error) {
    return catchError(error);
  }
}
