import React from 'react';
import api from '../axiosApi';

export const productApi = {

    getPromo5List: async(promoTypeName,size=5)=>{
        const queryParams = new URLSearchParams({
            size
        });
        const response = await api.get(
            `/api/v1/crawl/ALL/${promoTypeName}?${queryParams.toString()}`
        )
        return response.data;
    },

    getChainListAll: async ({
        sourceChain, 
        promoType, 
        productType, 
        q='',
        size, 
        page = 0, 
        sort = 'price,asc'
    }) => {
        const params = new URLSearchParams();
        params.set('size', size);
        params.set('page', page);
        params.set('sort', sort);
        if (q) params.set('q', q);

        // null 또는 undefined면 'ALL'로 변환
        const src = sourceChain?.toUpperCase() || 'ALL';
        const promo = promoType?.toUpperCase() || 'ALL';
        const prod = productType?.toUpperCase() || 'ALL';

        const urlParts = [src, promo, prod].join('/');
        const url = urlParts === '' ? `/api/v1/crawl` : `/api/v1/crawl/${urlParts}`;

        const response = await api.get(`${url}?${params.toString()}`);
        return response.data;
    },

    getDetail : async({
        crawlId,
    })=>{
        const response = await api.get(`/api/v1/crawl/detail/${crawlId}`);
        return response.data;
    }
}

