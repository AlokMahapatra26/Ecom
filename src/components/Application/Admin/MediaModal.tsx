import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React, { useState } from 'react'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import ModalMediaBlock from './ModalMediaBlock'

const MediaModal = ({ open, setOpen, selectedMedia, setSelectedMedia, isMultiple }) => {

    const [previouslySelected , setPrevioslySelected] = useState([])

    const fetchMedia = async (page) => {
        const { data: response } = await axios.get(`/api/media?page=${page}&&limit=18&&deleteType=SD`)
        return response;
    }

    const { isPending, isError, error, data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['MediaModal'],
        queryFn: async ({ pageParam }) => await fetchMedia(pageParam),
        placeholderData: 0,
        initialData: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length
            return lastPage.hasMore ? nextPage : undefined
        }
    })


    const handleClear = () => {
        setSelectedMedia([]);
        setPrevioslySelected([]);
        alert("Media selection cleared")
    }


    const handleClose = () => {
        setSelectedMedia(previouslySelected)
        setOpen(false);
    }

    const handleSelect = () => {
        if(selectedMedia.length <= 0){
            return alert("please select media")
        }

        setPrevioslySelected(selectedMedia)
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}  >
            <DialogContent onInteractOutside={(e) => e.preventDefault()}
                className='sm:max-w-[80%] h-screen p-0 py-10 bg-transparent border-0 shadow-none'
            >
                <DialogDescription className='hidden'>

                </DialogDescription>

                <div className='h-[90vh] bg-white p-3 rounded shadow'>
                    <DialogHeader className='h-8 border-b'>
                        <DialogTitle>
                            Media Selection
                        </DialogTitle>
                    </DialogHeader>

                    <div className='h-[calc(100%-80px)] overflow-auto py-2'>
                        {isPending ?
                            (<div className='size-full flex justify-center items-center'>
                                <p>Loading...</p>
                            </div>)
                            :
                            isError ? <div>
                                <span className='text-red-500'>{error.message}</span>
                            </div> :

                                <>
                                    <div className='grid lg:grid-cols-6 grid-cols-3 gap-2'>


                                        {data?.pages?.map((page, index) => (
                                            <React.Fragment key={index}>
                                                {page?.mediaData?.map((media: any) => (
                                                    <ModalMediaBlock
                                                        key={media._id}
                                                        media={media}
                                                        selectedMedia={selectedMedia}
                                                        setSelectedMedia={setSelectedMedia}
                                                        isMultiple={isMultiple}
                                                    />
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </>}
                    </div>

                    <div className='h-10 pt-3 border-t flex justify-between'>
                        <div>
                            <Button type='button' variant="destructive" onClick={handleClear}>
                                Clear All
                            </Button>
                        </div>
                        <div className='flex gap-5'>
                            <Button type='button' variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type='button' onClick={handleSelect}>
                                Select
                            </Button>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default MediaModal