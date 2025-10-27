import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Outlet } from 'react-router';
import '../assets/css/common.css';

function Layout() {
    return (
        <div className='layout-root'>
            <Header/>            
            <section className='layout-content'>
                <Outlet/>
            </section>
            <Footer/>
        </div>
    );
}

export default Layout;