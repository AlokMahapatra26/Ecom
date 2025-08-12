import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Copy, CopyIcon, EllipsisVertical, Link2, Pencil, Trash2 } from 'lucide-react'
import { DropdownMenuContent } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { ADMIN_MEDIA_EDIT } from '@/routes/AdminPanleRoute'

interface MediaProps {
  media: {
    _id: string;
    secure_url: string;
    alt?: string;
  };
  handleDelete: (ids: string[], type: string) => void;
  deleteType: string;
  selectedMedia: string[];
  setSelectedMedia: (media: string[]) => void;
}

const Media: React.FC<MediaProps> = ({ media, handleDelete, deleteType, selectedMedia, setSelectedMedia }) => {

//   const handleCheck = () => {
//   setSelectedMedia((prev: any[]) =>
//     prev.includes(media._id)
//       ? prev.filter((m: any) => m !== media._id)
//       : [...prev, media._id]
//   )
// }

  const handleCheck = () => {
    let newSelectedMedia = []
    if(selectedMedia.includes(media._id)){
      newSelectedMedia = selectedMedia.filter((m: any) => m !== media._id)
    }else{
      newSelectedMedia = [...selectedMedia , media._id]
    }

    setSelectedMedia(newSelectedMedia)
  }


  const handleCopyLink = async (url: string) => {
    await navigator.clipboard.writeText(url)
    alert("link copied")

  }


  return (
    <div className='border border-gray-200 relative group rounded overflow-hidden'>
      <div className='absolute top-2 left-2 z-20'>
        <Checkbox
          checked={selectedMedia.includes(media._id)}
          onCheckedChange={handleCheck}
          className='border-primary cursor-pointer'
        />
      </div>

      <div className='absolute top-2 right-2 z-20'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className='w-7 h-7 flex items-center justify-center rounded-full bg-black/50 cursor-pointer'>
              <EllipsisVertical color='#fff' />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            {deleteType === "SD" && <>
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href={ADMIN_MEDIA_EDIT(media._id)}>
                  <Pencil /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={() => handleCopyLink(media.secure_url)}>

                <CopyIcon /> Copy Link
              </DropdownMenuItem>
            </>}


            <DropdownMenuItem className='cursor-pointer' onClick={()=> handleDelete([media._id] , deleteType)}>
              <Trash2 color='red' />
              {
                deleteType === "SD" ? "Move Into Trash" : "Delete Permanently"
              }
            </DropdownMenuItem>


          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='w-full h-full absolute z-10 transition-all duration-150 ease-in-out group-hover:bg-black/30'>

      </div>

      <div>
        <Image
          src={media?.secure_url || ""}
          alt={media?.alt || "image"}
          height={300}
          width={300}
          className='object-cover w-full sm:[200px] h-[200px]'
        />
      </div>
    </div>
  )
}

export default Media