import api from "../axiosApi";
import { authStore } from "../../store/authStore";


const token = authStore.getState().token;

export const adminApi = {

    list: async (page) => {
        const response = await api.get(`/api/v1/admin/banner`);
        return response.data.response;
    },

    get: async (brdId) => {
        const response = await api.get(`/api/v1/admin/banner/${brdId}`);
        return response.data.response;
    },

    create: async (formData) => {
        const response = await api.post(`/api/v1/admin/banner`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
            "Authorization": `Bearer ${token}`,
        });
        console.log(response);
        return response.data.response;
    },

    update: async (formData) => {
        const response = await api.put(`/api/v1/admin/banner`, formData, { 
            headers: {
                "Content-Type" : "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log(response);
        return response.data.response;
    },

    delete: async (brdId) => {
        const response = await api.delete(`/api/v1/admin/banner/${brdId}`);
        return response.data.response;
    },
}