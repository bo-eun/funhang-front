import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { adminApi } from "../api/banner/bannerAdminApi";
import { authStore } from "../store/authStore";
import { couponAdminApi } from "../api/coupon/couponAdminApi";

export const useAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const token = authStore.getState().token;

  const createBannerMutation = useMutation({
    mutationFn: async (formData) => {
        const response = await adminApi.create(formData);
        return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bannerList"]); // 캐시 갱신
    },
    onError: (error) => {
      console.error("배너 등록 실패:", error);
      alert(error?.message || "배너 등록 중 오류가 발생했습니다.");
    },
  });

  const deleteBannerMutation = useMutation({
    mutationFn: async (bannerId) => {
      const response = await adminApi.delete(bannerId);
      return response;
    },
    onSuccess: () => {
      alert("배너가 삭제되었습니다!");
    },
    onError: (error) => {
      console.error("배너 삭제 실패:", error);
      alert(error.response?.data);
    },    
  });

  const getCouponListMutation = useMutation({
    mutationFn: async () => {
      const response = await couponAdminApi.list();
      return response;
    },
    onSuccess: () => {
      console.log('쿠폰 리스트 불러오기 완료')
    },
    onError: (error) => {
      console.error("쿠폰 리스트 불러오기 실패:", error);
      alert(error.response?.data);
    },
  });

  const createCouponMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await couponAdminApi.create(formData);
      return response;
    },
    onSuccess: () => {
      console.log('쿠폰 등록 성공');
      queryClient.invalidateQueries(["adminCouponList"]);
    },
    onError: (error) => {
      console.error("쿠폰 등록 실패:", error);
      //alert(error.response?.data);
    },
  });

  const updateCouponMutation = useMutation({
    mutationFn: async (formData) => {
      console.log(formData)
      const response = await couponAdminApi.update(formData.couponId, formData);
      console.log(response);
      return response;
    },
    onSuccess: () => {
      console.log('쿠폰 수정 성공')
    },
    onError: (error) => {
      console.error("쿠폰 수정 실패:", error);
      //alert(error.response?.data);
    },
  })  

  return { createBannerMutation, deleteBannerMutation, getCouponListMutation, createCouponMutation, updateCouponMutation };
};
