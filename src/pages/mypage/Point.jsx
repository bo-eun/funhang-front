import React from 'react';
import styles from "../../assets/css/mypage.module.css"

function Point(props) {
    return (
        <div className={styles.point_cont}>
            <h3>
                포인트 내역
                <button type="button" className={styles.coupon_btn}>쿠폰 교환</button>
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
    );
}

export default Point;