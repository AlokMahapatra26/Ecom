import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { isAuthenticated } from "@/lib/authentication";
import { isValidObjectId } from "mongoose";
import CouponModel from "@/models/Coupon.model";


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

    const getCoupon = await CouponModel.findOne(filter)

    if (!getCoupon) {
      return response(false, 404, "Coupon not found");
    }

    return response(true, 200, "Coupon found", getCoupon);
  } catch (error) {
    return catchError(error);
  }
}
