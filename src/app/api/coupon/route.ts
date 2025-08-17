import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";

import { NextRequest, NextResponse } from "next/server";
import { PipelineStage } from "mongoose";
import CouponModel from "@/models/Coupon.model";

// Define a type for the sorting query for better type safety
type SortQuery = {
    [key: string]: 1 | -1;
};

// Define a type for the match query
type MatchQuery = {
    [key: string]: any;
    deletedAt?: { $ne: Date | null } | null;
    $or?: { [key: string]: { $regex: string; $options: string } }[];
};


export async function GET(request: NextRequest) {
    try {
        // 1. Authentication Check
        const auth = await isAuthenticated('admin');
        if (!auth.isAuth) {
            // Replaced custom 'response' helper with standard NextResponse
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
        }

        // 2. Database Connection
        await connectDB();

        // 3. Get Search Parameters
        const searchParams = request.nextUrl.searchParams;

        // Safely parse integer values with string defaults
        const start = parseInt(searchParams.get('start') || '0', 10);
        const size = parseInt(searchParams.get('size') || '10', 10);
        
        // Safely parse JSON values with string defaults
        const filters = JSON.parse(searchParams.get('filters') || "[]");
        const globalFilter = searchParams.get('globalFilter') || "";
        
        // Corrected the typo from 'soting' to 'sorting'
        const sorting = JSON.parse(searchParams.get('sorting') || "[]");
        
        const deleteType = searchParams.get('deleteType');

        // 4. Build Match Query
        const matchQuery: MatchQuery = {};

        if (deleteType === "SD") { // Soft Deleted
            matchQuery.deletedAt = null;
        } else if (deleteType === 'PD') { // Permanently Deleted (or rather, records that have a deletedAt timestamp)
            matchQuery.deletedAt = { $ne: null };
        }

        // Apply global filter for searching across multiple fields
        if (globalFilter) {
            matchQuery["$or"] = [
                { code: { $regex: globalFilter, $options: "i" } },
                {
                    $expr:{
                        $regexMatch:{
                            input:{$toString: "$minShoppingAmount"},
                            regex : globalFilter,
                            options : 'i'
                        }
                    }
                },
                {
                    $expr:{
                        $regexMatch:{
                            input:{$toString: "$discountPercentage"},
                            regex : globalFilter,
                            options : 'i'
                        }
                    }
                }
            ];
        }

        // Apply column-specific filters
        filters.forEach((filter: { id: string; value: string }) => {
            if (filter.id && filter.value) {

                if(filter.id === 'minShoppingAmount'  || filter.id === 'discountPercentage'){

                     matchQuery[filter.id] = Number(filter)

                }else if(filter.id === 'validity'){
                    matchQuery[filter.id] = new Date(filter.value)

                }
                else{
                    matchQuery[filter.id] = { $regex: filter.value, $options: 'i' };
                }
            }
        });

        // 5. Build Sort Query
        const sortQuery: SortQuery = {};
        sorting.forEach((sort: { id: string; desc: boolean }) => {
            if (sort.id) {
                sortQuery[sort.id] = sort.desc ? -1 : 1;
            }
        });

        // 6. Define Aggregation Pipeline
        // Explicitly typing the pipeline array with Mongoose's PipelineStage type
        const aggregatePipeline: PipelineStage[] = [
            { $match: matchQuery },
            // Use a default sort order if none is provided
            { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
            { $skip: start },
            { $limit: size },
            {
                $project: {
                    _id: 1,
                    code: 1,
                    discountPercentage: 1,
                    minShoppingAmount : 1,
                    validity : 1,
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1
                }
            }
        ];

        // 7. Execute Aggregation and Count Queries Concurrently
        const [coupons, totalRowCount] = await Promise.all([
            CouponModel.aggregate(aggregatePipeline),
            CouponModel.countDocuments(matchQuery)
        ]);

        // 8. Return Response
        return NextResponse.json({
            success : true,
            data: coupons,
            meta: {
                totalRowCount
            }
        });

    } catch (error) {
        console.error("Error in GET /api/categories:", error);
        // Replaced custom 'catchError' with a standard error response
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: "An internal server error occurred.", error: errorMessage }, { status: 500 });
    }
}
