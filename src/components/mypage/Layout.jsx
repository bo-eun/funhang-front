import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from "@/pages/mypage/mypage.module.css";
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { wishStore } from '../../store/wishStore';


function Layout() {
    const list = wishStore(state => state.list);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page') ?? '0', 10);

    const [totalPoint, setTotalPoint] = useState(0);


    // -------------------------
    // 페이지 이동 처리
    // -------------------------
    const movePage = (newPage) => {
        const params = new URLSearchParams(location.search);
        params.set('page', newPage);
        navigate(`${location.pathname}?${params.toString()}`);
    };
    
    return (
        <Container className={styles.my_cont}>
            <h2 className={styles['page_title']}>마이페이지</h2>
            <div className={styles.top_box}>
                <div className={styles.text_box}>
                    <strong>이름</strong> 님<br />
                    안녕하세요
                </div>
                <ul className={styles.card_box}>
                    <li>
                        <Link to="/mypage/wish">
                            <span>찜한상품</span>
                            <p><b>{list.length}</b> 개</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/mypage/point">
                            <span>포인트</span>
                            <p><b>{totalPoint}</b> P</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/mypage/coupon">
                            <span>쿠폰</span>
                            <p><b>1</b> 장</p>
                        </Link>
                    </li>
                </ul>
            </div>

            <Row className={styles.contents}>
                <Col xs={2}>
                    <ul className={styles.sub_category_list}>
                        <li>
                            <NavLink to="/mypage/wish" className={({isActive}) => isActive? styles.active:""}
                            >찜목록</NavLink>
                        </li>
                        <li>
                            <NavLink to="/mypage/point" className={({isActive}) => isActive? styles.active:""}>포인트 내역</NavLink>                    
                        </li>
                        <li>
                            <NavLink to="/mypage/coupon" className={({isActive}) => isActive? styles.active:""}>보유 쿠폰</NavLink>                    
                        </li>
                        <li>
                            <NavLink to="/mypage/check" className={({isActive}) => isActive? styles.active:""}>출석 체크 현황</NavLink>
                        </li>
                        <li>
                            <NavLink to="/mypage/profile" className={({isActive}) => isActive? styles.active:""}>내 정보 수정</NavLink>
                        </li>
                        <li>
                            <NavLink to="">회원탈퇴</NavLink>
                        </li>
                    </ul>
                </Col>
                <Col xs={10} className={styles.right_contents}>
                    <Outlet context={{movePage, currentPage, totalPoint, setTotalPoint}}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Layout;