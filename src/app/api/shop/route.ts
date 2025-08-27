import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import CategoryModel from "@/models/Category.model";
import ProductModel from "@/models/Product.model";
import { PipelineStage } from "mongoose";

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);

        // --- Get filters and check if they are active ---
        const size = searchParams.get('size');
        const color = searchParams.get('color');
        const minPrice = parseInt(searchParams.get('minPrice') || '0');
        const maxPrice = parseInt(searchParams.get('maxPrice') || '100000');
        const categorySlug = searchParams.get('category');
        const search = searchParams.get('q');

        // ⭐ NEW: A flag to determine if we need to filter by variants
        const isVariantFilterActive = !!(size || color || minPrice > 0 || maxPrice < 100000);

        // Pagination
        const limit = parseInt(searchParams.get('limit') || '9');
        const page = parseInt(searchParams.get('page') || '0');
        const skip = page * limit;

        // Sorting
        const sortOption = searchParams.get('sort') || 'default_sorting';
        let sortQuery: any = {};
        if (sortOption === 'default_sorting') sortQuery = { createdAt: -1 };
        if (sortOption === 'asc') sortQuery = { name: 1 };
        if (sortOption === 'desc') sortQuery = { name: -1 };
        if (sortOption === 'price_low_high') sortQuery = { sellingPrice: 1 };
        if (sortOption === 'price_high_low') sortQuery = { sellingPrice: -1 };
        
        // --- Build Initial Match Stage ---
        const matchStage: any = {
            deletedAt: null
        };

        if (categorySlug) {
            const slugs = categorySlug.split(',');
            const categoryData = await CategoryModel.find({ deletedAt: null, slug: { $in: slugs } }).select('_id').lean();
            const categoryIds = categoryData.map(category => category._id);
            if (categoryIds.length > 0) {
                matchStage.category = { $in: categoryIds };
            }
        }

        if (search) {
            matchStage.name = { $regex: search, $options: 'i' };
        }
        
        // --- Build the Aggregation Pipeline Dynamically ---
        const pipeline: PipelineStage[] = [
            // 1. Initial match for category, search term etc.
            { $match: matchStage },

            // 2. Sort the products
            { $sort: sortQuery },

            // 3. Always lookup variants, so we know if they exist
            {
                $lookup: {
                    from: 'productsvariants',
                    localField: '_id',
                    foreignField: 'product',
                    as: 'variants'
                }
            },
        ];

        // ⭐ NEW: Conditionally add the variant filtering logic
        if (isVariantFilterActive) {
            pipeline.push(
                // 4a. Filter the variants array based on size, color, and price
                {
                    $addFields: {
                        variants: {
                            $filter: {
                                input: "$variants",
                                as: "variant",
                                cond: {
                                    $and: [
                                        size ? { $in: ["$$variant.size", size.split(',')] } : {},
                                        color ? { $in: ["$$variant.color", color.split(',')] } : {},
                                        { $gte: ["$$variant.sellingPrice", minPrice] },
                                        { $lte: ["$$variant.sellingPrice", maxPrice] }
                                    ]
                                }
                            }
                        }
                    }
                },
                // 4b. Remove products that have no matching variants after the filter
                {
                    $match: {
                        "variants.0": { $exists: true }
                    }
                },
                // 4c. Update top-level prices to reflect the first matching variant
                {
                    $addFields: {
                        sellingPrice: { $first: "$variants.sellingPrice" },
                        mrp: { $first: "$variants.mrp" },
                        discountPercentage: { $first: "$variants.discountPercentage" }
                    }
                }
            );
        }

        // --- Add Final Stages for Pagination and Data Shaping ---
        pipeline.push(
            // 5. Handle pagination AFTER any potential filtering
            { $skip: skip },
            { $limit: limit + 1 },

            // 6. Lookup media for the main product
            {
                $lookup: {
                    from: 'medias',
                    localField: 'media',
                    foreignField: '_id',
                    as: 'media'
                }
            },
            
            // 7. Project the final fields
            {
                $project: {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    mrp: 1,
                    sellingPrice: 1,
                    discountPercentage: 1,
                    media: {
                        _id: 1,
                        secure_url: 1,
                        alt: 1
                    },
                }
            }
        );

        const products = await ProductModel.aggregate(pipeline);

        // --- Final Pagination Check ---
        let nextPage: number | null = null;
        if (products.length > limit) {
            nextPage = page + 1;
            products.pop();
        }

        return response(true, 200, 'Product data found', { products, nextPage });
    } catch (error) {
        return catchError(error);
    }
}