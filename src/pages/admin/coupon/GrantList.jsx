import React, { useEffect, useState } from 'react';
import Table from '../../../components/table/Table';
import { Link } from 'react-router';
import { couponAdminApi } from '../../../api/coupon/couponAdminApi';
import { useAdmin } from '../../../hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';


const colWidth = ['60px', '', '300px', '150px'];
const headers = ['NO', '요청 정보', '유저 ID', '요청 날짜'];

function GrantList(props) {

    const [boardList, setBoardList] = useState(null);
    const [columns, setColumns] = useState([]);
    const [couponList, setCouponList] = useState([]);
    const [checkedList, setCheckedList] = useState([]); // 선택한 게시글 리스트 저장

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}.${mm}.${dd}`;
    };

    const {data}= useQuery({
        queryKey : ['coupon'],
        queryFn: async()=>couponAdminApi.requestList(),
    })

    console.log(data);

    useEffect(()=>{
        if(data){
            setCouponList(data.items);
        }
    },[data]);

    useEffect(() => {
        if (!couponList) return;
        const mappedColumns = couponList.map((item, index) => ({
            couponId: index,
            couponName: item.couponName,
            userId: item.userId,
            date: formatDate(item.acquiredAt)
        }));
        setColumns(mappedColumns);
    }, [couponList])

    return (
        <section style={{'paddingTop':"70px"}}>
            <div className="btn_box text-end mb-3">
                <Link to="/admin/coupon/regist" className='btn btn-dark'>쿠폰 리스트</Link>
            </div>
            <Table 
                headers={headers} 
                data={boardList} 
                colWidth={colWidth}
                columns={columns}
                setCheckedList={setCheckedList}
            />
        </section>
    );
}

export default GrantList;