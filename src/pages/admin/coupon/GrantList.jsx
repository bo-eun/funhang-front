import React, { useEffect, useMemo, useState } from 'react';
import Table from '../../../components/table/Table';
import { Link } from 'react-router';
import { couponAdminApi } from '../../../api/coupon/couponAdminApi';
import { useAdmin } from '../../../hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '../../../hooks/utils';
import Loading from '../../../components/Loading';
import { loadingStore } from '../../../store/loadingStore';


const colWidth = ['60px', '', '300px', '150px'];
const headers = ['NO', '요청 정보', '유저 ID', '요청 날짜'];

function GrantList(props) {

    const isLoading = loadingStore(state => state.loading); // 요청에 대한 로딩 상태
    const setLoading = loadingStore.getState().setLoading;

    const {data,isLoading:couponLoading}= useQuery({
        queryKey : ['coupon'],
        queryFn: async()=>couponAdminApi.requestList(),
        keepPreviousData: true,
    })

     // 전역 로딩 상태 동기화
    useEffect(() => {
        setLoading(couponLoading);
    }, [couponLoading, setLoading]);

    //데이터 세팅
    const couponList = data?.items ?? [];
    
    //사용자의 쿠폰요청 리스트
    const columns = useMemo(() => {
        if (!couponList) return [];
        return couponList.map((item, index) => ({
            couponId: index + 1,
            couponName: item.couponName,
            userId: item.userId,
            date: formatDate(item.acquiredAt)
        }));
    }, [couponList])

    return (
        <>
            <section style={{'paddingTop':"70px"}}>
                <div className="btn_box text-end mb-3">
                    <Link to="/admin/coupon/regist" className='btn btn-dark'>쿠폰 리스트</Link>
                </div>
                <Table 
                    headers={headers} 
                    data={couponList} 
                    colWidth={colWidth}
                    columns={columns}
                    />
            </section>
            {isLoading &&
                <Loading />
            }
        </>
    );
}

export default GrantList;