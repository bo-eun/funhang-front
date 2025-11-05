import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { authStore } from "../store/authStore"
import api from '../api/axiosApi';
import { useNavigate } from "react-router";



export const useLogin = () => {
    const{setLogin} = authStore();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn :  async (credentials) => {
            const response = await api.post(`/api/v1/user/login`, credentials, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            return response;
        },
        onSuccess : (data) =>{
            //캐시무효화 
            queryClient.invalidateQueries( {queryKey : ['users']});
            
            //토큰 저장
            setLogin(data.data.content);
            navigate('/');
        },
        onError : (error) =>{
            console.error('Login 실패', error);
            alert('아이디 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요.')
        }
    })

}