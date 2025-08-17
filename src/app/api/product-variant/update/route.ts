import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { isAuthenticated } from "@/lib/authentication";
import { zSchema } from "@/lib/zodSchema";
import ProductVariantModel from "@/models/ProductVariant.model";



export async function PUT(request: Request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized')
        }

        await connectDB();
        const payload = await request.json();

        const schema = zSchema.pick({
            _id: true,
            product: true,
            sku: true,
            color: true,
            size: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            media: true
        });


        const validate = schema.safeParse(payload);

        if (!validate.success) {
            return response(false, 400, 'invalid or missing fields', validate.error)
        }

        const validatedData = validate.data

        const getProductVariant = await ProductVariantModel.findOne({ deletedAt: null, _id: validatedData._id })
        if (!getProductVariant) {
            return response(false, 404, 'data not found')
        }

        getProductVariant.product = validatedData.product;
        getProductVariant.sku = validatedData.sku;
        getProductVariant.color = validatedData.color;
        getProductVariant.size = validatedData.size;
        getProductVariant.mrp = validatedData.mrp;
        getProductVariant.sellingPrice = validatedData.sellingPrice;
        getProductVariant.discountPercentage = validatedData.discountPercentage;
        getProductVariant.media = validatedData.media;

        await getProductVariant.save()


        return response(true, 200, 'Product variant Updated successfully')


    } catch (error) {
        catchError(error)
    }
}