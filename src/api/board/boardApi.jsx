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

    create: async() => {
        const response = await api.post(`/api/v1/board/temp`, {
            withCredentials: true // 세션 쿠키 보내기
        })
        return response; 

    },
    
    imageCreate: async(formData, brdId) => {
        const response = await api.post(`/api/v1/board/${brdId}/image`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
        })
        return response; 
    },

    update: async(brdId, formData) => {
        const response = await api.put(`/api/v1/board/${brdId}/submit`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
            withCredentials: true // 세션 쿠키 보내기
        })
        return response; 
    },

    delete: async(brdId) => {
        const response = await api.delete(`/api/v1/board/${brdId}`, {
            withCredentials: true // 세션 쿠키 보내기
        })
        return response; 
    },

    best: async(brdId) => {
        const response = await api.post(`/api/v1/board/${brdId}/like`, {
            withCredentials: true // 세션 쿠키 보내기
        })
        return response; 
    },    

    listComment: async(brdId) => {
        const response = await api.get(`/api/v1/board/${brdId}/comment`)
        return response;
    },

    createComment: async(brdId, formData) => {
        const response = await api.post(`/api/v1/board/${brdId}/comment`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
            withCredentials: true // 세션 쿠키 보내기
        })
        return response;
    },

    updateComment: async(commentId, formData) => {
        const response = await api.put(`/api/v1/board/comment/${commentId}`, formData, {
            headers: {"Content-Type" : "multipart/form-data"},
            withCredentials: true // 세션 쿠키 보내기
        })
        return response;
    },

    deleteComment: async(commentId) => {
        const response = await api.delete(`/api/v1/board/comment/${commentId}`, {
            withCredentials: true // 세션 쿠키 보내기
        })
        return response;
    },

}