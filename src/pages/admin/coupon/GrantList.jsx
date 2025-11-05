import React, { useEffect, useState } from 'react';
import BoardListItem from '../../../components/board/BoardListItem';
import { authStore } from '../../../store/authStore';
import Table from '../../../components/table/Table';
import { Link } from 'react-router';


const colWidth = ['60px', '', '300px', '150px'];
const headers = ['NO', '요청 정보', '유저 ID', '요청 날짜'];

function GrantList(props) {

    const [boardList, setBoardList] = useState(null);
    const [columns, setColumns] = useState([]);
    const [checkedList, setCheckedList] = useState([]); // 선택한 게시글 리스트 저장

    useEffect(() => {
        setBoardList([
            {
                couponId: 1,
                couponName: '5,000원 쿠폰',
                userId: 'user00', 
                requriedPoint: 5000,
            },
            {
                couponId: 2,
                couponName: '10,000원 쿠폰',
                userId: 'user00', 
                requriedPoint: 10000,
            },
            {
                couponId: 3,
                couponName: '5,000원 쿠폰',
                userId: 'user00', 
                requriedPoint: 5000,
            }
        ])
        setColumns([
            {
                couponId: 1,
                couponName: '5,000원 쿠폰',
                userId: 'user00',
                date: '2025-10-11'
            },
            {
                couponId: 2,
                couponName: '5,000원 쿠폰',
                userId: 'user00',
                date: '2025-10-11'
            },
            {
                couponId: 3,
                couponName: '5,000원 쿠폰',
                userId: 'user00',
                date: '2025-10-11'
            },
            
        ])
    }, [])

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