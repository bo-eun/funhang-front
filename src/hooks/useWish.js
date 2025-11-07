import { useMutation, useQueryClient } from "@tanstack/react-query"
import { mypageApi } from "../api/mypage/mypageApi";

export const useWish =()=>{
    const queryClient = useQueryClient();

    const plusWishmutation = useMutation({
    mutationFn: (crawlId) => mypageApi.add(crawlId),
    onSuccess: (data) => {
      if (data.resultMessage === '이미존재하는상품입니다.') {
        alert("이미 찜한 상품입니다.");
        return;
        }

        if (data.resultMessage === 'ADDED') {
            console.log("찜 추가 완료:", data);
            queryClient.invalidateQueries(["product", data?.crawlId]);
            alert("찜이 추가되었습니다!");
        }
    },
    onError: (error) => {
      console.error("찜 추가 실패:", error);
      alert("찜 추가 실패! 다시 시도해주세요.");
    },
  });

    return {
        plusWishmutation,
    };
}