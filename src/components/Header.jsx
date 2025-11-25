import React from 'react';
import '../assets/css/Header.css';
import logo from '../assets/img/logo.png';
import { Link, NavLink } from 'react-router';

function Header(props) {

    
    return (
        <>
            <header className='header-bg'>
                <nav className='header-nav'>
                    <div className='l-menu-bg'>
                        <div className='logo'>
                            <Link to='/'>
                                <img src={logo} alt="편행로고"/>
                            </Link>
                        </div>
                        <ul className='l-menu-list'>
                            <li><NavLink to="/" className={({isActive}) => isActive? "active":""}>CU</NavLink></li>
                            <li><NavLink to="/gs25">GS25</NavLink></li>
                            <li><NavLink to="/7eleven">7ELEVEN</NavLink></li>
                            <li><NavLink to="/board">게시판</NavLink></li>
                        </ul>
                    </div>
                    <ul className='r-menu'>
                        <li><Link to="/login">로그인</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;