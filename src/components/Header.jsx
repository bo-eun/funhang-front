import React from 'react';
import styles from '../assets/css/header.module.css';
import logo from '../assets/img/logo.png';
import { Link, NavLink } from 'react-router';
import { authStore } from '../store/authStore';

function Header(props) {
    const { token, userRole, userName, clearAuth } = authStore();
    const isLoggedIn = !!token;
    const isAdmin = userRole === "ADMIN";
    
    return (
        <div className={styles.fixed_bg}>
            <header className={styles.header_bg}>
                <nav className={styles.header_nav}>
                    <div className={styles.l_menu_bg}>
                        <div className={styles.logo}>
                            <Link to={isAdmin?'/admin':'/'}>
                                <img src={logo} alt="편행로고"/>
                            </Link>
                        </div>

                        {!isAdmin && (
                            <ul className={styles.l_menu_list}>
                                <li><NavLink to="/product" className={({isActive}) => isActive? styles.active:""}>CU</NavLink></li>
                                <li><NavLink to="/gs25" className={({isActive}) => isActive? styles.active:""}>GS25</NavLink></li>
                                <li><NavLink to="/7eleven" className={({isActive}) => isActive? styles.active:""}>7ELEVEN</NavLink></li>
                                <li><NavLink to="/board" className={({isActive}) => isActive? styles.active:""}>게시판</NavLink></li>
                                <li><NavLink to="/store" className={({isActive}) => isActive? styles.active:""}>매장찾기</NavLink></li>
                            </ul>
                        )}
                        {isAdmin && (
                            <ul className={styles.l_menu_list}>
                                <li><NavLink to="/admin/product" className={({isActive}) => isActive? styles.active:""}>상품 관리</NavLink></li>
                                <li><NavLink to="/admin/user" className={({isActive}) => isActive? styles.active:""}>회원 관리</NavLink></li>
                                <li><NavLink to="/admin/board" className={({isActive}) => isActive? styles.active:""}>게시판 관리</NavLink></li>
                                <li><NavLink to="/admin/category" className={({isActive}) => isActive? styles.active:""}>카테고리관리</NavLink></li>
                                <li><NavLink to="/admin/banner" className={({isActive}) => isActive? styles.active:""}>메인 배너 관리</NavLink></li>
                                <li><NavLink to="/admin/cupon" className={({isActive}) => isActive? styles.active:""}>쿠폰 관리</NavLink></li>
                            </ul>
                        )}
                    </div>
                    <ul className={styles.r_menu}>
                        {!isLoggedIn && (
                            <li>
                                <Link to="/login">로그인</Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            <>
                                <li>{userName}님</li>
                                <li>
                                <button
                                    onClick={clearAuth}
                                >
                                    로그아웃
                                </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;