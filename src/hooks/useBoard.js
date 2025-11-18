import { useMutation } from "@tanstack/react-query"
import { boardApi } from "../api/board/boardApi";


export const useBoard = () => {

    const listMutate = useMutation({
        mutationFn: async () => {
            const response = await boardApi.list();
            return response.data.response.content;
        }, 

        onError: (error) => {
            console.error("게시판 리스트 가져오기 실패", error);
            alert(error.response.data.response);
        }
    });

    const createMutate = useMutation({
        mutationFn: async () => {
            const response = await boardApi.create();
            console.log(response)
            return response.data.response.boardId;
        },
        
        onError: (error) => {
            alert(error.response.data.response);
        }
    });

    const uploadImgMutate = useMutation({
        mutationFn: async ({brdId, formData}) => {
            const response = await boardApi.imageCreate(formData, brdId);
            return response.data.response;
        },
        onSuccess: (data) => {
            console.log(data)
            console.log('이미지 업로드 성공')
        },
        onError: (error) => {
            console.error("이미지 업로드 실패", error);
        }
    })

    const updateMutate = useMutation({
        mutationFn: async (brdId, formData) => {
            const response = await boardApi.update(brdId, formData);
            return response.data.response.content;
        },
        
        onError: (error) => {
            console.error("게시글 작성 실패", error);
            alert(error.response.data.response);
        }
    });

    const deleteMutate = useMutation({
        mutationFn: async (brdId, formData) => {
            const response = await boardApi.update(brdId, formData);
            return response.data.response.content;
        },
        
        onError: (error) => {
            console.error("게시글 작성 실패", error);
            alert(error.response.data.response);
        }
    });    

    return { listMutate, createMutate, uploadImgMutate, updateMutate, deleteMutate }
}
