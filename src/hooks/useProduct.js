import { useMutation, useQueryClient } from "@tanstack/react-query"
import { wishApi } from "../api/mypage/wishApi";
import { adminPrdApi } from "../api/product/adminPrdApi";
import { useNavigate } from "react-router";

export const useProduct =(productId)=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const prdUpdateMutation = useMutation({
      mutationFn: (formData) => adminPrdApi.update(productId, formData),
      onSuccess: () => {
          alert("수정이 완료되었습니다!");
          queryClient.invalidateQueries({queryKey:['product']})
          
      },
      onError: (err) => {
        console.error(err);
        alert("수정 중 오류가 발생하였습니다.");
      },
    });

    const prdDeleteMutation = useMutation({
      mutationFn: (productId)=> adminPrdApi.delete(productId),
      onSuccess : ()=>{
        alert("상품이 삭제되었습니다.")
        queryClient.invalidateQueries({queryKey:['product']})
      },
      onError: (err) => {
        console.error(err);
        alert("삭제 중 오류가 발생했습니다.");
      }
    })

    return {
        prdUpdateMutation,prdDeleteMutation,
    };
}