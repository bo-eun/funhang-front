import React from 'react';
import styles from '../assets/css/header.module.css';
import logo from '../assets/img/logo.png';
import { Link, NavLink } from 'react-router';

function Header(props) {
    const user='ADMIN';
    
    return (
        <div className={styles.fixed_bg}>
            <header className={styles.header_bg}>
                <nav className={styles.header_nav}>
                    <div className={styles.l_menu_bg}>
                        <div className={styles.logo}>
                            <Link to={user===''||user==='USER'?'/':'/admin'}>
                                <img src={logo} alt="편행로고"/>
                            </Link>
                        </div>

                        {user==='' || user==='USER' &&(
                            <ul className={styles.l_menu_list}>
                                <li><NavLink to="/product" className={({isActive}) => isActive? "active":""}>CU</NavLink></li>
                                <li><NavLink to="/gs25" className={({isActive}) => isActive? "active":""}>GS25</NavLink></li>
                                <li><NavLink to="/7eleven" className={({isActive}) => isActive? "active":""}>7ELEVEN</NavLink></li>
                                <li><NavLink to="/board" className={({isActive}) => isActive? "active":""}>게시판</NavLink></li>
                                <li><NavLink to="/store" className={({isActive}) => isActive? "active":""}>매장찾기</NavLink></li>
                            </ul>
                        )}
                        {user==='ADMIN' &&(
                            <ul className={styles.l_menu_list}>
                                <li><NavLink to="/admin" className={({isActive}) => isActive? "active":""}>상품관리</NavLink></li>
                                <li><NavLink to="/admin" className={({isActive}) => isActive? "active":""}>회원관리</NavLink></li>
                                <li><NavLink to="/admin" className={({isActive}) => isActive? "active":""}>게시물관리</NavLink></li>
                                <li><NavLink to="/admin" className={({isActive}) => isActive? "active":""}>카테고리관리</NavLink></li>
                                <li><NavLink to="/admin" className={({isActive}) => isActive? "active":""}>메인 배너 관리</NavLink></li>
                                <li><NavLink to="/admin" className={({isActive}) => isActive? "active":""}>쿠폰 관리</NavLink></li>
                            </ul>
                        )}
                    </div>
                    <ul className={styles.r_menu}>
                        <li><Link to="/login">로그인</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;