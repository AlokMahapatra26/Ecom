"use client"
import React from 'react'
import { CldUploadWidget } from "next-cloudinary"; 
import { FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const UploadMedia = ({isMultiple}:any) => {


    const handleOnError = (error: { statusText?: any } | null) => {
        if (error && error.statusText) {
            alert(error.statusText);
        } else {
            alert("An unknown error occurred during upload.");
        }
    }

    const handleOnQueueEnd = async (results: any) => {
        const files = results.info.files 
        const uploadedFiles = files.filter((file: { uploadInfo: any; }) => file.uploadInfo).map((file: { uploadInfo: { asset_id: any; public_id: any; secure_id: any; path: any; thumbnail_url: any; }; }) => ({
            asset_id : file.uploadInfo.asset_id,
            public_id : file.uploadInfo.public_id,
            secure_id : file.uploadInfo.secure_id,
            path : file.uploadInfo.path,
            thumbnail_url : file.uploadInfo.thumbnail_url,
            
        }))

        if(uploadedFiles.length > 0){
            try{
                const {data: mediaUploadResponse} = await axios.post("/api/media/create" , uploadedFiles)
                if(!mediaUploadResponse.success){
                    throw new Error(mediaUploadResponse.message) 
                }

                alert(mediaUploadResponse.message)
            }catch(error){
                alert(error)
            }
        }
    }


  return (
    <CldUploadWidget 
        signatureEndpoint="/api/cloudinary-signature"
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_API_PRESET}
        onError={handleOnError}
        onQueuesEnd={handleOnQueueEnd}
        config={{
            cloud:{
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                apiKey:  process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
            }
        }}

        options={{
            multiple: isMultiple,
            sources : ['local' , 'url' , 'unsplash' , 'google_drive']
        }}
        >

           


            {({ open }) => {
                return (
                <Button className="button" onClick={() => open()}>
                    <FilePlus/>
                    Upload
                </Button>
                );
            }}

    </CldUploadWidget>
  )
}

export default UploadMedia