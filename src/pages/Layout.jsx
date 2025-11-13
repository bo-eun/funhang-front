import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Outlet, useLocation, useMatches } from 'react-router';
import '../assets/css/common.css';
import { titleMap } from '../hooks/pageTitle';
import { authStore } from '../store/authStore';

function Layout() {
    const location = useLocation();
    const pathname = location.pathname;
    const pageTitle = titleMap[pathname] ? `${titleMap[pathname]}편행+` : "편행+";

    const token = authStore(state => state.token);

    

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    return (
        <div className='layout-root'>
            <Header/>            
            <section className='layout-content'>
                <Outlet />
            </section>
            <Footer/>
        </div>
    );
}

export default Layout;