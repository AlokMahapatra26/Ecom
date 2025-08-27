// api/media/route.ts
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response} from "@/lib/helperFunction";
import MediaModel from "@/models/Media.model";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/authentication";

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
        const limit = parseInt(searchParams.get('limit') || '10', 10)
        const deleteType = searchParams.get('deleteType')

        let filter = {}
        if(deleteType === 'SD'){
            // Filter for media that have not been soft-deleted
            filter = {deletedAt : null}
        }else if(deleteType == 'PD'){
            // Filter for media that have been soft-deleted (are in trash)
            filter = {deletedAt : {$ne: null}}
        }

        const mediaData = await MediaModel.find(filter).sort({createdAt : -1}).skip(page * limit).limit(limit).lean()

        const totalMedia = await MediaModel.countDocuments(filter)

        return NextResponse.json({
            mediaData : mediaData,
            hasMore: (page + 1) * limit < totalMedia
        })

    }catch(error){
        return catchError(error)
    }
}