import React, { useEffect, useState } from 'react';
import styles from "@/pages/mypage/mypage.module.css";
import ShowModal from '../../components/modal/ShowModal';
import { useQuery } from '@tanstack/react-query';
import { pointApi } from '../../api/mypage/pointApi';
import { useOutletContext } from 'react-router';

function Point(props) {
    const [show, setShow] = useState(false);
    // const [pointList, setPointList] = useState([]);
    const { movePage, currentPage } = useOutletContext();

    // 현재 페이지 slice
    const pagePerRow = 10;
    // const pagedList = list.slice(currentPage * pagePerRow, (currentPage + 1) * pagePerRow);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const coupon5 = 5000;
    const coupon10 = 10000;


    // const {data} = useQuery({
    //     queryKey:['point'],
    //     queryFn: async()=>pointApi.list(),
    //     keepPreviousData: true,
    // })

    // useEffect(()=>{
    //     if(data){
    //         setPointList(data.items || []);
    //         setTotalPoint(data.balance || 0);
    //     }
    // }, [data]);



    const handleClose = () => {
        setShow(false);
    }
    const openCouponLayer = () => {
        setShow(true);
    }




    return (
        <>
        <div className={styles.point_cont}>
            <h3>
                포인트 내역
                <button type="button" className={styles.coupon_btn} onClick={openCouponLayer}>쿠폰 교환</button>
            </h3>

            <table>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>포인트 정보</th>
                        <th>내역</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {pointList?.map((item)=>(
                        <tr key={item.id}>
                            <td>{formatDate(item.createDate)}</td>
                            <td>{item.reason}</td>
                            <td className={styles.plus}>{item.amount}</td>
                        </tr>
                    ))}
                </tbody> */}
            </table>
        </div>

        <ShowModal show={show} handleClose={handleClose} title="쿠폰 교환"
        className={styles.coupon_modal}
        closeBtnName='교환'
        >
            <div className={styles.notice_box}>
                <p>※ 포인트 교환으로 받으신 상품권은 취소가 불가합니다.</p>
                <p>※ 오프라인 전용 쿠폰입니다.</p>
                <p>※ 교환 후 마이페이지 보유 쿠폰 메뉴에서 확인해주세요.</p>
            </div>
            <div className={styles.coupon_list}>
                <div className={styles.coupon_box}>
                    <input type="radio" name="couponType" id="coupon5000" className='form-check' value={coupon5}/>
                    <label htmlFor="coupon5000">
                        {coupon5}원 쿠폰
                    </label>
                </div>
                <div className={styles.coupon_box}>
                    <input type="radio" name="couponType" id="coupon10000" className='form-check' value={coupon10}/>
                    <label htmlFor="coupon10000">
                        {coupon10}원 쿠폰
                    </label>
                </div>
            </div>
        </ShowModal>
        </>
    );
}

export default Point;