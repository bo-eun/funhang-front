import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { adminUserApi } from "../api/user/adminUserApi";

export const usePoint = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const grantPointMutation = useMutation({
        mutationFn:(formData)=>adminUserApi.givePoint(formData),
        onSuccess : ()=>{
            alert("포인트 지급 완료");
            queryClient.invalidateQueries({queryKey:['user']});
            queryClient.invalidateQueries({queryKey:['point']});
        },
        onError: (err) => {
            console.error(err);
            alert("포인트 지급 중 오류가 발생했습니다.");
        }
    })


    return{};
}