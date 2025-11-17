import React from 'react';
import api from '../axiosApi';


export const boardApi = {
    list: async() => {
        const response = await api.get(`/api/v1/board`)
        return response; 
    },

    get: async(brdId) => {
        const response = await api.get(`/api/v1/board/${brdId}`)
        return response;  
    },

    adminCreate: async(formData) => {
        const response = await api.post(`/api/v1/admin/board`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
        })
        return response; 

    },    
    
    imageCreate: async(formData) => {
        const response = await api.post(`/api/v1/admin/board/image`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
        })
        return response; 
    },

    create: async(formData) => {
        const response = await api.post(`/api/v1/board`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
        })
        return response; 

    },

    update: async(brdId, formData) => {
        const response = await api.put(`/api/v1/board/${brdId}`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
        })
        return response; 
    },

    delete: async(brdId, formData) => {
        const response = await api.delete(`/api/v1/board/${brdId}`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
        })
        return response; 
    },

}