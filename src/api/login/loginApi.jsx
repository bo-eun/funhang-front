import React from 'react';
import api from '../axiosApi';

export const loginApi = {
    create: async(formData) => {
        try {
            const response = await api.post(`/api/v1/user/add`, formData, {
                headers: {"Content-Type" : "multipart/form-data"},
            });
            console.log(response);

        } catch(error) {
            console.lor(error);
        }

    },

    login: async(formData) => {
        try {
            const response = await api.post(`/api/v1/user/login`, formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
    
            console.log(response); 
        } catch(error) {
            console.log(error);
        }
    }
};
