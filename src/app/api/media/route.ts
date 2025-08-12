import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated , response} from "@/lib/helperFunction";
import MediaModel from "@/models/Media.model";
import { NextResponse } from "next/server";

export async function GET(request:Request){
    try{
        const auth = await isAuthenticated('admin')
        if(!auth.isAuth){
            return response(false , 403 , 'Unauthorized')
        }

        await connectDB()

        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const page = parseInt(searchParams.get('page') || '0', 10);
        const limit = parseInt(searchParams.get('limit') || '0', 10)
        const deleteType = searchParams.get('deleteType') // SD - soft delete , RDS - restore soft delete , PD - permanent delete

        let filter = {}
        if(deleteType === 'SD'){
            filter = {deletedAt : null}
        }else if(deleteType == 'PD'){
            filter = {deletedAt : {$ne: null}}
        }

        const mediaData = await MediaModel.find(filter).sort({createdAt : -1}).skip(page * limit).limit(limit).lean()

        const totalMedia = await MediaModel.countDocuments(filter)

        return NextResponse.json({
            mediaData : mediaData,
            hasMore: (page +1) * limit < totalMedia
        })

    }catch(error){
        return catchError(error)
    }
}




// NEW CODE 
// import { connectDB } from "@/lib/databaseConnection";
// import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
// import MediaModel from "@/models/Media.model";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//     try {
//         // 1. Authentication check remains the same
//         const auth = await isAuthenticated('admin');
//         if (!auth.isAuth) {
//             return response(false, 403, 'Unauthorized');
//         }

//         await connectDB();

//         const url = new URL(request.url);
//         const searchParams = url.searchParams;
        
//         // 2. Improved & safer pagination parsing (assumes 1-based indexing from client)
//         const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10)); // Default to page 1
//         const limit = Math.max(10, parseInt(searchParams.get('limit') || '10', 10)); // Default to a sensible limit of 10
//         const skip = (page - 1) * limit;

//         const deleteType = searchParams.get('deleteType'); // 'active', 'deleted', or 'all'

//         // 3. More robust and explicit filtering logic
//         let filter: any = {};
//         switch (deleteType) {
//             case 'deleted':
//                 // Only show soft-deleted items
//                 filter = { deletedAt: { $ne: null } };
//                 break;
//             case 'all':
//                 // Show all items (no filter on deletedAt)
//                 filter = {};
//                 break;
//             default:
//                 // Default case: only show active, non-deleted items
//                 filter = { deletedAt: null };
//                 break;
//         }

//         // 4. Fetch data and total count with the correct filters
//         const mediaData = await MediaModel.find(filter)
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit)
//             .lean();

//         const totalMedia = await MediaModel.countDocuments(filter);

//         // 5. Correct hasMore calculation for 1-based indexing
//         return NextResponse.json({
//             mediaData: mediaData,
//             hasMore: page * limit < totalMedia,
//             currentPage: page,
//             totalPages: Math.ceil(totalMedia / limit)
//         });

//     } catch (error) {
//         return catchError(error);
//     }
// }



// NEW CODE
// import { connectDB } from "@/lib/databaseConnection";
// import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
// import MediaModel from "@/models/Media.model";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//     try {
//         const auth = await isAuthenticated('admin');
//         if (!auth.isAuth) {
//             return response(false, 403, 'Unauthorized');
//         }

//         await connectDB();

//         const url = new URL(request.url);
//         const searchParams = url.searchParams;

//         // Safer parsing (0-based page, default limit=10)
//         const page = Math.max(0, parseInt(searchParams.get('page') || '0', 10));
//         const limit = Math.max(1, parseInt(searchParams.get('limit') || '10', 10)); // Prevent limit=0
//         const skip = page * limit;

//         const deleteType = searchParams.get('deleteType') || 'SD'; // Default to 'SD' if missing

//         // Correct filtering with proper field name (assuming 'deletedAt' in your schema)
//         let filter = {};
//         if (deleteType === 'SD') {
//             filter = { deletedAt: null }; // Active/non-deleted
//         } else if (deleteType === 'PD') {
//             filter = { deletedAt: { $ne: null } }; // Soft-deleted/trash
//         } // If neither, filter remains {} (all), but you can add an else for error

//         const mediaData = await MediaModel.find(filter)
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit)
//             .lean();

//         const totalMedia = await MediaModel.countDocuments(filter);

//         // hasMore for 0-based paging
//         return NextResponse.json({
//             mediaData: mediaData,
//             hasMore: (page + 1) * limit < totalMedia,
//             currentPage: page,
//             totalPages: Math.ceil(totalMedia / limit),
//             totalItems: totalMedia
//         });

//     } catch (error) {
//         return catchError(error);
//     }
// }
