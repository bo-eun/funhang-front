import React from 'react';import { Navbar } from 'react-bootstrap';
import '../assets/css/Footer.css';
import { Link } from 'react-router';
import footLogo from '../assets/img/footerLogo.png';


function Footer(props) {
    return (
        <>
            <div className='footer-bg'>
                <div className='footer-body'>
                    <section className='foot-text-body'>
                        <span>개인정보처리방침 | 비회원 적립 서비스 이용 안내서 | 이메일무단수집거부 </span>
                    </section>
                    <Link to="/" className='foot-logo'>
                        <img src={footLogo} alt="편행로고" />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Footer;