import React from 'react';
import api from '../axiosApi';

export const loginApi = {
    create: async(formData) => {
        try {
            const response = await api.post(`/api/v1/user/add`, formData, {
                headers: {"Content-Type" : "multipart/form-data"},
            });
            return response;
        } catch(error) {
            alert(error.response.data.message);
        }

    },

    login: async(formData) => {
        try {
            const response = await api.post(`/api/v1/user/login`, formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
    
            return response;
        } catch(error) {
            console.log(error);
        }
    }
};
