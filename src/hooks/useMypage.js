import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { authStore } from "../store/authStore"
import api from '../api/axiosApi';
import { useNavigate } from "react-router";
import { myInfoApi } from "../api/mypage/myInfoApi";
import { dailyCheckApi } from "../api/mypage/dailyCheckApi";
import CustomAlert from "../components/alert/CustomAlert";


export const useMypage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { clearAuth } = authStore();

    const getMyInfoMutation = useMutation({
        mutationFn: async() => {
            const response = await myInfoApi.get();
            return response;
        },

        onSuccess: (data) => {
            console.log("내 정보 가져오기 완료");
        },
        onError: (error) => {
            CustomAlert({
                text: error.response.data.response
            })
        }
    })

    const setMyInfoMutation = useMutation({
        mutationFn: async(formData) => {
            const response = await myInfoApi.set(formData);

            return response;
        },

        onSuccess: (data) => {
            alert("내 정보가 수정되었습니다.");
        },
        onError: (error) => {
            CustomAlert({
                text: error.response.data.response
            })
        }
    })    

    const newMypwMutation = useMutation({
        mutationFn: async(formData) => {
            const response = await myInfoApi.put(formData);

            return response;
        },

        onSuccess: (data) => {
            console.log("비밀번호 변경이 완료되었습니다.");
        },
        onError: (error) => {
            CustomAlert({
                text: error.response.data.response
            })
        }
    })

    const deleteUserMutation = useMutation({
        mutationFn: async() => {
            const response = await myInfoApi.delete();
            return response;
        },
        onSuccess: (data) => {
            CustomAlert({
                text: data.data.response
            })
            clearAuth();
            navigate('/');
        },
        onError: (error) => {
            CustomAlert({
                text: error.response.data.response
            })
        }
    })

    const dailyCheckListMutation = useMutation({
        mutationFn: async() => {
            const response = await dailyCheckApi.list();
            return response;
        },
        onSuccess: (data) => {

        },
        onError: (error) => {
            CustomAlert({
                text: error.response.data.response
            })            
        }        
    })

    return { getMyInfoMutation, setMyInfoMutation, newMypwMutation, deleteUserMutation, dailyCheckListMutation }
}