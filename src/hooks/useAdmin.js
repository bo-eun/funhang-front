import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { adminApi } from "../api/banner/bannerAdminApi";
import { authStore } from "../store/authStore";

export const useAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const token = authStore.getState().token;

  const createBannerMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        const response = await adminApi.create(formData);
        return response;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
  });

  const deleteBannerMutation = useMutation({
    mutationFn: async (bannerId) => {
      try {
        const response = await adminApi.delete(bannerId);
        return response;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
  });

  return { createBannerMutation, deleteBannerMutation };
};
