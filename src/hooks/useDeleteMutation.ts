import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const useDeleteMutation = (queryKey: any , deleteEndpoint: any) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn :async({ids, deleteType}: { ids: any; deleteType: string }) => {
            const {data : response} = await axios({
                url : deleteEndpoint,
                method: deleteType === 'PD' ? "DELETE" : "PUT",
                data : {ids , deleteType}
            })

            if(!response.success){
                throw new Error(response.message)
            }

            return response
        },

        onSuccess: (data) => {
            alert(data.message)
            queryClient.invalidateQueries({ queryKey: [queryKey] })
        },
        onError: (error) => {
            alert(error.message)
        }
    })
}

export default useDeleteMutation