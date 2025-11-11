import React from 'react';
import api from '../axiosApi';

export const adminUserApi = {

    list: async({
        searchText,
        delYn,
        page,
        size
    })=>{
        const params = new URLSearchParams();
        params.set('page', page);
        params.set('size', size);
        if(searchText) params.set('searchText',searchText);
        if(delYn) params.set('delYn',delYn);
        const response = await api.get(
            `/api/v1/admin/user?${params.toString()}`
        )
        return response.data.response;
    },
    
    givePoint: async(userId,amount,reason)=>{
        const queryParams = new URLSearchParams({
            amount,
            reason
        })
        const response = await api.patch(
            `/api/v1/admin/${userId}/points?${queryParams.toString()}`,
            {
                 headers: { "Content-Type": "multipart/form-data" },
            }
        )
        return response.data;
    },
    
    disabledUser: async(userId,request)=>{
        const response = await api.patch(`/api/v1/admin/${userId}/status`,request,
            {
                 headers: { "Content-Type": "application/json" },
            }
        );
        return response.data;
    }
}

