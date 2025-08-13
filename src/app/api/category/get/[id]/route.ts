import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { isAuthenticated } from "@/lib/authentication";
import { isValidObjectId } from "mongoose";
import CategoryModel from "@/models/Category.model";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }

    await connectDB();

    const { id } = await context.params;

    if (!isValidObjectId(id)) {
      return response(false, 400, "Invalid object id");
    }

    const filter = { deletedAt: null, _id: id };

    const getCategory = await CategoryModel.findOne(filter).lean();

    if (!getCategory) {
      return response(false, 404, "Category not found");
    }

    return response(true, 200, "Category found", getCategory);
  } catch (error) {
    return catchError(error);
  }
}
