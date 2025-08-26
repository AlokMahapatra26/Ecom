
import "@/models/Media.model";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { isAuthenticated } from "@/lib/authentication";
import { isValidObjectId } from "mongoose";
import ProductModel from "@/models/Product.model";


export async function GET() {
  try {
   

    await connectDB();

   

    

    const filter = { deletedAt: null};

    const getProduct = await ProductModel.find(filter).populate('media').lean();

    if (!getProduct) {
      return response(false, 404, "Product not found");
    }

    return response(true, 200, "Category found", getProduct);
  } catch (error) {
    return catchError(error);
  }
}
