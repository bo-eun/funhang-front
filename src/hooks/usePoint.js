import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { adminUserApi } from "../api/user/adminUserApi";
import { couponApi } from "../api/mypage/couponApi";
import CustomAlert from "../components/alert/CustomAlert";

export const usePoint = () => {
    const queryClient = useQueryClient();

    const grantPointMutation = useMutation({
        mutationFn:async({ userId, amount, reason })=>{
            const response = await adminUserApi.givePoint(userId, amount, reason);
            return response;
        },
        onSuccess : ()=>{
            CustomAlert({
                text: "포인트 지급 완료"
            });
            queryClient.invalidateQueries({queryKey:['user']});
            queryClient.invalidateQueries({queryKey:['point']});
        },
        onError: (err) => {
            console.error(err);
            CustomAlert({
                text: "포인트 지급 중 오류가 발생했습니다."
            });
            
        }
    });

    const changePoint = useMutation({
        mutationFn : async(couponId)=>{
            const response = await couponApi.change(couponId);
            return response;
        },
        onSuccess : ()=>{
            queryClient.invalidateQueries( {queryKey : ['point']});
            queryClient.invalidateQueries( {queryKey : ['coupon']});
            CustomAlert({
                text: "쿠폰 교환에 성공하였습니다."
            });
        },
        onError : (error)=>{
            console.error('쿠폰교환 실패', error);
            CustomAlert({
                text: "쿠폰 교환에 실패하였습니다."
            });
        }
    })


    return{grantPointMutation,changePoint};
}