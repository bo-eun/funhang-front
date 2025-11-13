import React, { useState } from 'react';
import styles from "@/pages/mypage/mypage.module.css";
import ShowModal from '../../components/modal/ShowModal';
import { useOutletContext } from 'react-router';

function Coupon(props) {
    const {movePage, currentPage, couponList}=useOutletContext();
    const [show, setShow] = useState(false);
    const [showCoupon, setShowCoupon] = useState('');

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}.${mm}.${dd}`;
    };

    const handleClose = () => {
        setShow(false);
    }
    const openCouponLayer = (e) => {
        const img = e.currentTarget.dataset.img;
        setShowCoupon(img);
        setShow(true);
    }

    return (
        <>
            <div className={styles.coupon_cont}>
                <h3>보유쿠폰</h3>
                <ul>
                    {couponList?.map((item)=>
                        (
                        <li key={item.couponId} onClick={openCouponLayer} data-img={item.imgUrl}>
                            <span>{formatDate(item.acquiredAt)} 발행</span>
                            <p>{item.couponName}</p>
                        </li>
                        )
                    )}
                </ul>
            </div>

            <ShowModal show={show} handleClose={handleClose} title="보유 쿠폰" 
            className={styles.coupon_modal}
            closeBtnName='닫기'>
                <div className={styles.img_box}>
                    <img src={showCoupon} alt="쿠폰 이미지" />
                </div>
                <div className={styles.notice_box}>
                    <p>※ 포인트 교환으로 받으신 상품권은 취소가 불가합니다.</p>
                    <p>※ 오프라인 전용 쿠폰입니다.</p>
                    <p>※ 교환 후 마이페이지 보유 쿠폰 메뉴에서 확인해주세요.</p>
                </div>
            </ShowModal>            
        </>
    );
}

export default Coupon;