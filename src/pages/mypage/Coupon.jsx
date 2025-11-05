import React, { useState } from 'react';
import styles from "../../assets/css/mypage.module.css"
import ShowModal from '../../components/ShowModal';

function Coupon(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const openCouponLayer = () => {
        setShow(true);
    }

    return (
        <>
            <div className={styles.coupon_cont}>
                <h3>보유쿠폰</h3>
                <ul>
                    <li onClick={openCouponLayer}>
                        <span>2025.10.23 발행</span>
                        <p>5,000원 쿠폰</p>
                    </li>
                </ul>
            </div>

            <ShowModal show={show} handleClose={handleClose} title="보유 쿠폰" 
            className={styles.coupon_modal}
            closeBtnName='닫기'>
                <div className={styles.img_box}>
                    <img src="" />
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