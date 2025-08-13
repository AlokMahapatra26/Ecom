// import { isAuthenticated } from "@/lib/authentication"
// import { connectDB } from "@/lib/databaseConnection"
// import { catchError, response } from "@/lib/helperFunction"
// import CategoryModel from "@/models/Category.model"
// import { NextResponse } from "next/server"


// export async function GET(request: Request) {
//     try {
//         const auth = await isAuthenticated('admin')
//         if (!auth.isAuth) {
//             return response(false, 403, 'Unauthorized')
//         }

//         await connectDB()

//         const searchParams = request.nextUrl.searchParams

//         const start = parseInt(searchParams.get('start') || 0 , 10)
//         const size = parseInt(searchParams.get('size') || 10 , 10)
//         const filters = JSON.parse(searchParams.get('filters') || "[]")
//         const globalFilter = searchParams.get('globalFilter') || ""
//         const soting = JSON.parse(searchParams.get('sorting') || "[]")
//         const deleteType = searchParams.get('deleteType')

//         // Build match query
//         let matchQuery = {}

//         if(deleteType === "SD"){
//             matchQuery = {deletedAt : null}
//         }else if(deleteType === 'PD'){
//             matchQuery = {deletedAt : {$ne : null}}
//         }

//         // global search
//         if(globalFilter){
//             matchQuery["$or"] = [
//                 {name : {$regex: globalFilter , $options : "i"}},
//                 {slug : {$regex: globalFilter , $options : "i"}},
//             ]
//         }

//         // Column filteration

//         filters.forEach(filter => {
//             matchQuery[filter.id] = {$regex: filter.value , $options: 'i'}
//         })

//         // sorting

//         let sortQuery = {}
//         sorting.forEach(sort => {
//             sortQuery[sort.id] = sort.desc ? -1 : 1
//         })

//         // Aggregate pipleine 
//         const aggregatePipeline = [
//             {$match: matchQuery},
//             {$sort: Object.keys(sortQuery).length ? sortQuery : {createdAt : -1}},
//             {$skip: start},
//             {$limit : size},
//             {
//                 $project:{
//                     _id : 1,
//                     name : 1,
//                     slug : 1 ,
//                     createdAt : 1,
//                     updatedAt : 1,
//                     deletedAt : 1
//                 }
//             }
//         ]

//         // Execute query 
//         const getCategory = await CategoryModel.aggregate(aggregatePipeline)


//         // get total Row count
//         const totalRowCount = await CategoryModel.countDocuments(matchQuery)

//         return NextResponse.json({
//             data: getCategory,
//             meta: {totalRowCount}
//         })



//     } catch (error) {
//         return catchError(error)
//     }
// }



// NEW CODE
import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import CategoryModel from "@/models/Category.model";
import { NextRequest, NextResponse } from "next/server";
import { PipelineStage } from "mongoose";

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
                { slug: { $regex: globalFilter, $options: "i" } },
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
                    slug: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1
                }
            }
        ];

        // 7. Execute Aggregation and Count Queries Concurrently
        const [categories, totalRowCount] = await Promise.all([
            CategoryModel.aggregate(aggregatePipeline),
            CategoryModel.countDocuments(matchQuery)
        ]);

        // 8. Return Response
        return NextResponse.json({
            data: categories,
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
