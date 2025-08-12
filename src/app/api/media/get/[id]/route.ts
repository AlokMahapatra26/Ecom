import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import MediaModel from "@/models/Media.model";
import { isValidObjectId } from "mongoose";

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

    const getMedia = await MediaModel.findOne(filter).lean();

    if (!getMedia) {
      return response(false, 404, "Media not found");
    }

    return response(true, 200, "Media found", getMedia);
  } catch (error) {
    return catchError(error);
  }
}
