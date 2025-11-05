import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import api from "../api/axiosApi";
import { authStore } from "../store/authStore";

export const useAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const token = authStore.getState().token;

  const createBannerMutation = useMutation({
    mutationFn: async(formData) => {
        try {
            const resonse = await api.post("/api/v1/admin/banner", formData, {
                headers: {"Content-Type" : "multipart/form-data"},
                "Authorization": `Bearer ${token}`,
            })
            console.log(resonse);
        } catch(error) {
            throw error.response?.data || error;
        }
    }
  });

  const updateBannerMutation = useMutation({
    mutationFn: async(formData) => {
        try {
            const resonse = await api.put("/api/v1/admin/banner", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
                
            })
            console.log(resonse);
        } catch(error) {
            throw error.response?.data || error;
        }
    }
  });
  


  return { createBannerMutation, updateBannerMutation }
}