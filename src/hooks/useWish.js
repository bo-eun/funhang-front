import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { authStore } from "../store/authStore";
import { wishApi } from "../api/mypage/wishApi";
import { useMemo } from "react";

export const useWish = () => {
  const queryClient = useQueryClient();
  const isAuth = authStore().isAuthenticated();

  // 찜 리스트 fetch
  const { data: wishData = { content: [], count: 0 } } = useQuery({
    queryKey: ["wish"],
    queryFn: async () => {
      const res = await wishApi.list();
      return res;
    },
    enabled: isAuth,
  });

  // 빠른 조회용 Set
  const wishSet = useMemo(() => new Set(wishData.content.map(item => item.crawlId)), [wishData]);

  // 찜 토글
  const toggleWishMutation = useMutation({
    mutationFn: async (product) => {
      const exists = wishSet.has(product.crawlId);
      return exists
        ? await wishApi.delete(product.crawlId)
        : await wishApi.add(product.crawlId);
    },
    onMutate: async (product) => {
      await queryClient.cancelQueries(["wish"]);
      const previousWish = queryClient.getQueryData(["wish"]);

      queryClient.setQueryData(["wish"], old => {
        const content = old?.content || [];
        if (wishSet.has(product.crawlId)) {
          return { ...old, content: content.filter(i => i.crawlId !== product.crawlId), count: (old.count || 0) - 1 };
        } else {
          return { ...old, content: [...content, product], count: (old.count || 0) + 1 };
        }
      });

      return { previousWish };
    },
    onError: (err, product, context) => {
      queryClient.setQueryData(["wish"], context.previousWish);
      toast.error("찜 처리 실패");
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage === "ADDED" ? "찜 추가됨!" : "찜 취소됨!");
    },
    onSettled: () => queryClient.invalidateQueries(["wish"]),
  });

  return {
    wishList: wishData.content,
    wishCount: wishData.count,
    isWish: (crawlId) => wishSet.has(crawlId),
    toggleWishMutation,
  };
};
