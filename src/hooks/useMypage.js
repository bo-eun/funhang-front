import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { authStore } from "../store/authStore"
import api from '../api/axiosApi';
import { useNavigate } from "react-router";


export const useMypage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const getMyInfoMutation = useMutation({
        mutationFn: async() => {
            const response = await api.get('/api/v1/user/info');

            return response.data.response;
        },

        onSuccess: (data) => {
            console.log("내 정보 가져오기 완료");
            console.log(data);
        },
        onError: (error) => {
            alert(error.response.data.response);
        }
    })

    const setMyInfoMutation = useMutation({
        mutationFn: async(formData) => {
            const response = await api.put(`/api/v1/user/info`, formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            return response.data.response;
        },

        onSuccess: (data) => {
            console.log("내 정보가 수정되었습니다.");
            console.log(data);
        },
        onError: (error) => {
            alert(error.response.data.response);
        }
    })    

    const newMypwMutation = useMutation({
        mutationFn: async(formData) => {
            const response = await api.put(`/api/v1/user/password/change`, formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            return response.data.response;
        },

        onSuccess: (data) => {
            console.log("비밀번호 변경이 완료되었습니다.");
            console.log(data);
        },
        onError: (error) => {
            alert(error.response.data.response);
        }
    })

    const deleteUserMutation = useMutation({
        mutationFn: async() => {
            const response = await api.delete(`/api/v1/user/`);

            return response;
        },
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            alert(error.response.data.response);
        }
    })

    return { getMyInfoMutation, setMyInfoMutation, newMypwMutation, deleteUserMutation }
}