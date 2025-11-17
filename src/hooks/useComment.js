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
            queryClient.invalidateQueries(["product",]);
            console.log('댓글등록성공')
        },
        onError:(error)=>{
            console.error("댓글등록실패", error);
        }
    });
    const updateCommentMutation = useMutation({
        mutationFn: async({commentId, content})=>{
            const response = await commentApi.updatePrd(commentId, content);
            return response;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["product"]);
            console.log('댓글수정성공')
        },
        onError:(error)=>{
            console.error("댓글수정실패", error);
        }
    });

    const deleteCommentMutation = useMutation({
        mutationFn: async(commentId)=>{
            const response = await commentApi.deletePrd(commentId);
            return response;
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(["product"]);
            console.log('댓글삭제성공');
        },
        onError:(error)=>{
            console.error("댓글삭제실패", error);
        }
    })


    return{addCommentMutation,updateCommentMutation,deleteCommentMutation}
}