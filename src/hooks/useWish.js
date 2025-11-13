import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { wishApi } from "../api/mypage/wishApi";
import { useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authStore } from "../store/authStore";

export const useWish = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = authStore(); // 로그인 여부
  const isAuth = authStore().isAuthenticated();

  // 찜목록
  const { data: wishList = [] } = useQuery({
    queryKey: ["wish"],
    queryFn: async () => {
      const res = await wishApi.list();
      return res.content || [];
    },
    enabled: isAuth, // 로그인되어 있어야만 쿼리 실행
  });

  // wishSet을 useMemo로 계산
  const wishSet = useMemo(() => {
    if (!isAuthenticated()) return new Set();
    return new Set(wishList.map(item => item.crawlId));
  }, [wishList, isAuth]);

  // 찜 토글
  const toggleWishMutation = useMutation({
    mutationFn: async (product) => {
      if (!isAuth) {
        return;
      }

      const exists = wishSet.has(product.crawlId);
      const res = exists
        ? await wishApi.delete(product.crawlId)
        : await wishApi.add(product.crawlId);

      return { ...res, crawlId: product.crawlId };
    },
    onSuccess: (data) => {
      // UI 업데이트는 invalidateQueries로 처리
      if (data.resultMessage === "ADDED") {
        toast.success("찜이 추가되었습니다!");
      } else if (data.resultMessage === "REMOVED") {
        toast.info("찜이 취소되었습니다!");
      }
      queryClient.invalidateQueries(["wish"]);
    },
    onError: (error) => {
      console.error("찜 추가 실패:", error);
      toast.error("찜 추가 실패! 다시 시도해주세요.");
    },
    enabled: isAuth,
  });

  // 단순 찜 여부 확인
  const isWish = (crawlId) => wishSet.has(crawlId);

  return {
    toggleWishMutation,
    isWish,
    wishSet,
    wishList
  };
};
