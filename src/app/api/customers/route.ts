import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { NextRequest, NextResponse } from "next/server";
import { PipelineStage } from "mongoose";
import UserModel from "@/models/User.model";

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
                { name: { $regex: globalFilter, $options: "i" } },
                { email: { $regex: globalFilter, $options: "i" } },
                { phone: { $regex: globalFilter, $options: "i" } },
                { address: { $regex: globalFilter, $options: "i" } },
                { isEmailVerified: { $regex: globalFilter, $options: "i" } }
            ];
        }

        // Apply column-specific filters
        filters.forEach((filter: { id: string; value: string }) => {
            if (filter.id && filter.value) {
                 matchQuery[filter.id] = { $regex: filter.value, $options: 'i' };
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
                    name: 1,
                    email: 1,
                    phone: 1,
                    address : 1,
                    avatar : 1,
                    isEmailVerified : 1,
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1
                }
            }
        ];

        // 7. Execute Aggregation and Count Queries Concurrently
        const [customers, totalRowCount] = await Promise.all([
            UserModel.aggregate(aggregatePipeline),
            UserModel.countDocuments(matchQuery)
        ]);

        // 8. Return Response
        return NextResponse.json({
            success : true,
            data: customers,
            meta: {
                totalRowCount
            }
        });

    } catch (error) {
        console.error("Error", error);
        // Replaced custom 'catchError' with a standard error response
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, message: "An internal server error occurred.", error: errorMessage }, { status: 500 });
    }
}
