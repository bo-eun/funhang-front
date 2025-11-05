import React from 'react';
import api from '../axiosApi';

export const productApi = {
    getPromo5List: async(promoTypeName,size=5)=>{
        const queryParams = new URLSearchParams({
            size
        });
        const response = await api.get(
            `/api/v1/crawl/promo/${promoTypeName}?${queryParams.toString()}`
        )
        return response.data;
    },

    getChainList: async (sourceChain, promoType, productType, size=20) => {
        const queryParams = new URLSearchParams({
            size
        });
        
        const response = await api.get(
            `/api/v1/crawl/${sourceChain}/${promoType}/${productType}?${queryParams.toString()}`
        );
        return response.data;
    },
    getProduct: async()=>{
        const response = await api.get(
            `/api/v1/crawl`
        )
        return response.data;
    }
}

