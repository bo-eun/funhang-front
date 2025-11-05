import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { adminApi } from "../api/banner/bannerAdminApi";
import { authStore } from "../store/authStore";

export const useAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const token = authStore.getState().token;

  const createBannerMutation = useMutation({
    mutationFn: async(formData) => {
        try {
            const resonse = await adminApi.create(formData);
            return resonse;
        } catch(error) {
            throw error.response?.data || error;
        }
    }
  });

  const updateBannerMutation = useMutation({
    mutationFn: async(formData) => {
        try {
            const resonse = await adminApi.update(formData);
            return resonse;
        } catch(error) {
            throw error.response?.data || error;
        }
    }
  });
  


  return { createBannerMutation, updateBannerMutation }
}