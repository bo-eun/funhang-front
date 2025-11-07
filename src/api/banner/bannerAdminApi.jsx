import api from "../axiosApi";
import { authStore } from "../../store/authStore";


const token = authStore.getState().token;

export const adminApi = {

    list: async () => {
        const response = await api.get(`/api/v1/admin/banner`);
        return response;
    },

    // 등록, 수정 모두 create로 요청
    create: async (formData) => {
        const response = await api.post(`/api/v1/admin/banner`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
            "Authorization": `Bearer ${token}`,
        });
        console.log(response);
        return response.data.response;
    },
    delete: async (bannerId) => {
        const response = await api.delete(`/api/v1/admin/banner/${bannerId}`);
        return response.data.response;
    },
}