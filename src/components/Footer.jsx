import React from 'react';import { Navbar } from 'react-bootstrap';
import '../assets/css/Footer.css';

function Footer(props) {
    return (
        <>
            <div className='footer-body'>
                <section className='foot-text-body'>

                </section>
                <Navbar.Brand>
                    <img src="../assets/img/logo.png" alt="편행로고" />
                </Navbar.Brand>
            </div>
        </>
    );
}

export default Footer;