import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentApi } from "../api/comment/commentApi";

export const useComment=()=>{
    const queryClient = useQueryClient();

    const addCommentMutation = useMutation({
        mutationFn: async({crawlId, content})=>{
            const response = await commentApi.postPrd(crawlId, content);
            return response;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["product"]);
            console.log('댓글등록성공')
        },
        onError:(error)=>{
            console.error("댓글등록실패", error);
        }
    })

    return{addCommentMutation,}
}