import React from 'react';
import '../assets/css/Header.css';
import logo from '../assets/img/logo.png';
import { Link, NavLink } from 'react-router';

function Header(props) {

    
    return (
        <div className='fixed-bg'>
            <header className='header-bg'>
                <nav className='header-nav'>
                    <div className='l-menu-bg'>
                        <div className='logo'>
                            <Link to='/'>
                                <img src={logo} alt="편행로고"/>
                            </Link>
                        </div>
                        <ul className='l-menu-list'>
                            <li><NavLink to="/product" className={({isActive}) => isActive? "active":""}>CU</NavLink></li>
                            <li><NavLink to="/gs25" className={({isActive}) => isActive? "active":""}>GS25</NavLink></li>
                            <li><NavLink to="/7eleven" className={({isActive}) => isActive? "active":""}>7ELEVEN</NavLink></li>
                            <li><NavLink to="/board" className={({isActive}) => isActive? "active":""}>게시판</NavLink></li>
                            <li><NavLink to="/store" className={({isActive}) => isActive? "active":""}>매장찾기</NavLink></li>
                        </ul>
                    </div>
                    <ul className='r-menu'>
                        <li><Link to="/login">로그인</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;