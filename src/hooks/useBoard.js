import { useMutation } from "@tanstack/react-query"
import { boardApi } from "../api/board/boardApi";
import { boardAdminApi } from "../api/board/boardAdminApi";
import { useNavigate } from "react-router";
import { loadingStore } from "../store/loadingStore";


export const useBoard = () => {
    const navigate = useNavigate();
    const setLoading = loadingStore.getState().setLoading;

    const getMutate = useMutation({
        mutationFn: async (brdId) => {
            const response = await boardApi.get(brdId);
            console.log(response)
            return response.data.response; 
        },
        onError: (error) => {
            console.error("게시글 상세 가져오기 실패", error);
            alert(error.response.data.response);
        }        
    });

    const listMutate = useMutation({
        mutationFn: async () => {
            const response = await boardApi.list();
            return response.data.response;
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
            setLoading(true);
            const response = await boardApi.imageCreate(formData, brdId);
            return response.data.response;
        },
        onSuccess: (data) => {
            console.log(data)
            console.log('이미지 업로드 성공')
        },
        onError: (error) => {
            console.error("이미지 업로드 실패", error);
        },
        onSettled: () => {
            setLoading(false);
        }        
    })

    // 이미지 리사이징 요청
    const resizeImgMutation = useMutation({
        mutationFn: async ({brdId, formData}) => {
            const response = await boardApi.imageCreate(formData, brdId);
            return response.data.response;
        },
        onSuccess: (data) => {
            console.log(data)
            console.log('이미지 리사이징 성공')
        },
        onError: (error) => {
            console.error("이미지 리사이징 실패", error);
        }
    });

    const updateMutate = useMutation({
        mutationFn: async ({brdId, formData}) => {
               
            const response = await boardApi.update(brdId, formData);
            return response.data.response.content;
        },
        
        onError: (error) => {
            console.error("게시글 작성 실패", error);
            alert(error.response.data.response);
        }
    });

    const deleteMutate = useMutation({
        mutationFn: async (brdId) => {
            const response = await boardApi.delete(brdId);
            return response.data.response;
        },
        onSuccess: (data) => {
            navigate(`/board`);
        },
        onError: (error) => {
            console.error("게시글 작성 실패", error);
            alert(error.response.data.response);
        }
    });    
     
    const bestMutate = useMutation({
        mutationFn: async (brdId) => {
            const response = await boardApi.best(brdId);
            return response.data.response;
        },
        // onSuccess: (data) => {
        //     alert('추천되었습니다!')
        // },
        onError: (error) => {
            console.error("추천 실패", error);
            alert(error.response.data.response);
        }
    });      

    const listCommentMutate = useMutation({
        mutationFn: async (brdId) => {
            const response = await boardApi.listComment(brdId);
            return response.data.response;
        },
        onSuccess: (data) => {
            console.log(data)
        },
        
        onError: (error) => {
            console.error("댓글 불러오기 실패", error);
            alert(error.response.data.response);
        }
    })

    const createCommentMutate = useMutation({
        mutationFn: async ({brdId, formData}) => {
            console.log(brdId)
            const response = await boardApi.createComment(brdId, formData);
            return response.data.response;
        },
        onSuccess: (data) => {
            console.log(data)
        },
        
        onError: (error) => {
            console.error("댓글 작성 실패", error);
            alert(error.response.data.response);
        }
    });

    const updateCommentMutate = useMutation({
        mutationFn: async ({commentId, formData}) => {
            const response = await boardApi.updateComment(commentId, formData);
            return response.data.response;
        },
        onSuccess: (data) => {
            console.log(data)
        },
        
        onError: (error) => {
            console.error("댓글 수정 실패", error);
            alert(error.response.data.response);
        }
    });

    const deleteCommentMutate = useMutation({
        mutationFn: async (commentId) => {
            const response = await boardApi.deleteComment(commentId);
            return response.data.response;
        },
        onSuccess: (data) => {
            console.log(data)
        },
        
        onError: (error) => {
            console.error("댓글삭제 실패", error);
            alert(error.response.data.response);
        }
    });    

    return { 
        getMutate,
        listMutate, 
        createMutate, 
        uploadImgMutate, 
        updateMutate, 
        deleteMutate, 
        bestMutate,
        resizeImgMutation,
        listCommentMutate,
        createCommentMutate,
        updateCommentMutate,
        deleteCommentMutate
     }
}
