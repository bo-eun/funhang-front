import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../api/banner/bannerAdminApi";
import { couponAdminApi } from "../api/coupon/couponAdminApi";
import { loadingStore } from "../store/loadingStore";

export const useAdmin = () => {
  const queryClient = useQueryClient();

  const setLoading = loadingStore.getState().setLoading; // 로딩 상태 변경 메서드


  const getBannerListMutation = useMutation({
    mutationFn: async () => {
        setLoading(true);
        const response = await adminApi.allList();
        return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["bannerList"]); // 캐시 갱신
    },
    onSettled: (data, error) => {
      console.log(data);
      console.log(error);
      setLoading(false);
    }
  });

  const createBannerMutation = useMutation({
    mutationFn: async (formData) => {
        setLoading(true);
        const response = await adminApi.create(formData);
        return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["bannerList"]); // 캐시 갱신
    },
    onSettled: (data, error) => {
      console.log(data);
      console.log(error);
      setLoading(false);
      data && !error ? alert(data.resultMessage) : alert(error.response);
    }
  });

  const deleteBannerMutation = useMutation({
    mutationFn: async (bannerId) => {
      const response = await adminApi.delete(bannerId);
      return response;
    },
    onSettled: (data, error) => {
      console.log(data);
      console.log(error);
      setLoading(false);
      data && !error ? alert(data.resultMessage) : alert(error.response);
    }    
  });

  const getCouponListMutation = useMutation({
    mutationFn: async () => {
      const response = await couponAdminApi.list();
      return response;
    },
    mutationKey: ['coupon', 'list'], // 중복 요청 막음
    onSettled: (data, error) => {
      console.log(data);
      console.log(error);
      setLoading(false);
      data && !error ? alert(data.resultMessage) : alert(error.response);
    }     
  });

  const createCouponMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await couponAdminApi.create(formData);
      return response;
    },
    mutationKey: ['coupon', 'create'], // 중복 요청 막음
    onSettled: (data, error) => {
      console.log(data);
      console.log(error);
      setLoading(false);
      data && !error ? alert(data.resultMessage) : alert(error.response);
    }    
  });

  const updateCouponMutation = useMutation({
    mutationFn: async (formData) => {
      console.log(formData)
      const response = await couponAdminApi.update(formData.couponId, formData);
      console.log(response);
      return response;
    },
    mutationKey: ['coupon', 'update'], // 중복 요청 막음
    onSettled: (data, error) => {
      console.log(data);
      console.log(error);
      setLoading(false);
      data && !error ? alert(data.resultMessage) : alert(error.response);
    }    
  })  

  const deleteCouponMutation = useMutation({
    mutationFn: async(couponIds) => {
      const response = await couponAdminApi.delete(couponIds);
      console.log(response);
      return response;
    },
    mutationKey: ['coupon', 'delete'], // 중복 요청 막음
    onSettled: (data, error) => {
      console.log(data);
      console.log(error);
      setLoading(false);
      data && !error ? alert(data.resultMessage) : alert(error.response);
    }      
  })

  return { getBannerListMutation, createBannerMutation, deleteBannerMutation, getCouponListMutation, createCouponMutation, updateCouponMutation, deleteCouponMutation };
};
