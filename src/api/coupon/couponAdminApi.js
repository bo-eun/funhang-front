import api from "../axiosApi";


export const couponAdminApi = {
    list: async() => {
        const response = await api.get(`/api/v1/admin/coupon`);
        return response;
    },

    create: async(formData) => {
        const response = await api.post(`/api/v1/admin/coupon`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
        });
        return response;
    },

    update: async(couponId, formData) => {
        const response = await api.put(`/api/v1/admin/coupon/${couponId}`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
        });
        return response;
    },
};