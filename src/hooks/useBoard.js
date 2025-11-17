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

    const adminCreateMutate = useMutation({
        mutationFn: async(formData) => {
            const response = await boardApi.adminCreate(formData);
            return response.data.response.content
        },
        onSettled: (data, error) => {
            data ? console.log(data) : console.error(error);
        }
    });

    const createMutate = useMutation({
        mutationFn: async (formData) => {
            const response = await boardApi.create(formData);
            return response.data.response.content;
        },
        
        onError: (error) => {
            console.error("게시글 작성 실패", error);
            alert(error.response.data.response);
        }
    });

    const uploadImgMutate = useMutation({
        mutationFn: async (formData) => {
            const response = await boardApi.imageCreate(formData);
            return response.data.response.content;
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

    return { listMutate, adminCreateMutate, createMutate, uploadImgMutate, updateMutate, deleteMutate }
}
