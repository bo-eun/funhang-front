import { useMutation, useQueryClient } from "@tanstack/react-query"
import { wishApi } from "../api/mypage/wishApi";
import { adminPrdApi } from "../api/product/adminPrdApi";
import { useNavigate } from "react-router";
import CustomAlert from "../components/alert/CustomAlert";

export const useProduct =(productId)=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const prdUpdateMutation = useMutation({
      mutationFn: (formData) => adminPrdApi.update(productId, formData),
      onSuccess: () => {
          CustomAlert({
            text:"수정이 완료되었습니다!"
          })
          queryClient.invalidateQueries({queryKey:['product']})
          
      },
      onError: (err) => {
        console.error(err);
        CustomAlert({
            text:"수정 중 오류가 발생하였습니다."
        })
      },
    });

    const prdDeleteMutation = useMutation({
      mutationFn: (productId)=> adminPrdApi.delete(productId),
      onSuccess : ()=>{
        CustomAlert({
            text:"상품이 삭제되었습니다."
        });
        queryClient.invalidateQueries({queryKey:['product']})
      },
      onError: (err) => {
        console.error(err);
        CustomAlert({
            text:"삭제 중 오류가 발생했습니다."
        });
      }
    })

    return {
        prdUpdateMutation,prdDeleteMutation,
    };
}