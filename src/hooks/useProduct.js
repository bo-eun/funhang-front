import { useMutation, useQueryClient } from "@tanstack/react-query"
import { wishApi } from "../api/mypage/wishApi";
import { adminPrdApi } from "../api/product/adminPrdApi";
import { useNavigate } from "react-router";

export const useProduct =(productId)=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const prdUpdateMutation = useMutation({
    mutationFn: async (formData) => {
      return adminPrdApi.update(productId, formData);
    },
    onSuccess: () => {
        alert("수정 완료!");
        queryClient.invalidateQueries({queryKey:['product']})
        navigate("/admin/product");
    },
    onError: (err) => {
      console.error(err);
      alert("수정 중 오류 발생");
    },
  });

    return {
        prdUpdateMutation,
    };
}