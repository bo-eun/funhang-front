import React, { useState } from 'react';
import styles from "../../assets/css/mypage.module.css"
import ShowModal from '../../components/ShowModal';

function Point(props) {
    const [show, setShow] = useState(false);

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
                <tr>
                    <th>날짜</th>
                    <th>포인트 정보</th>
                    <th>내역</th>
                </tr>
                <tr>
                    <td>2025-10-29</td>
                    <td>출석체크</td>
                    <td className={styles.plus}>+1</td>
                </tr>
                <tr>
                    <td>2025-10-28</td>
                    <td>출석체크</td>
                    <td className={styles.plus}>+1</td>
                </tr>
                <tr>
                    <td>2025-10-27</td>
                    <td>출석체크</td>
                    <td className={styles.plus}>+1</td>
                </tr>
                <tr>
                    <td>2025-10-26</td>
                    <td>쿠폰 교환</td>
                    <td className={styles.minus}>-5000</td>
                </tr>
            </table>
        </div>

        <ShowModal show={show} handleClose={handleClose} title="쿠폰 교환" className={styles.coupon_modal}>
            <div className={styles.notice_box}>
                <p>※ 포인트 교환으로 받으신 상품권은 취소가 불가합니다.</p>
                <p>※ 오프라인 전용 쿠폰입니다.</p>
                <p>※ 교환 후 마이페이지 보유 쿠폰 메뉴에서 확인해주세요.</p>
            </div>
            <div className={styles.coupon_list}>
                <div className={styles.coupon_box}>
                    <input type="radio" name="couponType" id="coupon5000" className='form-check' />
                    <label htmlFor="coupon5000">
                        5,000원 쿠폰
                    </label>
                </div>
                <div className={styles.coupon_box}>
                    <input type="radio" name="couponType" id="coupon10000" className='form-check' />
                    <label htmlFor="coupon10000">
                        10,000원 쿠폰
                    </label>
                </div>
            </div>
        </ShowModal>
        </>
    );
}

export default Point;