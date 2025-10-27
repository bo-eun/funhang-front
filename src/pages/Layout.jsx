import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Outlet } from 'react-router';

function Layout() {
    return (
        <div>
            <Header/>            
            <section>
                <Outlet/>
            </section>
            <Footer/>
        </div>
    );
}

export default Layout;